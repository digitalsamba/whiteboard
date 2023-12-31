import {
  deepCopy
} from "@tldraw/editor";
function getTranslateCroppedImageChange(editor, shape, delta) {
  if (!shape) {
    throw Error("Needs to translate a cropped shape!");
  }
  const { crop: oldCrop } = shape.props;
  if (!oldCrop) {
    return;
  }
  const flatten = editor.inputs.shiftKey ? Math.abs(delta.x) < Math.abs(delta.y) ? "x" : "y" : null;
  if (flatten === "x") {
    delta.x = 0;
  } else if (flatten === "y") {
    delta.y = 0;
  }
  delta.rot(-shape.rotation);
  const w = 1 / (oldCrop.bottomRight.x - oldCrop.topLeft.x) * shape.props.w;
  const h = 1 / (oldCrop.bottomRight.y - oldCrop.topLeft.y) * shape.props.h;
  const yCrop = oldCrop.bottomRight.y - oldCrop.topLeft.y;
  const xCrop = oldCrop.bottomRight.x - oldCrop.topLeft.x;
  const newCrop = deepCopy(oldCrop);
  newCrop.topLeft.x = Math.min(1 - xCrop, Math.max(0, newCrop.topLeft.x - delta.x / w));
  newCrop.topLeft.y = Math.min(1 - yCrop, Math.max(0, newCrop.topLeft.y - delta.y / h));
  newCrop.bottomRight.x = newCrop.topLeft.x + xCrop;
  newCrop.bottomRight.y = newCrop.topLeft.y + yCrop;
  const partial = {
    id: shape.id,
    type: shape.type,
    props: {
      crop: newCrop
    }
  };
  return partial;
}
export {
  getTranslateCroppedImageChange
};
//# sourceMappingURL=crop_helpers.mjs.map
