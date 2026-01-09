import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
} from "microcms-js-sdk";

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  category: {
    id: string;
    name: string;
  } & MicroCMSDate;
  tag: string[];
} & MicroCMSDate;

export type Article = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  category: {
    id: string;
    name: string;
  } & MicroCMSDate;
  tag: string[];
} & MicroCMSDate;


if (!import.meta.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!import.meta.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export const getBlogs = async (queries?: MicroCMSQueries) => {
  return await client.getList<Blog>({
    endpoint: "blogs",
    ...queries,
  });
};

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.get<Blog>({
    endpoint: "blogs",
    contentId,
    ...queries,
  });
};
