import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'; // Use TypeScript's ES Module syntax


// https://vite.dev/config/
export default defineConfig({
  base: '/wordfilter/', // Use relative paths
  plugins: [react()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },

})
