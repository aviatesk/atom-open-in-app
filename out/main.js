"use babel";
import { openInApp } from "./open-in-app";
export function activate() {
    openInApp.activate();
}
export function deactivate() {
    openInApp.deactivate();
}
export function consumeEventService(service) {
    openInApp.consumeEventService(service);
}
