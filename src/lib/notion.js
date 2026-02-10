import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN,
});

export async function fetchPosts() {
  const res = await notion.databases.query({
    database_id: import.meta.env.VITE_NOTION_DATABASE_ID,
    filter: {
      property: "Status",
      select: { equals: "Published" },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return res.results.map((p) => ({
    id: p.id,
    title: p.properties.Title.title[0]?.plain_text,
    excerpt: p.properties.Excerpt.rich_text[0]?.plain_text,
    date: p.properties.Date.date.start,
    read: p.properties.ReadTime.number,
    cover: p.cover?.external?.url || null,
  }));
}
