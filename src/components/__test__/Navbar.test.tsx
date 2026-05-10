import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import Navbar from "../Navbar"

describe("Navbar component", () => {
  it("renders Dashboard title on / route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar setOpen={jest.fn()} />
      </MemoryRouter>,
    )

    expect(screen.getByText("Dashboard")).toBeInTheDocument()
  })

  it("renders List User title on /list-user route", () => {
    render(
      <MemoryRouter initialEntries={["/list-user"]}>
        <Navbar setOpen={jest.fn()} />
      </MemoryRouter>,
    )

    expect(screen.getByText("List User")).toBeInTheDocument()
  })

  it("renders Detail User title on dynamic route", () => {
    render(
      <MemoryRouter initialEntries={["/users/1"]}>
        <Navbar setOpen={jest.fn()} />
      </MemoryRouter>,
    )

    expect(screen.getByText("Detail User")).toBeInTheDocument()
  })

  it("calls setOpen when menu button is clicked", async () => {
    const user = userEvent.setup()
    const mockSetOpen = jest.fn()

    render(
      <MemoryRouter>
        <Navbar setOpen={mockSetOpen} />
      </MemoryRouter>,
    )

    const button = screen.getByRole("button")

    await user.click(button)

    expect(mockSetOpen).toHaveBeenCalledWith(true)
  })
})
