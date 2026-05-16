import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

import Login from "../Login"

import * as authService from "../../services/auth"
import * as authRoute from "../../routes/auth"
import * as toast from "../../components/Toast"

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}))

jest.mock("../../services/auth")
jest.mock("../../routes/auth")
jest.mock("../../components/Toast")

describe("Login page", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders login page", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("heading", {
        name: "Login",
      }),
    ).toBeInTheDocument()
  })

  it("updates email input", async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    const emailInput = screen.getByPlaceholderText("Input your Email")

    await user.type(emailInput, "test@mail.com")

    expect(emailInput).toHaveValue("test@mail.com")
  })

  it("login success", async () => {
    const user = userEvent.setup()

    ;(authService.login as jest.Mock).mockResolvedValue({
      token: "abc123",
    })

    render(
      <MemoryRouter>
        <Login />
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
        name: /login/i,
      }),
    )

    expect(authService.login).toHaveBeenCalledWith("test@mail.com", "123456")

    expect(authRoute.setToken).toHaveBeenCalledWith("abc123")

    expect(toast.showSuccess).toHaveBeenCalledWith("Login berhasil")

    expect(mockNavigate).toHaveBeenCalledWith("/")
  })

  it("shows API error message", async () => {
    const user = userEvent.setup()

    ;(authService.login as jest.Mock).mockRejectedValue({
      response: {
        data: {
          error: "Login gagal",
        },
      },
    })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    await user.type(
      screen.getByPlaceholderText("Input your Email"),
      "test@mail.com",
    )

    await user.type(
      screen.getByPlaceholderText("Input your Password"),
      "wrongpassword",
    )

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    )

    expect(toast.showError).toHaveBeenCalledWith("Login gagal")
  })

  it("shows default error message", async () => {
    const user = userEvent.setup()

    ;(authService.login as jest.Mock).mockRejectedValue({})

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    await user.type(
      screen.getByPlaceholderText("Input your Email"),
      "test@mail.com",
    )

    await user.type(screen.getByPlaceholderText("Input your Password"), "wrong")

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    )

    expect(toast.showError).toHaveBeenCalledWith("Login gagal")
  })
})
