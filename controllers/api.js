import {requestApi} from "../services/requestService.js";
import {url_DTO} from "../DTO/url_DTO.js";

export const getAllCats = async () => {
    return requestApi(url_DTO('show'), "GET");
}

export const newCat = async (data) => {
    return await requestApi(url_DTO('add'), "POST");
}

export const deleteCat = async (id) => {
    return await requestApi(url_DTO('delete', id), "DELETE");
}