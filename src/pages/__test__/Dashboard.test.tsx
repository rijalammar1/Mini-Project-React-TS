import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

import Dashboard from "../Dashboard"

describe("Dashboard page", () => {
  it("renders dashboard content", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    )

    expect(screen.getByText("Welcome to Dashboard")).toBeInTheDocument()

    expect(screen.getByText("Ini adalah mini project saya")).toBeInTheDocument()
  })

  it("opens sidebar when navbar button clicked", async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    )

    const button = screen.getAllByRole("button")[0]

    await user.click(button)

    expect(screen.getByText("Mini Project")).toBeInTheDocument()
  })
})
