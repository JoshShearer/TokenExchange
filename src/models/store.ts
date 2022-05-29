/* CREDITOR_GENERATED */
import selectPlugin from "@rematch/select";
import { RematchRootState, RematchDispatch, init } from '@rematch/core';
import { models, RootModel } from "#src/models/model";


export const store = init({
   name: "ExchangeState",
   models,
   // add selectPlugin to your store
   plugins: [
   selectPlugin()
   //...
   ],
})

export const { dispatch } = store

export type Store = typeof store;
export type RootState = RematchRootState<RootModel>;
export type Actions = RematchDispatch<RootModel>;
export type Selector<R> = (rootState: RootState) => R;
