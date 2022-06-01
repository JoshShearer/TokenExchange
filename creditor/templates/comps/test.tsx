import React from "react";
import { screen } from "@testing-library/react";
const expect = require('chai').expect
import userEvent from "@testing-library/user-event";
import { renderWithRematchStore } from "../../../test/utils";
import { CREDITOR_UNDERSCORE_NAME } from ".";
import { store, dispatch } from "#src/models/store";

describe("CREDITOR_UNDERSCORE_NAME", () => {
  beforeEach(() => dispatch({ type: "RESET" })); //clear the state
  // it("should render the 'rename' component", () => {
  //   renderWithRematchStore(<CREDITOR_UNDERSCORE_NAME />, store);
  //   expect(screen.queryByText("Clear")).toBeInTheDocument();
  //   expect(screen.queryByText("Your total cart:")).toBeInTheDocument();
  //   expect(screen.queryByText("$0.00")).toBeInTheDocument();
  // });
  
  // it("should render a '' on the CREDITOR_UNDERSCORE_NAME and adjust the ''", async () => {
  //   await dispatch.shop.getProducts();
  //   const [oneThing] = store.getState().rename;
  //   dispatch.CREDITOR_UNDERSCORE_NAME.rename(oneProduct);
  //   renderWithRematchStore(<CREDITOR_UNDERSCORE_NAME />, store);
  //   expect(await screen.findByRole("list")).toBeInTheDocument();
  //   expect(screen.queryByRole("listitem")).toBeInTheDocument();
  //   expect(screen.getAllByText("$43.00")).toHaveLength(2);
  // });

  // it("should reset the CREDITOR_UNDERSCORE_NAME to his initial state", async () => {
  //   await dispatch.shop.getProducts();
  //   const [otherProduct] = store.getState().modelData;
  //   dispatch.CREDITOR_UNDERSCORE_NAME.rename(otherProduct);
  //   renderWithRematchStore(<CREDITOR_UNDERSCORE_NAME />, store);
  //   expect(await screen.findByRole("list")).toBeInTheDocument();
  //   expect(screen.queryByRole("listitem")).toBeInTheDocument();
  //   expect(screen.getAllByText("$43.00")).toHaveLength(2);
  //   userEvent.click(screen.getByText("Clear"));
  //   expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  // });
})