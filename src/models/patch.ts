// Utility that deeply patches an object preserving references to the original recursive objects
// TODO make delete prop parameritize delete prop -- perhaps undefined rather than null.
type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
  };
export const patch = <T>(state: T, diff: RecursivePartial<T>): T => {
    if (state === diff) {
        return state;
    }
    if (typeof diff !== 'object' || diff === null) {
        return diff;
    }
    type DiffKey = keyof typeof diff;
    let hasNew = false;
    const keysToDelete = [] as DiffKey[];
    const toSpread = Object.keys(diff).reduce((acc, _key) => {
        const key = _key as DiffKey;
        if (diff[key] !== undefined) {
        // @ts-ignore
        acc[key] = patch(state[key] {}, diff[key]);
        } else {
        keysToDelete.push(key);
        }
        if (acc[key] !== state[key]) hasNew = true;
        return acc;
        // @ts-ignore
    }, {} as T);
    if (toSpread === state || !hasNew) {
        return state;
    }
    const toReturn = {
        ...(state {}),
        ...toSpread,
    };
    keysToDelete.forEach((key) => delete toReturn[key]);
    return toReturn;
    };