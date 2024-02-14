import { requestApi } from "../services/requestService.js";
import { url_DTO } from "../DTO/url_DTO.js";

const forCatchError = async(data) => {
    if(data.status) {
        if(data.status === 400) {
            alert((await data.json()).message);
            return console.error(`${data.status} ${data.statusText}`);
        } 
        alert('Что-то пошло не так, попробуйте позже');
        return console.error(`${data.status} ${data.statusText}`);
    }

    alert('Что-то пошло не так, проверьте соединение с интернетом');
};
export const apiGetAllCats = async () => {
    try {
        return await(await requestApi(url_DTO('show'))).json();
    } catch (error) {
        forCatchError(error);
    }
};

export const apiDeleteCat = async (id) => {
    try {
        return await requestApi(url_DTO('delete', id), 'DELETE');
    } catch (error) {
        forCatchError(error);
    }    
};

export const apiReadMoreCat = async (id) => {
    try {
        return await requestApi(url_DTO('show', id));
    } catch (error) {
        forCatchError(error);
    }
};

export const apiEditCat = async (id, data) => {
    try {
        return await requestApi(url_DTO('update', id), 'PUT', data);
    } catch (error) {
        forCatchError(error);
    }    
};

export const apiAddCat = async (data) => {
    try {
        return await requestApi(url_DTO('add'), 'POST', data)
    } catch (error) {
        forCatchError(error)
    }
};



