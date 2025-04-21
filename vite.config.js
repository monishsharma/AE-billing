import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true
  },
  esbuild: {
    loader: "jsx", // ✅ Enables JSX in .js files
    include: /src\/.*\.js$/, // ✅ Applies only to your source files
  },
})
