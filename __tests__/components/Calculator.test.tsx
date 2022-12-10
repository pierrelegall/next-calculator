import "@testing-library/jest-dom"
import { render, fireEvent, screen } from "@testing-library/react"

import Calculator from "../../components/Calculator"

const $ = {
  inputs: () => screen.getByTestId("inputs"),
  output: () => screen.getByTestId("output"),
  button: (label: string) => screen.getByText(label),
  backButton: () => screen.getByText("↩"),
  clearButton: () => screen.getByText("C")
}

const $$ = {
  clickBackButton: () => fireEvent.click($.backButton()),
  clickClearButton: () => fireEvent.click($.clearButton()),
  clickButtons: (inputs: string) => {
    return inputs.split("").forEach(input => fireEvent.click($.button(input)))
  }
}

describe("Calculator", () => {
  beforeEach(() => render(<Calculator />))

  it("has an inputs field", () => {
    expect($.inputs()).toBeInTheDocument()
  })

  it("has an output field", () => {
    expect($.output()).toBeInTheDocument()
  })

  it("has all buttons", () => {
    "()01234567890+-×÷↩C".split("").forEach(char => {
      expect($.button(char)).toBeInTheDocument()
    })
  })

  it("has inputs and output fields empty by default", () => {
    expect($.inputs()).toHaveValue("")
    expect($.output()).toHaveValue("")
  })

  it("adds input to inputs on button click", () => {
    $$.clickButtons("5")
    expect($.inputs()).toHaveValue("5")

    $$.clickButtons("+")
    expect($.inputs()).toHaveValue("5+")

    $$.clickButtons("7")
    expect($.inputs()).toHaveValue("5+7")
  })

  it("removes an input to inputs on ↩ click", () => {
    $$.clickButtons("2+")
    $$.clickBackButton()
    expect($.output()).toHaveValue("2")
  })

  it("clears inputs on C click", () => {
    $$.clickButtons("2+")
    $$.clickClearButton()
    expect($.output()).toHaveValue("")
  })

  it("shows last valid output if calculation not valid", () => {
    $$.clickButtons("5++2")
    expect($.output()).toHaveValue("5")
  })

  it("shows output field disabled if calculation not valid", () => {
    $$.clickButtons("5++2")
    expect($.output()).toHaveAttribute("disabled")
  })

  it("shows the result of a + calculation", () => {
    $$.clickButtons("5+7")
    expect($.output()).toHaveValue("12")
  })

  it("shows the result of a - calculation", () => {
    $$.clickButtons("5-7")
    expect($.output()).toHaveValue("-2")
  })

  it("shows the result of a × calculation", () => {
    $$.clickButtons("4×8")
    expect($.output()).toHaveValue("32")
  })

  it("shows the result of a ÷ calculation", () => {
    $$.clickButtons("45÷9")
    expect($.output()).toHaveValue("5")
  })

  it("shows the result of a calculation with parenthesis", () => {
    $$.clickButtons("2×(4+5)")
    expect($.output()).toHaveValue("18")
  })
})
