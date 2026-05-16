import toast from "react-hot-toast"

import { showSuccess, showError } from "../Toast"

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}))

describe("Toast utils", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("calls toast.success", () => {
    showSuccess("Success message")

    expect(toast.success).toHaveBeenCalledWith("Success message")
  })

  it("calls toast.error", () => {
    showError("Error message")

    expect(toast.error).toHaveBeenCalledWith("Error message")
  })
})
