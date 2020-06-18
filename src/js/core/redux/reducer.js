import { FAVORITESARR } from "./constants";
import { storage } from "../storage/localStorage";

export function reducer(state, action) {

  switch (action.type) {

    case '__INIT__': {

      return {
        ...state
      }
    }

    case FAVORITESARR:

    return {
      data: action.data
    }
  }
}