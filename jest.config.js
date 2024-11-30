module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],
    moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy"
    },
    extensionsToTreatAsEsm: [".jsx", ".js"],
    testMatch: [
        "/home/runner/work/bidding-client/bidding-client/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "/home/runner/work/bidding-client/bidding-client/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
      ]
  };
  