import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import Home from "../../pages/index"

const $ = {
  calculator: () => screen.getByTestId("Calculator")
}

describe("Home", () => {
  beforeEach(() => render(<Home />))

  it("show a calculator", () => {
    expect($.calculator()).toBeInTheDocument()
  })
})
