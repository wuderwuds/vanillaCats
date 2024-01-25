import {SETTINGS} from "../helpers/settings.js";

export const url_DTO = (hand, id = null) => {
    if (id) {
        return `${SETTINGS.url}/${SETTINGS.userName}/${hand}/${id}`
    } else {
        return `${SETTINGS.url}/${SETTINGS.userName}/${hand}`
    }

}