module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "prettier"],

  "rules": {
        "@typescript-eslint/no-var-requires": 0,
        "prettier/prettier": 0,
        "semi": [
            "error",
            "always"
        ],
        "quotes": [
            "error",
            "double",
            {
                "avoidEscape": true
            }
        ],
        "no-console": "off",
        "no-undef": 0,
        "no-inferrable-types": 0
    }
};
