import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

// Suppress ResizeObserver loop errors
const resizeObserverErr = (e) => {
  if (e.message && e.message.includes('ResizeObserver loop completed with undelivered notifications')) {
    e.stopImmediatePropagation();
    e.preventDefault();
    return false;
  }
};

const resizeObserverErrUnhandled = (e) => {
  if (e.reason && e.reason.message && e.reason.message.includes('ResizeObserver loop completed with undelivered notifications')) {
    e.preventDefault();
    return false;
  }
};

// Add multiple event listeners to catch the error
window.addEventListener('error', resizeObserverErr);
window.addEventListener('unhandledrejection', resizeObserverErrUnhandled);

// Override console.error to suppress ResizeObserver errors
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('ResizeObserver loop completed with undelivered notifications')) {
    return;
  }
  originalConsoleError(...args);
};

// Patch ResizeObserver to prevent loop errors
const OriginalResizeObserver = window.ResizeObserver;
window.ResizeObserver = function(callback) {
  const wrappedCallback = (entries, observer) => {
    try {
      callback(entries, observer);
    } catch (e) {
      if (e.message && e.message.includes('ResizeObserver loop completed with undelivered notifications')) {
        // Silently ignore ResizeObserver loop errors
        return;
      }
      throw e;
    }
  };
  return new OriginalResizeObserver(wrappedCallback);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
