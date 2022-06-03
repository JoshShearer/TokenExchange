import { store, dispatch } from "#src/models/store";
require('chai')
    .use(require('chai-as-promised'))
    .should()
const expect = require('chai').expect

const get_models_ExchangeLoadLoad = () => store.getState().models_ExchangeLoadLoad;

describe("models_ExchangeLoadLoad", () => {
  // beforeEach(() => dispatch({ type: "RESET" }));

  // it("should return the initial state correctly", () => {
  //  expect( get_models_ExchangeLoadLoad()).toEqual({ defaultState });
  // });
  // it("test each reducer", () => {
  //   dispatch.models_ExchangeLoadLoad.reducerfunction({ stateKey: "expectedvalue" });
  //   expect(get_models_ExchangeLoadLoad()).toEqual({
     
  //   });
  // });
})