import { jsx, jsxs } from "react/jsx-runtime";
const DefaultSpinner = () => {
  return /* @__PURE__ */ jsx("svg", { width: 16, height: 16, viewBox: "0 0 16 16", children: /* @__PURE__ */ jsxs("g", { strokeWidth: 2, fill: "none", fillRule: "evenodd", children: [
    /* @__PURE__ */ jsx("circle", { strokeOpacity: 0.25, cx: 8, cy: 8, r: 7, stroke: "var(--color-text-1)" }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", d: "M15 8c0-4.5-4.5-7-7-7", stroke: "var(--color-text-1)", children: /* @__PURE__ */ jsx(
      "animateTransform",
      {
        attributeName: "transform",
        type: "rotate",
        from: "0 8 8",
        to: "360 8 8",
        dur: "1s",
        repeatCount: "indefinite"
      }
    ) })
  ] }) });
};
export {
  DefaultSpinner
};
//# sourceMappingURL=DefaultSpinner.mjs.map
