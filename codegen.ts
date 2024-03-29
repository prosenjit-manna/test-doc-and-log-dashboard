import { CodegenConfig } from '@graphql-codegen/cli'


const config: CodegenConfig = {
  schema: process.env.VITE_API_URL,
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client'
    }
  }
}
 
export default config