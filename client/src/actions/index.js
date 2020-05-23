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

export const setWarzoneId = (id) => ({
  type: "SET_WZ_ID",
  id,
});
