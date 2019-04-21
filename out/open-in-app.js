"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Atom = require("atom");
const open_1 = require("open");
const path_1 = require("path");
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
        treeView.mainModule.treeViewOpenPromise
            .then((treeViewPromise) => {
            const filePath = treeViewPromise.selectedPath;
            if (!filePath) {
                return;
            }
            this.openFile(filePath);
        })
            .catch((err) => {
            atom.notifications.addError(err.toString());
        });
    }
    getFilePath() {
        const editor = atom.workspace.getActiveTextEditor();
        if (!editor) {
            return;
        }
        else {
            return editor.getPath();
        }
    }
    openFile(filePath) {
        const ext = path_1.default.extname(filePath);
        let applicationBindings;
        try {
            applicationBindings = JSON.parse(atom.config.get("open-in-app.applicationBindings"));
        }
        catch (err) {
            if (err instanceof SyntaxError) {
                atom.notifications.addWarning("Open In App", {
                    description: "Can't parse `applicationBindings` into JSON object. Make sure your setting is like: `{ \".html\": "
                        + "\"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe\" }`",
                    dismissable: true,
                });
                applicationBindings = {};
            }
            else {
                atom.notifications.addError("Open In App", { description: err });
                return;
            }
        }
        let openApp;
        if (applicationBindings.hasOwnProperty(ext)) {
            openApp = applicationBindings[ext];
        }
        else {
            openApp = atom.config.get("open-in-app.defaultApplication");
        }
        open_1.default(filePath, { app: openApp });
    }
}
exports.default = OpenInApp;
