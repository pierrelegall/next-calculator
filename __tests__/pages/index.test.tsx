import "@testing-library/jest-dom"
import { render, screen as $ } from "@testing-library/react"

import Home from "../../pages/index"

describe("Home", () => {
  beforeEach(() => render(<Home />))

  it("show a calculator", () => {
    expect($.getByTestId("Calculator")).toBeInTheDocument()
  })
})
