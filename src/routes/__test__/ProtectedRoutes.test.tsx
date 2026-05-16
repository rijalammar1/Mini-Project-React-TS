import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import ProtectedRoute from "../ProtectedRoutes"

import * as auth from "../auth"

jest.mock("../auth")

describe("ProtectedRoute component", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders children when authenticated", () => {
    ;(auth.isAuthenticated as jest.Mock).mockReturnValue(true)

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Protected Page</h1>
        </ProtectedRoute>
      </MemoryRouter>,
    )

    expect(screen.getByText("Protected Page")).toBeInTheDocument()
  })

  it("redirects when not authenticated", () => {
    ;(auth.isAuthenticated as jest.Mock).mockReturnValue(false)

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Protected Page</h1>
        </ProtectedRoute>
      </MemoryRouter>,
    )

    expect(screen.queryByText("Protected Page")).not.toBeInTheDocument()
  })
})
