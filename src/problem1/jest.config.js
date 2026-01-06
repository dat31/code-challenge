module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    '*.ts',
    '!*.test.ts',
    '!*.spec.ts',
    '!**/__tests__/**',
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true,
};

