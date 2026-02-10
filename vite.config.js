import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // SPA fallback for dev server
  server: {
    historyApiFallback: true,
  },
  // Ensure proper preview server config
  preview: {
    historyApiFallback: true,
  },
})
