以下是基于 **Capacitor.js**、**Ionic** 和 **Vue 3** 集成 **Framework7** 组件库的完整实现方案，包含三个页面（带图片和文字），支持跨平台构建：

---

### 步骤 1：创建 Vue 3 项目并安装依赖

```bash
# 创建 Vue 3 项目（选择默认配置）
npm create vue@latest my-app
cd my-app

# 安装 Framework7 核心库和 Vue 适配器
npm install framework7 framework7-vue framework7-icons

# 安装 Capacitor（Ionic 原生运行时）
npm install @capacitor/core @capacitor/cli
npx cap init

# 安装 Android/iOS 平台支持（按需选择）
npm install @capacitor/android @capacitor/ios
```

---

### 步骤 2：配置 Framework7 和 Vue Router

#### 修改 `src/main.js`：

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import { f7, f7ready } from "framework7-vue";
import { createRouter, createWebHistory } from "vue-router";

// 导入页面组件
import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import GalleryPage from "./pages/GalleryPage.vue";

// Framework7 核心配置
const framework7Config = {
  theme: "auto",
  routes: [], // 使用 Vue Router 则无需在此配置
};

// Vue Router 配置
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/about", component: AboutPage },
    { path: "/gallery", component: GalleryPage },
  ],
});

// 初始化应用
const app = createApp(App).use(router).use(f7, framework7Config);

f7ready(() => {
  app.mount("#app");
});
```

---

### 步骤 3：创建页面组件

#### 1. `src/pages/HomePage.vue`

```vue
<template>
  <f7-page>
    <f7-navbar title="首页" />
    <f7-block>
      <h1 class="text-primary">欢迎使用</h1>
      <img
        src="/images/home-bg.jpg"
        alt="Home"
        class="rounded-lg shadow-md mb-4"
      />
      <p class="text-gray-600">
        这是一个基于 Vue 3 + Framework7 的跨平台应用。
      </p>
      <f7-link href="/about" class="mt-4">关于我们 →</f7-link>
    </f7-block>
  </f7-page>
</template>

<style scoped>
.text-primary {
  color: var(--f7-theme-color);
}
.rounded-lg {
  border-radius: 0.5rem;
}
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
```

#### 2. `src/pages/AboutPage.vue`

```vue
<template>
  <f7-page>
    <f7-navbar title="关于" back-link="返回" />
    <f7-block>
      <h2 class="text-xl font-bold">关于项目</h2>
      <img
        src="/images/about.png"
        alt="About"
        class="w-full h-48 object-cover my-4"
      />
      <p class="leading-relaxed">
        本应用使用以下技术栈构建： Vue 3 + Framework7 + Capacitor.js，
        支持编译为 Android/iOS/Web 应用。
      </p>
      <f7-link href="/gallery" class="mt-4">查看图库 →</f7-link>
    </f7-block>
  </f7-page>
</template>
```

#### 3. `src/pages/GalleryPage.vue`

```vue
<template>
  <f7-page>
    <f7-navbar title="图库" back-link="返回" />
    <f7-block>
      <div class="grid grid-cols-2 gap-4">
        <img
          v-for="i in 4"
          :key="i"
          :src="`/images/photo-${i}.jpg`"
          class="w-full h-32 object-cover rounded"
        />
      </div>
      <p class="mt-4 text-center text-gray-500">共 4 张示例图片</p>
    </f7-block>
  </f7-page>
</template>
```

---

### 步骤 4：配置主组件 `App.vue`

```vue
<template>
  <f7-app :theme="'auto'">
    <f7-view main url="/" :router="router" />
  </f7-app>
</template>

<script setup>
import { f7 } from "framework7-vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
```

---

### 步骤 5：添加图片资源

在项目根目录创建：

```
public/
  images/
    home-bg.jpg
    about.png
    photo-1.jpg
    photo-2.jpg
    photo-3.jpg
    photo-4.jpg
```

---

### 步骤 6：Capacitor 配置

修改 `capacitor.config.ts`：

```typescript
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.myapp",
  appName: "My F7 App",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
    },
  },
};

export default config;
```

---

### 步骤 7：运行与构建

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 同步到原生平台
npx cap sync android
npx cap sync ios

# 打开 IDE
npx cap open android
npx cap open ios
```

---

### 关键优化点

1. **图片处理**：

   - 使用 `public/images` 目录存放静态资源
   - 通过绝对路径 `/images/xxx.jpg` 直接引用
   - 添加响应式图片样式 (`object-cover`, `rounded`)

2. **样式集成**：

   - 使用 Framework7 内置 CSS 变量（如 `--f7-theme-color`）
   - 添加 Tailwind-like 工具类（可选安装 Tailwind）

3. **路由优化**：

   - 使用 Vue Router 管理导航
   - 通过 `<f7-link>` 实现平滑过渡动画

4. **原生功能扩展**：
   ```bash
   # 添加相机插件示例
   npm install @capacitor/camera
   npx cap sync
   ```

---

### 最终效果

- 三个完整页面：首页 / 关于 / 图库
- 支持原生返回按钮行为
- 响应式图片布局
- 平滑的页面切换动画
- 可编译为 Android/iOS/Web 应用

遇到具体问题时，可检查：

1. Capacitor 配置是否指向正确的 `dist` 目录
2. 图片路径是否正确（生产构建后需 `npx cap sync`）
3. Framework7 和 Vue 3 的版本兼容性
