async function blobAsString(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      const text = reader.result;
      resolve(text);
    });
    reader.addEventListener("error", () => {
      reject(reader.error);
    });
    reader.readAsText(blob);
  });
}
export {
  blobAsString
};
//# sourceMappingURL=blobAsString.mjs.map
