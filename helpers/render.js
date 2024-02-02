export const $wrapper = document.querySelector('[data-wrapper]')

const generateCardCat = (data) => {

return `<div class="card-cat" data-card_cat_id='${data.id}'>
            <div class="card-cat-content">
                <img class='card-cat-image' src="${data.image}"alt="">
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

export const render = (data) => {
    if(!data) {
        return
    }
    if(data.length===0) {
        const messageCatListZero = document.createElement('p');
        messageCatListZero.innerText = 'Список котов пуст, добавьте котов';
        $wrapper.append(messageCatListZero)
        
    }
    data.forEach(cat=> {
        document.body.style.backgroundColor = 'rgb(255,197,0, 0.3)'
        $wrapper.insertAdjacentHTML('afterbegin', generateCardCat(cat))
    })
}

    