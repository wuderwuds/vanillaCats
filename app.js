import { render } from "./helpers/render.js";
import { apiGetAllCats } from "./controllers/api.js";
import { SETTING } from "./helpers/setting.js";
import { $btnLogIn } from "./helpers/domElem.js";
import { $btnLogOut } from "./helpers/domElem.js";
import { $btnAddcat } from "./helpers/domElem.js";
import { $search } from "./helpers/domElem.js";

if(localStorage.getItem('userName')) {
    SETTING.userName = localStorage.getItem('userName');
    $btnLogOut.classList.remove('log-out');
    $btnAddcat.classList.remove('btn-add-cat-hidden');
    $search.classList.remove('search-hidden');
} else {
    $btnAddcat.classList.add('btn-add-cat-hidden');
    $btnLogIn.classList.remove('log-in');
}


if(SETTING.userName) {
    render(await apiGetAllCats());
}





