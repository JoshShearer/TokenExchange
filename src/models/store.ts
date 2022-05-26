/* CREDITOR_GENERATED */
import selectPlugin from "@rematch/select";
import { RematchRootState, RematchDispatch, init } from '@rematch/core';
import { models, RootModel } from "#src/models/model";


export const store = init({
   models,
   // add selectPlugin to your store
   plugins: [
   selectPlugin<RootModel()
   //...
   ],
})

export type Store = typeof store;
export type RootState = RematchRootState<RootModel>;
export type Actions = RematchDispatch<RootModel>;