export const currentPlayerReducer = (state = spartanName, action) => {
  switch (action.type) {
    case "SET_CURRENT_PLAYER":
      localStorage.setItem("spartanName", action.player);
      return action.player;
    default:
      return state;
  }
};

export const currentUrlSpartanReducer = (state = spartanAppearance, action) => {
  switch (action.type) {
    case "SET_URL_SPARTAN":
      localStorage.setItem("spartanAppearance", action.url);
      return action.url;
    default:
      return state;
  }
};

export const currentUrlEmblemReducer = (state = spartanEmblem, action) => {
  switch (action.type) {
    case "SET_URL_EMBLEM":
      localStorage.setItem("spartanEmblem", action.url);
      return action.url;
    default:
      return state;
  }
};

const spartanName = localStorage.getItem("spartanName");
const spartanEmblem = localStorage.getItem("spartanEmblem");
const spartanAppearance = localStorage.getItem("spartanAppearance");
