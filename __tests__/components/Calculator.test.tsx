import "@testing-library/jest-dom"
import { render, screen as $ } from "@testing-library/react"

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
    "01234567890+-×÷↩=".split("").forEach(char => {
      expect($.getByText(char)).toBeInTheDocument()
    })
  })

  it("have inputs and output empty by default", () => {
    expect(getInputs()).toHaveValue("")
    expect(getOutput()).toHaveValue("")
  })
})

function getInputs() {
  return $.getByTestId("inputs")
}

function getOutput() {
  return $.getByTestId("output")
}
