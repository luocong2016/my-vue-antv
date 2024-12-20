import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const componentName = 'table'

function capitalizeFirstLetter(str: string) {
  if (str.length === 0) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// https://vite.dev/config/
export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],

  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // 保留 console 语句
        drop_debugger: false, // 保留 debugger 语句
      },
    },
    lib: {
      entry: path.resolve(
        __dirname,
        `src/components/${componentName}/index.ts`
      ),
      name: capitalizeFirstLetter(componentName),
      fileName: (format) => `my-lib.${componentName}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
