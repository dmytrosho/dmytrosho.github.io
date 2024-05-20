import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import path from 'path'

const outputDir = fileURLToPath(new URL('../', import.meta.url))
const buildTempDir = fileURLToPath(new URL('../temp', import.meta.url))

async function copyFiles() {
  const filesToCopy = ['favicon.ico', 'index.html']
  const dirsToCopy = ['assets']

  try {
    console.log('Starting custom build...')

    for (const file of filesToCopy) {
      const srcPath = path.join(buildTempDir, file)
      const destPath = path.join(outputDir, file)
      console.log(`Attempting to copy file from ${srcPath} to ${destPath}`)
      if (await fs.pathExists(srcPath)) {
        await fs.copy(srcPath, destPath)
        console.log(`Copied file: ${file}`)
      } else {
        console.log(`File not found: ${file}`)
      }
    }

    for (const dir of dirsToCopy) {
      const srcPath = path.join(buildTempDir, dir)
      const destPath = path.join(outputDir, dir)
      console.log(`Attempting to copy directory from ${srcPath} to ${destPath}`)
      if (await fs.pathExists(srcPath)) {
        await fs.copy(srcPath, destPath)
        console.log(`Copied directory: ${dir}`)
      } else {
        console.log(`Directory not found: ${dir}`)
      }
    }

    await fs.remove(buildTempDir)
    console.log('Removed temp directory')
  } catch (error) {
    console.error('Error in custom build:', error)
  }
}

function customBuild() {
  return {
    name: 'custom-build',
    closeBundle: copyFiles
  }
}

export default defineConfig({
  base: '/',
  plugins: [vue(), customBuild()],
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
