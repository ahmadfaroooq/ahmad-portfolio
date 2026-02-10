import GhostContentAPI from "@tryghost/content-api";

const ghost = new GhostContentAPI({
  url: "https://ahmad-farooq.ghost.io",
  key: "145bdada9a070654a86808da2e",
  version: "v5.0",
});

export { ghost };
