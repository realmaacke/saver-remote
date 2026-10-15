import { defineConfig } from "oxlint";

export default defineConfig({
    plugins: ["typescript", "oxc", "node"],
    options: {
        typeAware: true,
        typeCheck: true,
        maxWarnings: 10
    },

    categories: {
        correctness: "error",
        suspicious: "warn",
        pedantic: "warn"
    },
    
    rules: {
        "eslint/no-unused-vars": "error",
    },
});