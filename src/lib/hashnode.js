export const HASHNODE_API = "https://gql.hashnode.com";

export async function fetchPosts() {
  const res = await fetch(HASHNODE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: import.meta.env.VITE_HASHNODE_API_KEY,
    },
    body: JSON.stringify({
      query: `
        query {
          publication(host: "${import.meta.env.VITE_HASHNODE_HOST}") {
            posts(first: 10) {
              edges {
                node {
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
        }
      `,
    }),
  });

  return res.json();
}
