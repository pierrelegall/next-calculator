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

  it("have inputs shown", () => {
    expect($.inputs()).toBeInTheDocument()
  })

  it("have a output shown", () => {
    expect($.output()).toBeInTheDocument()
  })

  it("have all buttons", () => {
    "()01234567890+-×÷↩C".split("").forEach(char => {
      expect($.button(char)).toBeInTheDocument()
    })
  })

  it("have inputs and output empty by default", () => {
    expect($.inputs()).toHaveValue("")
    expect($.output()).toHaveValue("")
  })

  it("add char to the calculation on click", () => {
    $$.clickButtons("5")
    expect($.inputs()).toHaveValue("5")

    $$.clickButtons("+")
    expect($.inputs()).toHaveValue("5+")

    $$.clickButtons("7")
    expect($.inputs()).toHaveValue("5+7")
  })

  it("remove a char from the input on ↩ click", () => {
    $$.clickButtons("2+")
    $$.clickBackButton()
    expect($.output()).toHaveValue("2")
  })

  it("remove all char from the input on C click", () => {
    $$.clickButtons("2+")
    $$.clickClearButton()
    expect($.output()).toHaveValue("")
  })

  it("show no result if calculation not valid", () => {
    $$.clickButtons("5++2")
    expect($.output()).toHaveValue("")
  })

  it("show the result of + calculation", () => {
    $$.clickButtons("5+7")
    expect($.output()).toHaveValue("12")
  })

  it("show the result of - calculation", () => {
    $$.clickButtons("5-7")
    expect($.output()).toHaveValue("-2")
  })

  it("show the result of × calculation", () => {
    $$.clickButtons("4×8")
    expect($.output()).toHaveValue("32")
  })

  it("show the result of ÷ calculation", () => {
    $$.clickButtons("45÷9")
    expect($.output()).toHaveValue("5")
  })

  it("show the result of calculation with ()", () => {
    $$.clickButtons("2×(4+5)")
    expect($.output()).toHaveValue("18")
  })
})
