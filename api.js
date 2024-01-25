const userName = 'wuderwuds';
const url = 'https://cats.petiteweb.dev/api/single';


class Api {
    constructor(userName, url){
        this.userName = userName,
        this.url = url
        
    }

    getRes(res) {
        return res.ok ? res: Promise.reject(res)
    }

    async getAllCats() {       
        return this.getRes(await fetch(`${this.url}/${this.userName}/show`))
    }

    async newCat(data) {
        return this.getRes(await fetch(`${this.url}/${this.userName}/add`, {
            method: 'POST', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)  
        }))
    }

    async deleteCat(id) {
        return this.getRes(await fetch(`${this.url}/${this.userName}/delete/${id}`, {
            method: 'DELETE'
        }))
    }

}


async function delet() {
    try {
        const res = await api.deleteCat(7988)
        console.log(res);
        const response = await res.json()
        console.log(response);
        showCats()        
    } catch (res) {
        const response = await res.json()
        console.log(response);
        console.log(res);
    }

}




const api = new Api(userName, url);








showCats()

async function showCats() {
    try {
        const res = await api.getAllCats();
        //обрботать res.status
        const responce = await res.json();
        console.log(responce);        
}   catch (error) {
        console.error(error.status + ' ' + error.statusText);
    }
}    

const $button = document.querySelector('[data-nsr]');
$button.addEventListener('click', addCat)
async function addCat() {
    try {
        await api.newCat({
            "id": Date.now(),
            "name": "Имя кот59696gjffjfjf9ика",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOQUQ4vJLyAM14QgiCFjEon1BCRoJ_RTqXYA&usqp=CAU",
            "age": 0,
            "rate": 0,
            "favorite": false,
            "description": ""
          })
          showCats()         
    } catch (res) {
        if (res.status === 400) {
            const responce = await res.json();
            console.log(responce);
        }
        console.error(res.status + ' ' + res.statusText);
    }
}

