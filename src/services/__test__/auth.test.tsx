import axios from "axios"

import { login, register, listUser, getDetailUser } from "../auth"

jest.mock("axios")

const mockedAxios = axios as jest.Mocked<typeof axios>

describe("API service", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("calls login API correctly", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        token: "abc123",
      },
    })

    const result = await login("test@mail.com", "123456")

    expect(mockedAxios.post).toHaveBeenCalled()

    expect(result).toEqual({
      token: "abc123",
    })
  })

  it("calls register API correctly", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        id: 1,
        token: "register-token",
      },
    })

    const result = await register("test@mail.com", "123456")

    expect(mockedAxios.post).toHaveBeenCalled()

    expect(result).toEqual({
      id: 1,
      token: "register-token",
    })
  })

  it("calls listUser API correctly", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        data: [],
      },
    })

    const result = await listUser(2)

    expect(mockedAxios.get).toHaveBeenCalled()

    expect(result).toEqual({
      data: [],
    })
  })

  it("calls getDetailUser API correctly", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        data: {
          id: 1,
        },
      },
    })

    const result = await getDetailUser(1)

    expect(mockedAxios.get).toHaveBeenCalled()

    expect(result).toEqual({
      data: {
        id: 1,
      },
    })
  })
})
