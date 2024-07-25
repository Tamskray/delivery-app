import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ["node_modules", "dist"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "next",
        },
      ],
      "no-undef": "error",
    },
  },

  pluginJs.configs.recommended,
];
