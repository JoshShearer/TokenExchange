import { store, dispatch } from "#src/models/store";
require('chai')
    .use(require('chai-as-promised'))
    .should()
const expect = require('chai').expect

const get_models_Token = () => store.getState().models_Token;

describe("models_Token", () => {
  // beforeEach(() => dispatch({ type: "RESET" }));

  // it("should return the initial state correctly", () => {
  //  expect( get_models_Token()).toEqual({ defaultState });
  // });
  // it("test each reducer", () => {
  //   dispatch.models_Token.reducerfunction({ stateKey: "expectedvalue" });
  //   expect(get_models_Token()).toEqual({
     
  //   });
  // });
})