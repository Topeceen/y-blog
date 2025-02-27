import { defineConfigWithTheme } from "vitepress";
import escookConfig from "@escook/vitepress-theme/config";

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
  extends: escookConfig,
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    musicBall: {
      src: "https://img3.tukuppt.com/newpreview_music/09/01/62/5c89fd22dea6948307.mp3",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
