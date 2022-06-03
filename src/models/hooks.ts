/* CREDITOR_GENERATED */
import {
useSelector as useReduxSelector,
useDispatch as useReduxDispatch,
} from 'react-redux';

import { RootState, Actions } from './store';

type EqualityFn<T> = (a: T, b: T) => boolean;
type Selector = <TState = RootState, Selected = unknown>(
selector: (state: TState) => Selected,
equalityFn?: EqualityFn<Selected> | undefined
) => Selected;

export const useSelector: Selector = (selector) => {
return useReduxSelector(selector);
};

export const useDispatch: () => Actions = () => {
return useReduxDispatch() as unknown as Actions;
};