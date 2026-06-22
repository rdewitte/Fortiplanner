import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'forticamera-planner' with YOUR actual GitHub repository name
// e.g. if your repo URL is github.com/yourname/my-repo → base: '/my-repo/'
export default defineConfig({
  plugins: [react()],
  base: '/Fortiplanner/',
})
