import { computed } from "@tldraw/state";
function getAtomManager(atom, transform) {
  const update = (value) => {
    const curr = atom.value;
    const next = { ...curr, ...value };
    const final = transform?.(atom.value, atom.value) ?? next;
    atom.set(final);
  };
  return Object.defineProperties(
    {},
    Object.keys(atom.value).reduce((acc, key) => {
      acc[key] = computed(atom, key, {
        get() {
          return atom.value[key];
        },
        set(value) {
          update({ [key]: value });
        }
      });
      return acc;
    }, {})
  );
}
export {
  getAtomManager
};
//# sourceMappingURL=getRecordManager.mjs.map
