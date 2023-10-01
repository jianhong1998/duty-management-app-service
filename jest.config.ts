import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/api-tests/'],
    setupFilesAfterEnv: ['./src/testHelper/testSetup.ts'],
    verbose: true,
    collectCoverage: true,
    passWithNoTests: true,
};

export default config;
