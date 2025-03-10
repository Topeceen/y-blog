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
            text: "YZS高清壁纸项目（微信小程序）",
            link: "projects/YZS壁纸/项目搭建、样式布局",
          },
          {
            text: "陆渔生物科技企业级内部数据管理系统",
            link: "/projects/陆渔生物/陆渔生物",
          },
        ],
      },
      { text: "问题及处理", link: "/experience/基于TS的axios封装" },
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
          text: "题库",
          items: [
            { text: "HTML-CSS", link: "/InterviewQuestion/HTML-CSS" },
            { text: "JavaScript", link: "/InterviewQuestion/JS" },
          ],
        },
      ],
      "/projects/": [
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
          text: "YZS高清壁纸项目（微信小程序）",
          items: [
            {
              text: "1、项目搭建、样式布局",
              link: "projects/YZS壁纸/项目搭建、样式布局",
            },
            {
              text: "2、功能模块、项目实现",
              link: "projects/YZS壁纸/功能模块、项目实现",
            },
          ],
        },
        {
          text: "陆渔生物科技企业级内部数据管理系统",
          items: [{ text: "项目简述", link: "/projects/陆渔生物/陆渔生物" }],
        },
      ],
      "/experience/": [
        {
          text: "问题及处理",
          items: [
            {
              text: "1.基于TS的axios封装",
              link: "/experience/基于TS的axios封装",
            },
            {
              text: "2.自动化部署",
              link: "/experience/自动化部署",
            },
            {
              text: "3.接入支付功能的方法",
              link: "/experience/接入支付功能的方法",
            },
            {
              text: "4.WebSocket实时通信",
              link: "/experience/WebSocket实时通信",
            },
            {
              text: "5.利用Ionic集合Vue3和Framework7",
              link: "/experience/利用Ionic集合Vue3和Framework7",
            },
          ],
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
