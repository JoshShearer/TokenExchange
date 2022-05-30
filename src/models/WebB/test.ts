import { store, dispatch } from "#src/models/store";
require('chai')
    .use(require('chai-as-promised'))
    .should()
const expect = require('chai').expect

const getmodels_WebB = () => store.getState().models_WebB;

describe("models_WebB", () => {
  beforeEach(() => dispatch({ type: "RESET" }));

  it("should return the initial state correctly", () => {
   expect( getmodels_WebB()).toEqual({ account: 'account',  connection: {},  balance: 'notmuch', });
  });
  
  it("test each reducer", () => {
    dispatch.models_WebB.reducerfunction({ stateKey: "expectedvalue" });
    expect(getmodels_WebB()).toEqual({
     
    });
  });
})