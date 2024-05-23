import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import path from 'path'

const outputDir = fileURLToPath(new URL('../', import.meta.url))
const buildTempDir = fileURLToPath(new URL('../temp', import.meta.url))

async function copyFiles() {
  const filesToCopy = ['favicon.ico', 'index.html']
  const assetsDir = path.join(outputDir, 'assets')

  try {
    if (await fs.pathExists(assetsDir)) {
      console.log('Removing existing assets directory...');
      await fs.remove(assetsDir);
    }


    for (const file of filesToCopy) {
      const srcPath = path.join(buildTempDir, file)
      const destPath = path.join(outputDir, file)
      if (await fs.pathExists(srcPath)) {
        console.log(`Copying file: ${file}`)
        await fs.copy(srcPath, destPath)
      } else {
        console.log(`File not found: ${file}`)
      }
    }

    const srcAssetsPath = path.join(buildTempDir, 'assets')
    if (await fs.pathExists(srcAssetsPath)) {
      console.log('Copying assets directory...')
      await fs.copy(srcAssetsPath, assetsDir);
    } else {
      console.log('Assets directory not found');
    }

    console.log('Removing temporary build directory...')
    await fs.remove(buildTempDir)
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
