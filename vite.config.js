import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import process from 'process'
dotenv.config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    host: true,
    strictPort: true,
    allowedHosts: [
      "bingehall.onrender.com"
    ],
    port: process.env.PORT // change here
  }
})
