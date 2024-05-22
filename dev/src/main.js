import './assets/app.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import NProgress from 'nprogress'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoon, faSpinner, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMoon, faSpinner, faSun)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
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
