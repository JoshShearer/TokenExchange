/* CREDITOR_GENERATED */
import { Models } from '@rematch/core';

import { models_ExchangeLoad } from '#src/models/ExchangeLoad';
import { models_ExchangeOps } from '#src/models/ExchangeOps';
import { models_Token } from '#src/models/Token';
import { models_WebB } from '#src/models/WebB';

export interface RootModel extends Models<RootModel> {
  models_ExchangeLoad: typeof models_ExchangeLoad;
  models_ExchangeOps: typeof models_ExchangeOps;
  models_Token: typeof models_Token;
  models_WebB: typeof models_WebB;
}

export const models: RootModel = {
  models_ExchangeLoad,
  models_ExchangeOps,
  models_Token,
  models_WebB,
}
