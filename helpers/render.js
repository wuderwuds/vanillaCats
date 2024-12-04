import { $wrapper } from "./domElem.js"
import { $modalCardCat } from "./domElem.js"
export const generateAllCardsCats = (data) => {

return `<div class="card-cat" data-card_cat_id='${data.id}'>
            <div class="card-cat-content">
                <img class='card-cat-image' src="${data.image}"alt="image ">
                <div class='container-card-cat-name_btn'>
                    <p class='pe'>${data.name}</p>
                    <div class='container_card_btn'>
                        <button type="button" class="btn btn-info btn-sm" data-action='read more'>READ MORE</button>
                        <button type="button" class="btn btn-danger btn-sm" data-action='delete'>DELETE</button>
                    </div>
                </div>
            </div>
        </div>`
}
const generateCardCat = (data) => {

    return `<div class="modal-card-catt" data-modal_card_cat_id='${data.id}'>
                <div class="modal-cat-content">
                    <img class='modal-card-cat-image' src="${data.image}"alt="">
                    <div class='modal-container-card-cat-name_btn'><div class='modal-card-cat-info'>
                    <p><b>Name:</b> ${data.name}</p>
                    <p><b>Age:</b> ${data.age}</p>
                    <p><b>Rate:</b> ${data.rate}</p>
                    <p><b>Favorite:</b> ${data.favorite}</p>
                    <p><b>Description:</b> ${data.description}</p></div>
                       
                        <div class='modal-container-card-btn'>
                            <button type="button" class="btn btn-info btn-sm" data-action='edit'>EDIT</button>
                            <button type="button" class="btn btn-danger btn-sm" data-action='close'>CLOSE</button>
                        </div>
                    </div>
                </div>
            </div>`
    }

export const render = (data, to = null) => {
    const messageDataNull = (to) => {
        const messageCatListZero = document.createElement('p');
        const dataCatsNull = 'Список котов пуст, добавьте котов';
        const dataSearchNull = 'Поиск не дал результатов, такого кота не существует.';
        if(to === 'search') {
            messageCatListZero.innerText = dataSearchNull; 
            return $wrapper.append(messageCatListZero)
        } else {
            messageCatListZero.innerText = dataCatsNull; 
            return $wrapper.append(messageCatListZero)
        }
    };

    if(!data) {
        return
    }

    if(data.length===0) {
        return messageDataNull(to)        
    }
    
    data.forEach(cat=> {
        document.body.style.backgroundColor = 'rgb(255,197,0, 0.3)'
        $wrapper.insertAdjacentHTML('afterbegin', generateAllCardsCats(cat))
    })
}

export const renderCardCat = (data) => {
    if(!data) {
        return
    }
        $modalCardCat.innerHTML = generateCardCat(data)    
}

    