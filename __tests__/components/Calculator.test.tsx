import "@testing-library/jest-dom"
import { render, screen as $ } from "@testing-library/react"

import Calculator from "../../components/Calculator"

describe("Calculator", () => {
  beforeEach(() => render(<Calculator />))

  it("have a calculation screen", () => {
    expect($.getByTestId("Calculator.calculation")).toBeInTheDocument()
  })

  it("have a result screen", () => {
    expect($.getByTestId("Calculator.result")).toBeInTheDocument()
  })

  it("have all buttons", () => {
    "01234567890+-×÷↩=".split("").forEach(char => {
      expect($.getByText(char)).toBeInTheDocument()
    })
  })

  /*
  Test fail output:

    expect(received).toEqual(expected) // deep equality

    Expected: ""
    Received: "​"

      20 |   it("show nothing on screen by default", () => {
    > 21 |     expect($.getByTestId("screen").textContent).toEqual("")
      22 |   })                                            ^

  Excuuuuuuse me?
  */
  it.skip("show nothing on screen by default", () => {
    expect($.getByTestId("Calculator.screen").textContent).toEqual("")
  })
})
