module.exports = {
    testEnvironment: "jsdom",
    roots: ["<rootDir>/src"],
    testMatch: ["**/*.{js,jsx,ts,tsx}"],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
  };
  