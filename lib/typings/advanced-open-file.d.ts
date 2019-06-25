import * as Atom from "atom";

declare type Callback = (filePath: string) => void;

declare type AdvancedOpenFileEventService = {
  onDidOpenPath: (callback: Callback) => Atom.Disposable;
  onDidCreatePath: (callback: Callback) => Atom.Disposable;
}
