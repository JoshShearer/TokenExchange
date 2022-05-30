import { store, dispatch } from "#src/models/store";
require('chai')
    .use(require('chai-as-promised'))
    .should()
const expect = require('chai').expect

const getCREDITOR_UNDERSCORE_NAME = () => store.getState().CREDITOR_UNDERSCORE_NAME;

describe("CREDITOR_UNDERSCORE_NAME", () => {
  beforeEach(() => dispatch({ type: "RESET" }));

  it("should return the initial state correctly", () => {
   expect( getCREDITOR_UNDERSCORE_NAME()).toEqual({ defaultState });
  });
  it("test each reducer", () => {
    dispatch.CREDITOR_UNDERSCORE_NAME.reducerfunction({ stateKey: "expectedvalue" });
    expect(getCREDITOR_UNDERSCORE_NAME()).toEqual({
     
    });
  });
})