module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true
  },
  extends: "eslint:recommended",
  // required to lint *.vue files
  plugins: [
    "html"
  ],
  // add your custom rules here
  rules: {
    "space-before-function-paren": [
        "error",
        "never"
    ],
    "no-mixed-operators": 0,
    "no-undef": 1,
        "no-console": 1,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
  },
  globals: {}
}
