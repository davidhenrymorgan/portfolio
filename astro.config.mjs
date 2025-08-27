// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: Replace 'username' with your actual GitHub username
  site: 'https://username.github.io',
  base: '/portfolio',
  output: 'static',
  
  integrations: [react()],
  
  // Build configuration for GitHub Pages
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  
  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]'
        }
      }
    }
  }
});