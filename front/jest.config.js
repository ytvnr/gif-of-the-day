module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        // tell Jest to handle `*.vue` files
        'vue',
    ],
    transform: {
        // process `*.vue` files with `vue-jest`
        '.*\\.(vue)$': 'vue-jest',
        // process js with `babel-jest`
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    },
    moduleNameMapper: {
        // support the same @ -> src alias mapping in our source code
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverage: false,
    collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
    coverageDirectory: 'coverage'
};
