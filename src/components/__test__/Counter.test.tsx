import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Counter from "../Counter"

describe("Counter component", () => {
  it("renders with default initial count of 0", () => {
    render(<Counter />)
    expect(screen.getByTestId("count-value")).toHaveTextContent("0")
  })

  it("renders with a custom initial count", () => {
    render(<Counter initialCount={10} />)
    expect(screen.getByTestId("count-value")).toHaveTextContent("10")
  })

  it("renders with a custom label", () => {
    render(<Counter label="My Counter" />)
    expect(screen.getByText("My Counter")).toBeInTheDocument()
  })

  it("increments count when + button is clicked", async () => {
    const user = userEvent.setup()
    render(<Counter initialCount={5} />)

    await user.click(screen.getByTestId("increment-button"))

    expect(screen.getByTestId("count-value")).toHaveTextContent("6")
  })

  it("decrements count when - button is clicked", async () => {
    const user = userEvent.setup()
    render(<Counter initialCount={5} />)

    await user.click(screen.getByTestId("decrement-button"))

    expect(screen.getByTestId("count-value")).toHaveTextContent("4")
  })

  it("resets count to initial value when Reset button is clicked", async () => {
    const user = userEvent.setup()
    render(<Counter initialCount={3} />)

    await user.click(screen.getByTestId("increment-button"))
    await user.click(screen.getByTestId("increment-button"))
    expect(screen.getByTestId("count-value")).toHaveTextContent("5")

    await user.click(screen.getByTestId("reset-button"))
    expect(screen.getByTestId("count-value")).toHaveTextContent("3")
  })

  it("handles multiple increments and decrements", async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByTestId("increment-button"))
    await user.click(screen.getByTestId("increment-button"))
    await user.click(screen.getByTestId("increment-button"))
    await user.click(screen.getByTestId("decrement-button"))

    expect(screen.getByTestId("count-value")).toHaveTextContent("2")
  })

  it("renders all buttons", () => {
    render(<Counter />)
    expect(screen.getByTestId("increment-button")).toBeInTheDocument()
    expect(screen.getByTestId("decrement-button")).toBeInTheDocument()
    expect(screen.getByTestId("reset-button")).toBeInTheDocument()
  })
})
