import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

import Sidebar from "../Sidebar"

import * as auth from "../../routes/auth"

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}))

jest.mock("../../routes/auth")

describe("Sidebar component", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders sidebar when open", () => {
    render(
      <MemoryRouter>
        <Sidebar open={true} setOpen={jest.fn()} />
      </MemoryRouter>,
    )

    expect(screen.getByText("Mini Project")).toBeInTheDocument()
  })

  it("renders sidebar when closed", () => {
    render(
      <MemoryRouter>
        <Sidebar open={false} setOpen={jest.fn()} />
      </MemoryRouter>,
    )

    expect(screen.getByText("Mini Project")).toBeInTheDocument()
  })

  it("calls setOpen(false) when close button clicked", async () => {
    const user = userEvent.setup()

    const mockSetOpen = jest.fn()

    render(
      <MemoryRouter>
        <Sidebar open={true} setOpen={mockSetOpen} />
      </MemoryRouter>,
    )

    const buttons = screen.getAllByRole("button")

    await user.click(buttons[0])

    expect(mockSetOpen).toHaveBeenCalledWith(false)
  })

  it("calls setOpen(false) when overlay clicked", async () => {
    const user = userEvent.setup()

    const mockSetOpen = jest.fn()

    const { container } = render(
      <MemoryRouter>
        <Sidebar open={true} setOpen={mockSetOpen} />
      </MemoryRouter>,
    )

    const overlay = container.querySelector(".bg-black\\/50")

    expect(overlay).toBeInTheDocument()

    await user.click(overlay!)

    expect(mockSetOpen).toHaveBeenCalledWith(false)
  })

  it("logout button works", async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Sidebar open={true} setOpen={jest.fn()} />
      </MemoryRouter>,
    )

    await user.click(screen.getByText("Logout"))

    expect(auth.removeToken).toHaveBeenCalled()

    expect(mockNavigate).toHaveBeenCalledWith("/login")
  })
})
