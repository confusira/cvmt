import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import api from './api'

const app = createApp(App)
app.config.globalProperties.$api = api

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
app.use(ElementPlus)

// 国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
app.use(ElementPlus, {
    locale: zhCn,
});
// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// pinia
const pinia = createPinia();
// 持久化存储
import { createPersistedState } from 'pinia-plugin-persistedstate';
pinia.use(
    createPersistedState({
        auto: true, // 启用所有 Store 默认持久化
    }),
);
// 重写 $reset 方法 => 解决组合式api中无法使用问题
pinia.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state));
    store.$reset = () => {
        store.$patch(initialState);
    };
});
app.use(pinia);
// store
import store from '@/store';
app.config.globalProperties.$store = store;

app.use(router)

app.mount('#app')
