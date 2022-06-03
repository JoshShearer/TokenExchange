import { store, dispatch } from "#src/models/store";
require('chai')
    .use(require('chai-as-promised'))
    .should()
const expect = require('chai').expect

const get_models_ExchangeLoadOps = () => store.getState().models_ExchangeLoadOps;

describe("models_ExchangeLoadOps", () => {
  // beforeEach(() => dispatch({ type: "RESET" }));

  // it("should return the initial state correctly", () => {
  //  expect( get_models_ExchangeLoadOps()).toEqual({ defaultState });
  // });
  // it("test each reducer", () => {
  //   dispatch.models_ExchangeLoadOps.reducerfunction({ stateKey: "expectedvalue" });
  //   expect(get_models_ExchangeLoadOps()).toEqual({
     
  //   });
  // });
})