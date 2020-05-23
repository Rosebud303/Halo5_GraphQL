export const currentSearchedPlayer = (player) => ({
  type: "SET_CURRENT_PLAYER",
  player,
});

export const setImgUrlSpartan = (url) => ({
  type: "SET_URL_SPARTAN",
  url,
});

export const setImgUrlEmblem = (url) => ({
  type: "SET_URL_EMBLEM",
  url,
});
