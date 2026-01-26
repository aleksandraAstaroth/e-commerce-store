import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://api.escuelajs.co/graphql",
  documents: ["src/graphql/**/*.{ts,tsx}", "src/graphql/**/*.graphql", "src/**/*.{graphql,gql,ts,tsx}"],
  generates: {
    "./src/generated/gql_types/": {
      preset: "client",
      config: {
        typesPrefix: "I",
      },
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/generated/schema-types.ts": {
        plugins: ["typescript", "typescript-operations"],
        config: {
          typesPrefix: "I",
        },
  }  },

};

export default config;
