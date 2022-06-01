import React from "react";
import { screen } from "@testing-library/react";
const expect = require('chai').expect
import userEvent from "@testing-library/user-event";
import { renderWithRematchStore } from "../../../test/utils";
import { Comps_layout_App } from ".";
import { store, dispatch } from "#src/models/store";

describe("Comps_layout_App", () => {
  beforeEach(() => dispatch({ type: "RESET" })); //clear the state
  // it("should render the 'rename' component", () => {
  //   renderWithRematchStore(<Comps_layout_App />, store);
  //   expect(screen.queryByText("Clear")).toBeInTheDocument();
  //   expect(screen.queryByText("Your total cart:")).toBeInTheDocument();
  //   expect(screen.queryByText("$0.00")).toBeInTheDocument();
  // });
  
  // it("should render a '' on the Comps_layout_App and adjust the ''", async () => {
  //   await dispatch.shop.getProducts();
  //   const [oneThing] = store.getState().rename;
  //   dispatch.Comps_layout_App.rename(oneProduct);
  //   renderWithRematchStore(<Comps_layout_App />, store);
  //   expect(await screen.findByRole("list")).toBeInTheDocument();
  //   expect(screen.queryByRole("listitem")).toBeInTheDocument();
  //   expect(screen.getAllByText("$43.00")).toHaveLength(2);
  // });

  // it("should reset the Comps_layout_App to his initial state", async () => {
  //   await dispatch.shop.getProducts();
  //   const [otherProduct] = store.getState().modelData;
  //   dispatch.Comps_layout_App.rename(otherProduct);
  //   renderWithRematchStore(<Comps_layout_App />, store);
  //   expect(await screen.findByRole("list")).toBeInTheDocument();
  //   expect(screen.queryByRole("listitem")).toBeInTheDocument();
  //   expect(screen.getAllByText("$43.00")).toHaveLength(2);
  //   userEvent.click(screen.getByText("Clear"));
  //   expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  // });
})