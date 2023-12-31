import { useMemo, useRef, useSyncExternalStore } from "react";
import { computed, react } from "../core/index.mjs";
function useValue() {
  const args = arguments;
  const deps = args.length === 3 ? args[2] : [args[0]];
  const name = args.length === 3 ? args[0] : `useValue(${args[0].name})`;
  const isInRender = useRef(true);
  isInRender.current = true;
  const $val = useMemo(() => {
    if (args.length === 1) {
      return args[0];
    }
    return computed(name, () => {
      if (isInRender.current) {
        return args[1]();
      } else {
        try {
          return args[1]();
        } catch {
          return {};
        }
      }
    });
  }, deps);
  try {
    const { subscribe, getSnapshot } = useMemo(() => {
      return {
        subscribe: (listen) => {
          return react(`useValue(${name})`, () => {
            $val.value;
            listen();
          });
        },
        getSnapshot: () => $val.value
      };
    }, [$val]);
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  } finally {
    isInRender.current = false;
  }
}
export {
  useValue
};
//# sourceMappingURL=useValue.mjs.map
