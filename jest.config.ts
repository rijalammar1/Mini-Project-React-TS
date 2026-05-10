import type { Config } from "jest"

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/*.test.{ts,tsx}",
    "!**/*.spec.{ts,tsx}",
  ],

  coverageReporters: ["text", "html", "lcov"],
  coverageDirectory: "./coverage",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
}

export default config
