module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "mocha": true,
        "jquery": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "disallow-methods"
    ],
    "rules": {
        "indent": [
            "error",
            2,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "max-len": [
            "warn", 120,
            { "ignoreComments": true,
              "ignoreStrings": true,
              "ignoreTemplateLiterals": true,
              "ignoreRegExpLiterals": true },
        ],
        "no-console": [
            "error", 
            { "allow": ["warn", "error"] }
        ],
        "no-multiple-empty-lines": [
            "error",
            { "max": 2, "maxBOF": 1}
        ],
        "react/prop-types": [
            "error",
            {"skipUndeclared": true}
        ],
        "disallow-methods/disallow-methods": ["error", [
            {
                "object": "Object",
                "method": "assign"
            },
            // TODO: Add support for disabling includes
        ]]
    },
    "globals": {
        "ga": true,
        "amplitude": true,
        "fbq": true,
        "FB": true
    }
};
