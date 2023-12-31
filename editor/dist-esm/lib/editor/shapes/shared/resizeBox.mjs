import { Vec2d } from "../../../primitives/Vec2d.mjs";
function resizeBox(shape, info, opts = {}) {
  const { newPoint, handle, scaleX, scaleY } = info;
  const { minWidth = 1, maxWidth = Infinity, minHeight = 1, maxHeight = Infinity } = opts;
  let w = shape.props.w * scaleX;
  let h = shape.props.h * scaleY;
  const offset = new Vec2d(0, 0);
  if (w > 0) {
    if (w < minWidth) {
      switch (handle) {
        case "top_left":
        case "left":
        case "bottom_left": {
          offset.x = w - minWidth;
          break;
        }
        case "top":
        case "bottom": {
          offset.x = (w - minWidth) / 2;
          break;
        }
        default: {
          offset.x = 0;
        }
      }
      w = minWidth;
    }
  } else {
    offset.x = w;
    w = -w;
    if (w < minWidth) {
      switch (handle) {
        case "top_left":
        case "left":
        case "bottom_left": {
          offset.x = -w;
          break;
        }
        default: {
          offset.x = -minWidth;
        }
      }
      w = minWidth;
    }
  }
  if (h > 0) {
    if (h < minHeight) {
      switch (handle) {
        case "top_left":
        case "top":
        case "top_right": {
          offset.y = h - minHeight;
          break;
        }
        case "right":
        case "left": {
          offset.y = (h - minHeight) / 2;
          break;
        }
        default: {
          offset.y = 0;
        }
      }
      h = minHeight;
    }
  } else {
    offset.y = h;
    h = -h;
    if (h < minHeight) {
      switch (handle) {
        case "top_left":
        case "top":
        case "top_right": {
          offset.y = -h;
          break;
        }
        default: {
          offset.y = -minHeight;
        }
      }
      h = minHeight;
    }
  }
  const { x, y } = offset.rot(shape.rotation).add(newPoint);
  return {
    x,
    y,
    props: {
      w: Math.min(maxWidth, w),
      h: Math.min(maxHeight, h)
    }
  };
}
export {
  resizeBox
};
//# sourceMappingURL=resizeBox.mjs.map
