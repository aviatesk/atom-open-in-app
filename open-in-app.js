/** @babel */

import * as Atom from "atom";
import open from "open";
import path from "path";

class OpenInApp {
  constructor() {
    this.subscriptions = new Atom.CompositeDisposable();
  }
  activate() {
    // Subscriptions
    this.subscriptions.add(atom.commands.add("atom-text-editor", "open-in-app:open-file-from-editor", this.openFileFromEditor.bind(this)));
    this.subscriptions.add(atom.commands.add(".tree-view", "open-in-app:open-file-from-tree", this.openFileFromTree.bind(this)));
    this.subscriptions.add(atom.commands.add(".tree-view .file", "open-in-app:open-file-on-tree-click", this.openFileFromTree.bind(this)));
  }
  deactivate() {
    this.subscriptions.dispose();
  }
  openFileFromEditor() {
    const filePath = this.getFilePath();
    if (!filePath) {
      return;
    }
    this.openFile(filePath);
  }
  openFileFromTree() {
    const treeView = atom.packages.getActivePackage("tree-view");
    if (!treeView) {
      return;
    }
    const filePath = treeView.mainModule.treeView.selectedPath;
    if (!filePath) {
      return;
    }
    this.openFile(filePath);
  }
  getFilePath() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) {
      return;
    } else {
      return editor.getPath();
    }
  }
  openFile(filePath) {
    const ext = path.extname(filePath);
    let applicationBindings;
    try {
      applicationBindings = JSON.parse(atom.config.get("open-in-app.applicationBindings"));
    } catch (err) {
      if (err instanceof SyntaxError) {
        atom.notifications.addWarning("Open In App", {
          description: "Can't parse `applicationBindings` into JSON object. Make sure your setting is like: `{ \".html\": " +
            "\"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe\" }`",
          dismissable: true,
        });
        applicationBindings = {};
      } else {
        atom.notifications.addError("Open In App", { description: err });
        return;
      }
    }
    let openApp;
    if (applicationBindings.hasOwnProperty(ext)) {
      openApp = applicationBindings[ext];
    } else {
      openApp = atom.config.get("open-in-app.defaultApplication");
    }
    open(filePath, { app: openApp });
  }
}

// main

const openInApp = new OpenInApp();
export function activate() { openInApp.activate(); }
export function deactivate() { openInApp.deactivate(); }
export function consumeEventService(service) { openInApp.consumeEventService(service); }
