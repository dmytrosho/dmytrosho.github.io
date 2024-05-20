import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import path from 'path'

const outputDir = fileURLToPath(new URL('../', import.meta.url))
const buildTempDir = fileURLToPath(new URL('../temp', import.meta.url))

function customBuild() {
  return {
    name: 'custom-build',
    async writeBundle() {
      try {
        console.log('Starting custom build...')
        const filesToCopy = ['favicon.ico', 'index.html']
        const dirsToCopy = ['assets']

        for (const file of filesToCopy) {
          const src = path.join(buildTempDir, file)
          const dest = path.join(outputDir, file)
          if (await fs.pathExists(src)) {
            await fs.copy(src, dest)
            console.log(`Copied file: ${file}`)
          } else {
            console.log(`File not found: ${file}`)
          }
        }

        for (const dir of dirsToCopy) {
          const src = path.join(buildTempDir, dir)
          const dest = path.join(outputDir, dir)
          if (await fs.pathExists(src)) {
            await fs.copy(src, dest)
            console.log(`Copied directory: ${dir}`)
          } else {
            console.log(`Directory not found: ${dir}`)
          }
        }

        await fs.remove(buildTempDir)
        console.log('Removed temp directory')
      } catch (error) {
        console.error('Error in custom build plugin:', error)
      }
    }
    // async buildStart() {
    //   await fs.emptyDir(buildTempDir)
    // },
    // async buildEnd() {
    //   const filesToCopy = ['favicon.ico', 'index.html']
    //   const dirsToCopy = ['assets']

    //   for (const file of filesToCopy) {
    //     const src = path.join(buildTempDir, file)
    //     const dest = path.join(outputDir, file)
    //     if (await fs.pathExists(src)) {
    //       await fs.copy(src, dest)
    //     }
    //   }

    //   for (const dir of dirsToCopy) {
    //     const src = path.join(buildTempDir, dir)
    //     const dest = path.join(outputDir, dir)
    //     if (await fs.pathExists(src)) {
    //       await fs.copy(src, dest)
    //     }
    //   }

    //   await fs.remove(buildTempDir)
    // }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(), customBuild],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: buildTempDir,
    emptyOutDir: true
  }
})
