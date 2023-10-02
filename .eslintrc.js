/** @type { import("eslint").Linter.Config } */
const config = {
    root: true,
    extends: ["moongoal"],

    env: {
        node: true
    },

    rules: {
        "@typescript-eslint/no-explicit-any": "off"
    }
};

module.exports = config;
