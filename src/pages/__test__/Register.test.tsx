import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

import Register from "../Register"

import * as authService from "../../services/auth"
import * as toast from "../../components/Toast"

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}))

jest.mock("../../services/auth")
jest.mock("../../components/Toast")

describe("Register page", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders register page", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("heading", {
        name: "Register",
      }),
    ).toBeInTheDocument()
  })

  it("updates email input", async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )

    const emailInput = screen.getByPlaceholderText("Input your Email")

    await user.type(emailInput, "test@mail.com")

    expect(emailInput).toHaveValue("test@mail.com")
  })

  it("register success", async () => {
    const user = userEvent.setup()

    ;(authService.register as jest.Mock).mockResolvedValue({})

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )

    await user.type(
      screen.getByPlaceholderText("Input your Email"),
      "test@mail.com",
    )

    await user.type(
      screen.getByPlaceholderText("Input your Password"),
      "123456",
    )

    await user.click(
      screen.getByRole("button", {
        name: /register/i,
      }),
    )

    expect(authService.register).toHaveBeenCalledWith("test@mail.com", "123456")

    expect(toast.showSuccess).toHaveBeenCalledWith("Register berhasil")

    expect(mockNavigate).toHaveBeenCalledWith("/login")
  })

  it("shows API error message", async () => {
    const user = userEvent.setup()

    ;(authService.register as jest.Mock).mockRejectedValue({
      response: {
        data: {
          error: "Register gagal",
        },
      },
    })

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )

    await user.type(
      screen.getByPlaceholderText("Input your Email"),
      "test@mail.com",
    )

    await user.type(screen.getByPlaceholderText("Input your Password"), "wrong")

    await user.click(
      screen.getByRole("button", {
        name: /register/i,
      }),
    )

    expect(toast.showError).toHaveBeenCalledWith("Register gagal")
  })

  it("shows default error message", async () => {
    const user = userEvent.setup()

    ;(authService.register as jest.Mock).mockRejectedValue({})

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )

    await user.type(
      screen.getByPlaceholderText("Input your Email"),
      "test@mail.com",
    )

    await user.type(screen.getByPlaceholderText("Input your Password"), "wrong")

    await user.click(
      screen.getByRole("button", {
        name: /register/i,
      }),
    )

    expect(toast.showError).toHaveBeenCalledWith("Register gagal")
  })
})
