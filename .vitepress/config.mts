import { defineConfigWithTheme } from "vitepress";
import escookConfig from "@escook/vitepress-theme/config";

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
  base: "/y-blog/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/y-blog/favicon.svg",
      },
    ],
  ],
  extends: escookConfig,
  title: "小叶的前端笔记",
  description: "A VitePress Site",
  themeConfig: {
    logo: "/logo/Yzs-logo.png",
    musicBall: {
      src: "/y-blog//bgm/bgm.mp3", // 音乐文件路径MP3",
      autoplay: true,
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "个人简历", link: "/markdown-examples" },
      {
        text: "面试题",
        items: [
          {
            text: "HTML-CSS",
            link: "/InterviewQuestion/HTML-CSS",
          },
          {
            text: "JavaScript",
            link: "/InterviewQuestion/JS",
          },
        ],
        activeMatch: "^/InterviewQuestion/",
      },
      { text: "前端知识", link: "/api-examples" },
    ],
    sidebar: {
      "/InterviewQuestion/": [
        {
          text: "面试题",
          items: [
            { text: "HTML-CSS", link: "/InterviewQuestion/HTML-CSS" },
            { text: "JavaScript", link: "/InterviewQuestion/JS" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  vite: {
    ssr: {
      noExternal: ["@escook/vitepress-theme", "vitepress"],
    },
  },
});
