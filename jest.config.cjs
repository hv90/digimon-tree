const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // O diretório onde o Next.js armazena os arquivos gerados
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"], // Para carregar o setup
  moduleNameMapper: {
    // Mapeia as importações para serem ignoradas durante os testes
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    '^graph-ui/(.*)$': '<rootDir>/node_modules/graph-ui/$1',
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  watchman: false,
};

module.exports = createJestConfig(customJestConfig);
