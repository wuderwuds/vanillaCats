import { render } from "./helpers/render.js";
import { apiGetAllCats } from "./controllers/api.js";
import { $wrapper } from "./helpers/render.js";
import { apiDeleteCat } from "./controllers/api.js"; 
import { apiReadMoreCat } from "./controllers/api.js";
import { renderCardCat } from "./helpers/render.js";
import { $modalCardCat } from "./helpers/render.js";
import { apiEditCat } from "./controllers/api.js";
import { apiAddCat } from "./controllers/api.js";

const $formEditCat = document.querySelector('[data-form_edit_cat]');
const $formAddCat = document.querySelector('[data-form_add_cat]');
const $formEdit = document.querySelector('[data-form]');
const $formAdd = document.querySelector('[data-form_add]');
const $btnCloseModalEditCat = document.querySelector('[data-btn_close_modal_edit_cat]');
const $btnCloseModalAddCat = document.querySelector('[data-btn_close_modal_add_cat]');
const $btnAddcat = document.querySelector('[data-add_cat_btn]');

const deleteAndReadMoreCatForListener = async (event) => {
    const action = event.target.dataset.action;
    if (action!=='delete' && action!=='read more') {
        return
    }
    const $cardCat = event.target.closest('[data-card_cat_id]');
    const catId =  $cardCat.dataset.card_cat_id;  
    let res;
    
    switch (action) {
        case 'delete':            
            res = await apiDeleteCat(catId);
            if (!res || res.status !== 200) {
                return
            } else {               
                $cardCat.remove()
            }
           break;
        
        case 'read more':          
            res = await apiReadMoreCat(catId)
            if (!res || res.status !== 200) {
                return 
            } else {
                const data = await res.json()
                renderCardCat(data)
                $modalCardCat.classList.remove('modal-card-cat-hidden')
            }
            break;
            
        
        default:
            break;
    }    
};
const editCatFormForListener = async(event) => {
    event.preventDefault()
    const catId = () => {
        const $modalCardCat = document.querySelector('[data-modal_card_cat_id]')
        return $modalCardCat.dataset.modal_card_cat_id;
    }
    const data = Object.fromEntries(new FormData(document.forms.cats_edit).entries());
    data.age = +data.age;
    data.rate = +data.rate;
    data.favorite = !!data.favorite;
    const res = await apiEditCat(catId(), data)
    if (!res || res.status !== 200) {
        return 
    } else {
        event.target.reset()
        $formEditCat.classList.add('form-edit-cat-hidden');
        $modalCardCat.replaceChildren();
        $wrapper.replaceChildren();
        render(await apiGetAllCats());        
    }
}
const modalCardCatForListener = async(event) => {
    const action = event.target.dataset.action;
    const modalClose = () => {
        $modalCardCat.classList.add('modal-card-cat-hidden')
        $modalCardCat.replaceChildren()
    }
    const catId = () => {
        const $cardCat = event.target.closest('[data-modal_card_cat_id]')       
        return $cardCat.dataset.modal_card_cat_id        
    }
    if (action!=='close' && action!=='edit' && action!=='modal') {
        return
    }
    switch (action) {
        case 'close':
            modalClose()
            break;
        
        case 'modal':
            modalClose()
            break;
        case 'edit':
            const res = await apiReadMoreCat(catId())
            if (!res || res.status !== 200) {
                return 
            } else {
                const response = await res.json()
                delete response.id
                Object.keys(response).forEach(key => {
                    document.forms.cats_edit[key].value = response[key]
                })
            }
            $modalCardCat.classList.add('modal-card-cat-hidden')
            $formEditCat.classList.remove('form-edit-cat-hidden')

        default:
            break;
    }
};
const closeFormEditCatForListener = () => {
    $formEditCat.classList.add('form-edit-cat-hidden');
    $formEdit.reset();
};
const closeFormAddCatForListener = () => {
    $formAddCat.classList.add('form-add-cat-hidden');
    $formAdd.reset()
};
const addDataFormAddCatLocalForListener = () =>{
    const formData = Object.fromEntries(new FormData(document.forms.cat_add).entries());
    formData.favorite = formData.favorite ? true : false;
    localStorage.setItem('form-add-cat', JSON.stringify(formData))
};
const openFormAddCatForListener = ()=> {
    $formAddCat.classList.remove('form-add-cat-hidden');
    const formCatAddLC = localStorage.getItem('form-add-cat');
    const parsenDataFormAddCat = JSON.parse(formCatAddLC);
    Object.keys(parsenDataFormAddCat).forEach(key => {
      document.forms.cat_add[key].value = parsenDataFormAddCat[key]
    })
};
const addCatForListener = async (event) => {
    event.preventDefault()
    let data = Object.fromEntries(new FormData(document.forms.cat_add).entries());
    data.age = +data.age;
    data.rate = +data.rate;
    data.favorite = data.favorite ? true : false;
    data = Object.assign(data, {id: Math.floor(Math.random()*1e9)})
    const res = await apiAddCat(data)
    if (!res || res.status !== 200) {
        return 
    } else {
        $formAddCat.classList.add('form-add-cat-hidden');
        $formAdd.reset()
        localStorage.removeItem('form-add-cat')
        $wrapper.replaceChildren()
        render(await apiGetAllCats())
    }
};

render(await apiGetAllCats());

$wrapper.addEventListener('click', deleteAndReadMoreCatForListener);

$modalCardCat.addEventListener('click', modalCardCatForListener);

$formEditCat.addEventListener('submit', editCatFormForListener);

$btnCloseModalEditCat.addEventListener('click', closeFormEditCatForListener);

$btnCloseModalAddCat.addEventListener('click', closeFormAddCatForListener);

$btnAddcat.addEventListener('click', openFormAddCatForListener);

document.forms.cat_add.addEventListener('submit', addCatForListener)

$formAddCat.addEventListener('input', addDataFormAddCatLocalForListener)


