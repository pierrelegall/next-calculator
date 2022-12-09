import "@testing-library/jest-dom"
import { render, fireEvent, screen as $ } from "@testing-library/react"

import Calculator from "../../components/Calculator"

describe("Calculator", () => {
  beforeEach(() => render(<Calculator />))

  it("have inputs shown", () => {
    expect(getInputs()).toBeInTheDocument()
  })

  it("have a output shown", () => {
    expect(getOutput()).toBeInTheDocument()
  })

  it("have all buttons", () => {
    "01234567890+-×÷↩=C".split("").forEach(char => {
      expect(getButton(char)).toBeInTheDocument()
    })
  })

  it("have inputs and output empty by default", () => {
    expect(getInputs()).toHaveValue("")
    expect(getOutput()).toHaveValue("")
  })

  it("add char to the calculation on click", () => {
    fireEvent.click(getButton("5"))
    expect(getInputs()).toHaveValue("5")

    fireEvent.click(getButton("+"))
    expect(getInputs()).toHaveValue("5+")

    fireEvent.click(getButton("7"))
    expect(getInputs()).toHaveValue("5+7")
  })

  it("remove a char from the input on ↩ click", () => {
    fireEvent.click(getButton("2"))
    fireEvent.click(getButton("+"))
    fireEvent.click(getBackButton())
    expect(getOutput()).toHaveValue("2")
  })

  it("remove all char from the input on C click", () => {
    fireEvent.click(getButton("2"))
    fireEvent.click(getButton("+"))
    fireEvent.click(getClearButton())
    expect(getOutput()).toHaveValue("")
  })

  it("show no result if calculation not valid", () => {
    fireEvent.click(getButton("5"))
    fireEvent.click(getButton("+"))
    fireEvent.click(getButton("+"))
    fireEvent.click(getButton("2"))
    expect(getOutput()).toHaveValue("")
  })

  it("show the result of + calculation", () => {
    fireEvent.click(getButton("5"))
    fireEvent.click(getButton("+"))
    fireEvent.click(getButton("7"))
    expect(getOutput()).toHaveValue("12")
  })

  it("show the result of - calculation", () => {
    fireEvent.click(getButton("5"))
    fireEvent.click(getButton("-"))
    fireEvent.click(getButton("7"))
    expect(getOutput()).toHaveValue("-2")
  })

  it("show the result of × calculation", () => {
    fireEvent.click(getButton("4"))
    fireEvent.click(getButton("×"))
    fireEvent.click(getButton("8"))
    expect(getOutput()).toHaveValue("32")
  })

  it("show the result of ÷ calculation", () => {
    fireEvent.click(getButton("4"))
    fireEvent.click(getButton("5"))
    fireEvent.click(getButton("÷"))
    fireEvent.click(getButton("9"))
    expect(getOutput()).toHaveValue("5")
  })
})

function getInputs() {
  return $.getByTestId("inputs")
}

function getOutput() {
  return $.getByTestId("output")
}

function getButton(label: string) {
  return $.getByText(label)
}

function getBackButton() {
  return $.getByText("↩")
}

function getClearButton() {
  return $.getByText("C")
}
