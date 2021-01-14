module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        //'plugin:vue/recommended',
        'plugin:vue/base'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        'no-console': 'off'
    }
};