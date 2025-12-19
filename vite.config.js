import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteCompression from 'vite-plugin-compression';
// import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress', // or 'brotliCompress'
      threshold: 1024, // only compress files > 1KB
    }),
    // visualizer({
    //   open: true, // Optional: automatically opens the report in your browser
    //   filename: "bundle-stats.html", // Optional: specify the output file name
    // })
  ],
  build: {
    sourcemap: true
  }
})
