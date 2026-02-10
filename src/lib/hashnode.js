const HASHNODE_API = "https://gql.hashnode.com";

export async function fetchPosts() {
  const res = await fetch(HASHNODE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.VITE_HASHNODE_API_KEY
        ? `Bearer ${process.env.VITE_HASHNODE_API_KEY}`
        : "",
    },
    body: JSON.stringify({
      query: `
        query Publication {
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
                  content {
                    html
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  const json = await res.json();
  return json.data.publication.posts.edges.map(e => e.node);
}
