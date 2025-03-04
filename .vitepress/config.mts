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
      list: [
        {
          name: "唯一 - G.E.M. 邓紫棋",
          src: "/bgm/bgm1.mp3", // 音乐文件路径MP3",
        },
        {
          name: "Where Did U Go - G.E.M. 邓紫棋",
          src: "/bgm/bgm2.mp3", // 音乐文件路径MP3",
        },
      ],
      autoplay: true,
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "个人简历", link: "/resume" },
      {
        text: "项目经历",
        items: [
          {
            text: "通用型后台管理系统",
            link: "/projects/后台管理/项目搭建、基础配置",
          },
          {
            text: "陆渔生物科技企业级内部数据管理系统",
            link: "/projects/陆渔生物科技",
          },
        ],
      },
      { text: "问题及处理", link: "/api-examples" },
      {
        text: "题库",
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
              text: "1、项目搭建、基础配置",
              link: "/projects/后台管理/项目搭建、基础配置",
            },
            {
              text: "2、组件引入、登录设置",
              link: "/projects/后台管理/组件引入、登录设置",
            },
            {
              text: "3、路由配置、页面搭建",
              link: "/projects/后台管理/路由配置、页面搭建",
            },
            {
              text: "4、动态路由、用户界面",
              link: "/projects/后台管理/动态路由、用户界面",
            },
            {
              text: "5、高阶组件、页面细节",
              link: "/projects/后台管理/高阶组件、页面细节",
            },
            {
              text: "6、按钮权限、Echart展示",
              link: "/projects/后台管理/按钮权限、Echart展示",
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
