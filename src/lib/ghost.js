import GhostContentAPI from "@tryghost/content-api";

const ghost = new GhostContentAPI({
  url: import.meta.env.VITE_GHOST_API_URL,
  key: import.meta.env.VITE_GHOST_CONTENT_KEY,
  version: "v5.0"
});

export default ghost;
