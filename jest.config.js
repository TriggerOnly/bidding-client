module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
        "/node_modules/",
        "/src/pages/TenderPlatform/",
        "/src/pages/ContestRequirements/",
    ],
    moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy"
    },
    extensionsToTreatAsEsm: [".js", ".jsx"]
  };
  