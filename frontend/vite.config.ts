/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  server:{
    port:3000,
    strictPort: true,
    hmr:{
      clientPort: 3000,
    },
    proxy:{
      '/api':{
        target:'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  build: {
    outDir: 'build'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: false
  }
})
