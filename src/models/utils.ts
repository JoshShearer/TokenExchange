/* CREDITOR_GENERATED */

import { RootState } from '#src/models/store';
import {
  createSelector as reCreateSelector,
  createStructuredSelector as reCreateStructuredSelector,
} from 'reselect';

type SelectorFunction = (state: RootState, key?: any) => any;
type SelectorsObject = {
  [key: string]: SelectorFunction;
};
interface StructureFactory {
  <SelectorMap extends SelectorsObject>(selectorMap: SelectorMap): (
    state: RootState,
    key?: any
  ) => {
    [Key in keyof SelectorMap]: ReturnType<SelectorMap[Key]>;
  };
}

// @ts-ignore
export const createStructuredSelector: StructureFactory = (structure) => {
  return reCreateStructuredSelector(structure);
};

export const createSelector = reCreateSelector;
