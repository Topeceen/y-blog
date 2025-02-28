import { defineConfigWithTheme } from "vitepress";
import escookConfig from "@escook/vitepress-theme/config";

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
  // base: "/y-blog/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "logo/Yzs-logo.png",
      },
    ],
  ],
  extends: escookConfig,
  title: "小叶的前端笔记",
  description: "A VitePress Site",
  themeConfig: {
    logo: "/logo/Yzs-logo.png",
    musicBall: {
      src: "/bgm/bgm.mp3", // 音乐文件路径MP3",
      autoplay: true,
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "个人简历", link: "/resume" },
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
      {
        text: "项目经历",
        items: [
          {
            text: "通用型后台管理系统",
            link: "/projects/后台管理/基础配置",
          },
          {
            text: "陆渔生物科技企业级内部数据管理系统",
            link: "/projects/陆渔生物科技",
          },
        ],
      },
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
      "/projects/后台管理/": [
        {
          text: "通用型后台管理系统",
          items: [
            {
              text: "基础配置",
              link: "/projects/后台管理/基础配置",
            },
          ],
        },
        {
          text: "陆渔生物科技企业级内部数据管理系统",
          items: [{ text: "用户管理", link: "/projects/后台管理/用户管理" }],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Topeceen/y-blog" },
    ],
  },
  vite: {
    ssr: {
      noExternal: ["@escook/vitepress-theme", "vitepress"],
    },
  },
});
