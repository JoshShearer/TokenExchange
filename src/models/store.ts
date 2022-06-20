/* CREDITOR_GENERATED */
import createSelectPlugin from '@rematch/select';
import { RematchRootState, RematchDispatch, init } from '@rematch/core';
import { models, RootModel } from '#src/models/model';


export const store = init<RootModel>({
   models,
   // add selectPlugin to your store
   plugins: [
   createSelectPlugin()
   //...
   ],
})

export const { dispatch } = store

export type Store = typeof store;
export type RootState = RematchRootState<RootModel>;
export type Actions = RematchDispatch<RootModel>;

export type Selector<R> = (rootState: RootState) => R;