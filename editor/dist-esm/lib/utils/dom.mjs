import { debugFlags } from "./debug-flags.mjs";
function loopToHtmlElement(elm) {
  if (elm instanceof HTMLElement)
    return elm;
  if (elm.parentElement)
    return loopToHtmlElement(elm.parentElement);
  else
    throw Error("Could not find a parent element of an HTML type!");
}
function preventDefault(event) {
  event.preventDefault();
  if (debugFlags.preventDefaultLogging.value) {
    console.warn("preventDefault called on event:", event);
  }
}
function setPointerCapture(element, event) {
  element.setPointerCapture(event.pointerId);
  if (debugFlags.pointerCaptureTracking.value) {
    const trackingObj = debugFlags.pointerCaptureTrackingObject.value;
    trackingObj.set(element, (trackingObj.get(element) ?? 0) + 1);
  }
  if (debugFlags.pointerCaptureLogging.value) {
    console.warn("setPointerCapture called on element:", element, event);
  }
}
function releasePointerCapture(element, event) {
  if (!element.hasPointerCapture(event.pointerId)) {
    return;
  }
  element.releasePointerCapture(event.pointerId);
  if (debugFlags.pointerCaptureTracking.value) {
    const trackingObj = debugFlags.pointerCaptureTrackingObject.value;
    if (trackingObj.get(element) === 1) {
      trackingObj.delete(element);
    } else if (trackingObj.has(element)) {
      trackingObj.set(element, trackingObj.get(element) - 1);
    } else {
      console.warn("Release without capture");
    }
  }
  if (debugFlags.pointerCaptureLogging.value) {
    console.warn("releasePointerCapture called on element:", element, event);
  }
}
const stopEventPropagation = (e) => e.stopPropagation();
export {
  loopToHtmlElement,
  preventDefault,
  releasePointerCapture,
  setPointerCapture,
  stopEventPropagation
};
//# sourceMappingURL=dom.mjs.map
