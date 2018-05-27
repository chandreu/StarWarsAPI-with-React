module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "parserOptions": {
        "ecmaVersion": 8,
        "ecmaFeatures": {
          "experimentalObjectRestSpread": true
        }
      },
    "rules": {
        "react/jsx-filename-extension": 0,
        "no-use-before-define":0,
        "react/prefer-stateless-function": "off",
        "import/prefer-default-export": "off",
        "react/prop-types": "off",
        "class-methods-use-this": "off",
        "arrow-body-style": "off",
    }
};