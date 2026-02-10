const NOTION_API = "https://api.notion.com/v1";

export async function fetchPosts() {
  const res = await fetch(
    `${NOTION_API}/databases/${import.meta.env.VITE_NOTION_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Published",
          checkbox: { equals: true },
        },
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}
