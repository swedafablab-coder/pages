import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import remarkLinkCard from "remark-link-card-plus";
import rehypeExternalLinks from "rehype-external-links";
import { visit } from "unist-util-visit";
import rehypeImgSize from "rehype-img-size";

const rehypeImageAttributes = () => {
  return (tree) => {
    let isFirstImage = true;
    visit(tree, "element", (node) => {
      if (node.tagName === "img") {
        node.properties = node.properties || {};
        if (isFirstImage) {
          node.properties.loading = "eager";
          node.properties.fetchpriority = "high";
          isFirstImage = false;
        } else {
          node.properties.loading = "lazy";
          node.properties.decoding = "async";
        }
      }
    });
  };
};

export default defineConfig({
  markdown: {
    remarkPlugins: [
      [
        remarkLinkCard,
        {
          cache: true,
          shortenUrl: true,
          thumbnailPosition: "right",
        },
      ],
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
        },
      ],
      [rehypeImgSize, { dir: "public" }],
      rehypeImageAttributes,
    ],
  },
  integrations: [
    sitemap(),
    expressiveCode({
      defaultProps: {
        wrap: true,
        preserveIndent: true,
      },
    }),
    mdx(),
  ],
  site: "https://blog.kby4.site",
  prefetch: {
    prefetchAll: true
  }
});
