module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    rules: {
        'no-console': 0,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 2,
            },
        },
    ],
};
