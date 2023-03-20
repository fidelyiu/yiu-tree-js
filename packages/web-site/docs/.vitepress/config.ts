import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/yiu-tree-js/",
  title: "YiuTree",
  description: "A js library for manipulating trees.",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    siteTitle: "YiuTree",
    outline: "deep",
    outlineTitle: "本文内容",
    socialLinks: [
      { icon: "github", link: "https://github.com/fidelyiu/yiu-tree-js" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Fidel Yiu",
    },
    nav: [
      { text: "指引", link: "/guide/index.md" },
      { text: "工具", link: "/tool/get/get-filter-by-search/index.md" },
      { text: "类型", link: "/type/TreeFunc/index.md" },
      { text: "实践&建议", link: "/practice/index.md" },
    ],
    sidebar: {
      "/tool/": [
        {
          text: "Get",
          items: [
            {
              text: "get-filter-by-search",
              link: "/tool/get/get-filter-by-search/index.md",
            },
            {
              text: "get-flat-list-by-tree",
              link: "/tool/get/get-flat-list-by-tree/index.md",
            },
            {
              text: "get-leaf-node-by-list",
              link: "/tool/get/get-leaf-node-by-list/index.md",
            },
            { text: "get-max-level", link: "/tool/get/get-max-level/index.md" },
            {
              text: "get-one-node-by-search",
              link: "/tool/get/get-one-node-by-search/index.md",
            },
            {
              text: "get-one-node-path-by-search",
              link: "/tool/get/get-one-node-path-by-search/index.md",
            },
            {
              text: "get-shake-by-search",
              link: "/tool/get/get-shake-by-search/index.md",
            },
            {
              text: "get-tree-by-list",
              link: "/tool/get/get-tree-by-list/index.md",
            },
            {
              text: "get-tree-by-list-simple",
              link: "/tool/get/get-tree-by-list-simple/index.md",
            },
          ],
        },
        {
          text: "Has",
          items: [
            { text: "has-by-search", link: "/tool/has/has-by-search/index.md" },
          ],
        },
        {
          text: "Op",
          items: [
            { text: "op-all", link: "/tool/op/op-all/index.md" },
            { text: "op-by-search", link: "/tool/op/op-by-search/index.md" },
          ],
        },
      ],
      "/type/": [
        { text: "Func", link: "/type/TreeFunc/index.md" },
        { text: "NodeInfo", link: "/type/TreeNodeInfo/index.md" },
        { text: "Opt", link: "/type/TreeOpt/index.md" },
      ],
    },
  },
});
