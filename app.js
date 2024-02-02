import { render } from "./helpers/render.js";
import { getAllCats } from "./controllers/api.js";
import { $wrapper } from "./helpers/render.js";
import { deleteCat } from "./controllers/api.js"; 

const deleteCatForListener = async (event) => {
    const action = event.target.dataset.action;

    if(action==='delete') {
        const $cardCat = event.target.closest('[data-card_cat_id]');
        const catId = $cardCat.dataset.card_cat_id;
        const res = await deleteCat(catId);
        if (!res || res.status !==200) {
            return
        }        
        $cardCat.remove()
    }
    
} 

render(await getAllCats());



$wrapper.addEventListener('click', deleteCatForListener)