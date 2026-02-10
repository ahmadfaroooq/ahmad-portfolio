const HASHNODE_API = "https://api.hashnode.com";

export async function fetchPosts() {
  const res = await fetch(HASHNODE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetPosts {
          publication(host: "${import.meta.env.VITE_HASHNODE_HOST}") {
            posts(first: 10) {
              nodes {
                id
                title
                brief
                slug
                publishedAt
                coverImage {
                  url
                }
              }
            }
          }
        }
      `,
    }),
  });

  const json = await res.json();

  console.log("HASHNODE RESPONSE:", json);

  return json?.data?.publication?.posts?.nodes || [];
}
