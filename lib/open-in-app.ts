"use babel";

import * as Atom from "atom";
import open from "open";
import path from "path";

import { AdvancedOpenFileEventService } from "./typings/advanced-open-file";

class OpenInApp {

  private subscriptions: Atom.CompositeDisposable;

  constructor() {
    this.subscriptions = new Atom.CompositeDisposable();
  }

  public activate() {
    // Subscriptions
    this.subscriptions.add(
      atom.commands.add(
        "atom-text-editor",
        "open-in-app:open-file-from-editor",
        this.openFileFromEditor.bind(this),
      ));
    this.subscriptions.add(
      atom.commands.add(
        ".tree-view",
        "open-in-app:open-file-from-tree",
        this.openFileFromTree.bind(this),
      ));
    this.subscriptions.add(
      atom.commands.add(
        ".tree-view .file",
        "open-in-app:open-file-on-tree-click",
        this.openFileFromTree.bind(this),
      ));
  }

  public deactivate(): void {
    this.subscriptions.dispose();
  }

  public consumeEventService(service: AdvancedOpenFileEventService) {
    const openEventListener = service.onDidOpenPath((filePath) => {
      const ext = path.extname(filePath);
      const targetExts: [string] = atom.config.get("open-in-app.advancedOpenFileExtensions");
      if (targetExts.includes(ext)) {
        this.openFile(filePath);
      }
    });

    return new Atom.Disposable(() => {
      openEventListener.dispose();
    });
  }

  private openFileFromEditor(): void {
    const filePath = this.getFilePath();
    if (!filePath) { return; }
    this.openFile(filePath);
  }

  private openFileFromTree(): void {
    const treeView = atom.packages.getActivePackage("tree-view");
    if (!treeView) { return; }
    const filePath = (treeView as any).mainModule.treeView.selectedPath;
    if (!filePath) { return; }
    this.openFile(filePath);
  }

  private getFilePath(): void | string {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) {
      return;
    } else {
      return editor.getPath();
    }
  }

  private openFile(filePath: string): void {
    const ext = path.extname(filePath);
    let applicationBindings: object;
    try {
      applicationBindings = JSON.parse(atom.config.get("open-in-app.applicationBindings"));
    } catch (err) {
      if (err instanceof SyntaxError) {
        atom.notifications.addWarning("Open In App", {
          description:
            "Can't parse `applicationBindings` into JSON object. Make sure your setting is like: `{ \".html\": "
            + "\"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe\" }`",
          dismissable: true,
        });
        applicationBindings = {};
      } else {
        atom.notifications.addError("Open In App", { description: err });
        return;
      }
    }

    let openApp: string;
    if (applicationBindings.hasOwnProperty(ext)) {
      openApp = (applicationBindings as any)[ext];
    } else {
      openApp = atom.config.get("open-in-app.defaultApplication");
    }

    open(filePath, { app: openApp });
  }
}

export const openInApp = new OpenInApp();
