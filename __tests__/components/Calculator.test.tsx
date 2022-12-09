import "@testing-library/jest-dom"
import { render, fireEvent, screen as $ } from "@testing-library/react"

import Calculator from "../../components/Calculator"

const $$ = {
  inputs: () => $.getByTestId("inputs"),
  output: () => $.getByTestId("output"),
  button: (label: string) => $.getByText(label),
  backButton: () => $.getByText("↩"),
  clearButton: () => $.getByText("C")
}

describe("Calculator", () => {
  beforeEach(() => render(<Calculator />))

  it("have inputs shown", () => {
    expect($$.inputs()).toBeInTheDocument()
  })

  it("have a output shown", () => {
    expect($$.output()).toBeInTheDocument()
  })

  it("have all buttons", () => {
    "()01234567890+-×÷↩C".split("").forEach(char => {
      expect($$.button(char)).toBeInTheDocument()
    })
  })

  it("have inputs and output empty by default", () => {
    expect($$.inputs()).toHaveValue("")
    expect($$.output()).toHaveValue("")
  })

  it("add char to the calculation on click", () => {
    fireEvent.click($$.button("5"))
    expect($$.inputs()).toHaveValue("5")

    fireEvent.click($$.button("+"))
    expect($$.inputs()).toHaveValue("5+")

    fireEvent.click($$.button("7"))
    expect($$.inputs()).toHaveValue("5+7")
  })

  it("remove a char from the input on ↩ click", () => {
    fireEvent.click($$.button("2"))
    fireEvent.click($$.button("+"))
    fireEvent.click($$.backButton())
    expect($$.output()).toHaveValue("2")
  })

  it("remove all char from the input on C click", () => {
    fireEvent.click($$.button("2"))
    fireEvent.click($$.button("+"))
    fireEvent.click($$.clearButton())
    expect($$.output()).toHaveValue("")
  })

  it("show no result if calculation not valid", () => {
    fireEvent.click($$.button("5"))
    fireEvent.click($$.button("+"))
    fireEvent.click($$.button("+"))
    fireEvent.click($$.button("2"))
    expect($$.output()).toHaveValue("")
  })

  it("show the result of + calculation", () => {
    fireEvent.click($$.button("5"))
    fireEvent.click($$.button("+"))
    fireEvent.click($$.button("7"))
    expect($$.output()).toHaveValue("12")
  })

  it("show the result of - calculation", () => {
    fireEvent.click($$.button("5"))
    fireEvent.click($$.button("-"))
    fireEvent.click($$.button("7"))
    expect($$.output()).toHaveValue("-2")
  })

  it("show the result of × calculation", () => {
    fireEvent.click($$.button("4"))
    fireEvent.click($$.button("×"))
    fireEvent.click($$.button("8"))
    expect($$.output()).toHaveValue("32")
  })

  it("show the result of ÷ calculation", () => {
    fireEvent.click($$.button("4"))
    fireEvent.click($$.button("5"))
    fireEvent.click($$.button("÷"))
    fireEvent.click($$.button("9"))
    expect($$.output()).toHaveValue("5")
  })

  it("show the result of calculation with ()", () => {
    fireEvent.click($$.button("2"))
    fireEvent.click($$.button("×"))
    fireEvent.click($$.button("("))
    fireEvent.click($$.button("4"))
    fireEvent.click($$.button("+"))
    fireEvent.click($$.button("5"))
    fireEvent.click($$.button(")"))
    expect($$.output()).toHaveValue("18")
  })
})
