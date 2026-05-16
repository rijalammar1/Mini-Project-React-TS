import { getToken, setToken, removeToken, isAuthenticated } from "../auth"

describe("Auth utility", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("sets token to localStorage", () => {
    setToken("abc123")

    expect(localStorage.getItem("token")).toBe("abc123")
  })

  it("gets token from localStorage", () => {
    localStorage.setItem("token", "my-token")

    expect(getToken()).toBe("my-token")
  })

  it("removes token from localStorage", () => {
    localStorage.setItem("token", "delete-me")

    removeToken()

    expect(getToken()).toBeNull()
  })

  it("returns true when authenticated", () => {
    localStorage.setItem("token", "abc123")

    expect(isAuthenticated()).toBe(true)
  })

  it("returns false when not authenticated", () => {
    localStorage.removeItem("token")

    expect(isAuthenticated()).toBe(false)
  })
})
