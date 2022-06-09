/* CREDITOR_GENERATED */
import { Models } from '@rematch/core';

import { models_Exchange } from '#src/models/Exchange';
import { models_Token } from '#src/models/Token';
import { models_WebB } from '#src/models/WebB';

export interface RootModel extends Models<RootModel> {
  models_Exchange: typeof models_Exchange;
  models_Token: typeof models_Token;
  models_WebB: typeof models_WebB;
}

export const models: RootModel = {
  models_Exchange,
  models_Token,
  models_WebB,
};
