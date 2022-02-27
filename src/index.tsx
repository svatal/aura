import * as b from "bobril";
import { init } from "bobril";
import { App } from "./app";

init(() => <App />);

window.addEventListener("load", () => {
  registerSW();
});

// Register the Service Worker
async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("serviceworker.js");
    } catch (e) {
      console.log("SW registration failed");
    }
  }
}
