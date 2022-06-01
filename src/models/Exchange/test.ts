import { store, dispatch } from "#src/models/store";
require('chai')
    .use(require('chai-as-promised'))
    .should()
const expect = require('chai').expect

const get_models_Exchange = () => store.getState().models_Exchange;

describe("models_Exchange", () => {
  // beforeEach(() => dispatch({ type: "RESET" }));

  // it("should return the initial state correctly", () => {
  //  expect( get_models_Exchange()).toEqual({ defaultState });
  // });
  // it("test each reducer", () => {
  //   dispatch.models_Exchange.reducerfunction({ stateKey: "expectedvalue" });
  //   expect(get_models_Exchange()).toEqual({
     
  //   });
  // });
})