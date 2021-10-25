import { createApp } from 'vue'
import components from '@/components/UI/index'
import directives from '@/directives/index'
import App from './App'
import router from "@/router/router";
import store from '@/store/index'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component);
})

directives.forEach(directive => {
    app.directive(directive.name, directive);
})

app
    .use(store)
    .use(router)
    .mount('#app')
