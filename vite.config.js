import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodeResolve from '@rollup/plugin-node-resolve'; // Add this line

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodeResolve()], // Add nodeResolve() here
  build: {
    outDir: 'build',
  },
});
