/* eslint-disable node/no-path-concat */
import { fileURLToPath, URL } from 'url'
import path, { resolve, dirname } from 'path-browserify'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import stylelint from 'vite-plugin-stylelint'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
const root = process.cwd()
const pwaOptions = {
  includeAssets: ['favicon.svg'],
  injectRegister: 'auto',
  manifest: {
    name: 'DashBoard-Base-App', // 應用程式名稱
    short_name: 'DashBoard-Base', // 應用程式簡稱
    start_url: '/', // 啟動頁面 URL
    display: 'standalone', // 顯示模式
    background_color: '#ffffff', // 背景顏色
    theme_color: '#000000', // 主題顏色
    icons: [
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  registerType: 'autoUpdate',
  workbox: {
    cleanupOutdatedCaches: true, // 清理舊的快取
    skipWaiting: true, // 當新 Service Worker 可用時立即接管
    clientsClaim: true, // 立即控制所有打開的客戶端
    sourcemap: true, // 生成 sourcemap
    runtimeCaching: [
      {
        urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts靜態資源保存
        handler: 'CacheFirst',
        options: {
          cacheName: 'js-css-cache',
        },
      },
      {
        urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 圖片存檔
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
        },
      },
    ],
  },
}
export default defineConfig(({ command, mode }) => {
  let env = {}
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      viteMockServe({
        mockPath: './server/mock',
        localEnabled: env.VITE_USE_LOCAL_MOCK || false, // 開發打包開關
        prodEnabled: env.VITE_USE_PROD_MOCK || false, // 生產打包開關
        injectCode: 'setupProdMockServer()',
        logger: false, // 是否在控制台顯示請求日誌
        supportTs: false,
      }),
      vueJsx(),
      stylelint(),
      mkcert(),
      createSvgIconsPlugin({
      // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // Specify symbolId format
        symbolId: 'icon-[name]',
      }),
      VueI18nPlugin({
        compositionOnly: false,
        runtimeOnly: false,
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
      }),
      quasar({
        sassVariables: 'src/styles/abstracts/quasar-variables.scss',
      }),
      VitePWA(pwaOptions),
    ],
    test: {
      environment: 'happy-dom',
    },
    server: {
      https: false,
      cors: true,
      port: 3000,
      host: true,
      hmr: {
        port: 3000,
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
        path: 'path-browserify',
      },
      dedupe: ['vue'],
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'dist/index.html'),
      },
    },
  }
})
