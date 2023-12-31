"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var DefaultSnapLine_exports = {};
__export(DefaultSnapLine_exports, {
  DefaultSnapLine: () => DefaultSnapLine
});
module.exports = __toCommonJS(DefaultSnapLine_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_classnames = __toESM(require("classnames"));
var React = __toESM(require("react"));
var import_utils = require("../../primitives/utils");
function PointsSnapLine({ points, zoom }) {
  const l = 2.5 / zoom;
  const minX = points.reduce((acc, p) => Math.min(acc, p.x), Infinity);
  const maxX = points.reduce((acc, p) => Math.max(acc, p.x), -Infinity);
  const minY = points.reduce((acc, p) => Math.min(acc, p.y), Infinity);
  const maxY = points.reduce((acc, p) => Math.max(acc, p.y), -Infinity);
  const useNWtoSEdireciton = points.some((p) => p.x === minX && p.y === minY);
  let firstX, firstY, secondX, secondY;
  if (useNWtoSEdireciton) {
    firstX = minX;
    firstY = minY;
    secondX = maxX;
    secondY = maxY;
  } else {
    firstX = minX;
    firstY = maxY;
    secondX = maxX;
    secondY = minY;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "tl-snap-line", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: firstX, y1: firstY, x2: secondX, y2: secondY }),
    points.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: `translate(${p.x},${p.y})`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        className: "tl-snap-point",
        d: `M ${-l},${-l} L ${l},${l} M ${-l},${l} L ${l},${-l}`
      }
    ) }, i))
  ] });
}
function GapsSnapLine({ gaps, direction, zoom }) {
  const l = 3.5 / zoom;
  let edgeIntersection = [-Infinity, Infinity];
  let nextEdgeIntersection = null;
  const horizontal = direction === "horizontal";
  for (const gap of gaps) {
    nextEdgeIntersection = (0, import_utils.rangeIntersection)(
      edgeIntersection[0],
      edgeIntersection[1],
      horizontal ? gap.startEdge[0].y : gap.startEdge[0].x,
      horizontal ? gap.startEdge[1].y : gap.startEdge[1].x
    );
    if (nextEdgeIntersection) {
      edgeIntersection = nextEdgeIntersection;
    } else {
      continue;
    }
    nextEdgeIntersection = (0, import_utils.rangeIntersection)(
      edgeIntersection[0],
      edgeIntersection[1],
      horizontal ? gap.endEdge[0].y : gap.endEdge[0].x,
      horizontal ? gap.endEdge[1].y : gap.endEdge[1].x
    );
    if (nextEdgeIntersection) {
      edgeIntersection = nextEdgeIntersection;
    } else {
      continue;
    }
  }
  if (edgeIntersection === null) {
    return null;
  }
  const midPoint = (edgeIntersection[0] + edgeIntersection[1]) / 2;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { className: "tl-snap-line", children: gaps.map(({ startEdge, endEdge }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(React.Fragment, { children: horizontal ? (
    // horizontal gap
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "line",
        {
          x1: startEdge[0].x,
          y1: midPoint - 2 * l,
          x2: startEdge[1].x,
          y2: midPoint + 2 * l
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "line",
        {
          x1: endEdge[0].x,
          y1: midPoint - 2 * l,
          x2: endEdge[1].x,
          y2: midPoint + 2 * l
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: startEdge[0].x, y1: midPoint, x2: endEdge[0].x, y2: midPoint }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "line",
        {
          x1: (startEdge[0].x + endEdge[0].x) / 2,
          y1: midPoint - l,
          x2: (startEdge[0].x + endEdge[0].x) / 2,
          y2: midPoint + l
        }
      )
    ] })
  ) : (
    // vertical gap
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "line",
        {
          x1: midPoint - 2 * l,
          y1: startEdge[0].y,
          x2: midPoint + 2 * l,
          y2: startEdge[1].y
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "line",
        {
          x1: midPoint - 2 * l,
          y1: endEdge[0].y,
          x2: midPoint + 2 * l,
          y2: endEdge[1].y
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: midPoint, y1: startEdge[0].y, x2: midPoint, y2: endEdge[0].y }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "line",
        {
          x1: midPoint - l,
          y1: (startEdge[0].y + endEdge[0].y) / 2,
          x2: midPoint + l,
          y2: (startEdge[0].y + endEdge[0].y) / 2
        }
      )
    ] })
  ) }, i)) });
}
const DefaultSnapLine = ({ className, line, zoom }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: (0, import_classnames.default)("tl-overlays__item", className), children: line.type === "points" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PointsSnapLine, { ...line, zoom }) : line.type === "gaps" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GapsSnapLine, { ...line, zoom }) : null });
};
//# sourceMappingURL=DefaultSnapLine.js.map
