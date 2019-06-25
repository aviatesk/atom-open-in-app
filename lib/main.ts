"use babel";

import { openInApp } from "./open-in-app";
import { AdvancedOpenFileEventService } from "./typings/advanced-open-file";

export function activate() {
  openInApp.activate();
}

export function deactivate() {
  openInApp.deactivate();
}

export function consumeEventService(service: AdvancedOpenFileEventService) {
  openInApp.consumeEventService(service);
}
