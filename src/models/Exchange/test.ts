import { store, dispatch } from "#src/models/store";
require('chai')
    .use(require('chai-as-promised'))
    .should()
const expect = require('chai').expect

const get_models_ExchangeLoad = () => store.getState().models_ExchangeLoad;

describe("models_ExchangeLoad", () => {
  // beforeEach(() => dispatch({ type: "RESET" }));

  // it("should return the initial state correctly", () => {
  //  expect( get_models_ExchangeLoad()).toEqual({ defaultState });
  // });
  // it("test each reducer", () => {
  //   dispatch.models_ExchangeLoad.reducerfunction({ stateKey: "expectedvalue" });
  //   expect(get_models_ExchangeLoad()).toEqual({
     
  //   });
  // });
})