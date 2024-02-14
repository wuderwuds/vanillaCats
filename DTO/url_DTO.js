import { SETTING } from "../helpers/setting.js"
export const url_DTO = (hand, id=null) => {
    if(id) {
        return `${SETTING.url}/${SETTING.userName}/${hand}/${id}`
    } else {
        return `${SETTING.url}/${SETTING.userName}/${hand}`
    }
}