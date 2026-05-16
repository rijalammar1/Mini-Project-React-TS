import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

import ListUser from "../ListUser"

import * as authService from "../../services/auth"

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}))

jest.mock("../../services/auth")

describe("ListUser page", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders users from API", async () => {
    ;(authService.listUser as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 1,
          first_name: "Ammar",
          last_name: "Rijal",
          avatar: "avatar.jpg",
        },
      ],
      total_pages: 2,
    })

    render(
      <MemoryRouter>
        <ListUser />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText("Rijal Ammar")).toBeInTheDocument()
    })
  })

  it("navigates to detail page when user clicked", async () => {
    const user = userEvent.setup()

    ;(authService.listUser as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 1,
          first_name: "Ammar",
          last_name: "Rijal",
          avatar: "avatar.jpg",
        },
      ],
      total_pages: 2,
    })

    render(
      <MemoryRouter>
        <ListUser />
      </MemoryRouter>,
    )

    const userCard = await screen.findByText("Rijal Ammar")

    await user.click(userCard)

    expect(mockNavigate).toHaveBeenCalledWith("/users/1")
  })

  it("changes page when next button clicked", async () => {
    const user = userEvent.setup()

    ;(authService.listUser as jest.Mock).mockResolvedValue({
      data: [],
      total_pages: 2,
    })

    render(
      <MemoryRouter>
        <ListUser />
      </MemoryRouter>,
    )

    const nextButton = await screen.findByText("Next")

    await user.click(nextButton)

    expect(authService.listUser).toHaveBeenCalled()
  })

  it("changes page when prev button clicked", async () => {
    const user = userEvent.setup()

    ;(authService.listUser as jest.Mock).mockResolvedValue({
      data: [],
      total_pages: 2,
    })

    render(
      <MemoryRouter>
        <ListUser />
      </MemoryRouter>,
    )

    const nextButton = await screen.findByText("Next")

    await user.click(nextButton)

    const prevButton = await screen.findByText("Prev")

    await user.click(prevButton)

    expect(authService.listUser).toHaveBeenCalled()
  })

  it("handles API error", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {})

    ;(authService.listUser as jest.Mock).mockRejectedValue(
      new Error("API Error"),
    )

    render(
      <MemoryRouter>
        <ListUser />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled()
    })

    consoleSpy.mockRestore()
  })
})
