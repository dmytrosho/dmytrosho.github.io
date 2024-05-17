import './assets/app.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import NProgress from 'nprogress'

const app = createApp(App)

app.use(router)

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  document.title = to.meta.title
  next()
})

router.afterEach(() => {
  NProgress.done()
})

app.mount('#app')
