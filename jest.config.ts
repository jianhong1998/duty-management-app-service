import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/api-tests/'],
    setupFilesAfterEnv: ['./src/app/testHelper/testSetup.ts'],
    verbose: true,
    collectCoverage: true,
};

export default config;
