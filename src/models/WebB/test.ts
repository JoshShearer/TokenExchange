import { store, dispatch } from "#src/models/store";
require('chai')
    .use(require('chai-as-promised'))
    .should()
const expect = require('chai').expect

const get_models_WebB = () => store.getState().models_WebB;

describe("models_WebB", () => {
  // beforeEach(() => dispatch({ type: "RESET" }));

  // it("should return the initial state correctly", () => {
  //  expect( get_models_WebB()).toEqual({ defaultState });
  // });
  // it("test each reducer", () => {
  //   dispatch.models_WebB.reducerfunction({ stateKey: "expectedvalue" });
  //   expect(get_models_WebB()).toEqual({
     
  //   });
  // });
})