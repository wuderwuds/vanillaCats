import { SETTING } from "./setting.js";
import { $autorization } from "./domElem.js";
import { $btnCloseAutorization } from "./domElem.js";
import { $btnLogIn } from "./domElem.js";
import { $btnLogOut } from "./domElem.js";
import { debounce } from "./listener.js";
import { apiGetAllCats } from "../controllers/api.js";
import { render } from "./render.js";
import { $btnAddcat } from "./domElem.js";
import { $btnRegistration } from "./domElem.js";
import { $registration } from "./domElem.js";
import { $btnCloseRegistration } from "./domElem.js";
import { $search } from "./domElem.js";

let dbLS;
const LOCAL = JSON.parse(localStorage.getItem('DB_USERS'))
if(LOCAL) 
{dbLS = LOCAL
} else dbLS = {users: []}


const deleteMessage = (message) => {
    message.remove();
};
const debounceDeleteMessage = debounce(deleteMessage, 1000)

const errorMessage = (el, error) => {
const message = document.createElement('p');
if (error === 'autorization') {
    message.innerText = 'Неправильное имя пользователя или пароль';
}
if (error === 'registration') {
    message.innerText = 'Введите имя пользователяи и пароль';
}
if (error === 'registration_two') {
    message.innerText = 'Пользователь с таким именем уже существует'
}
message.style.color = 'red';
el.firstElementChild.lastElementChild.before(message);
debounceDeleteMessage(message);
}
const debounceErrorMessage = debounce(errorMessage,400)

const autorizationForListener = async(event)=>{
    event.preventDefault();    
    const formData = Object.fromEntries(new FormData(document.forms.autorization).entries());
    const check = dbLS.users.some(e=> e.userName === formData.userName && e.userPass === formData.userPass);
    if(!check) {
        debounceErrorMessage($autorization, 'autorization')
        } else {
        SETTING.userName = formData.userName;        
        const res = await apiGetAllCats();
        if(!res) {
            return;
        } else {
            localStorage.setItem('userName', formData.userName);
            $btnAddcat.classList.remove('btn-add-cat-hidden');
            $search.classList.remove('search-hidden');
            render(await apiGetAllCats());
            $autorization.classList.add('form-autorization-hidden');
            $btnLogIn.classList.add('log-in');
            $btnLogOut.classList.remove('log-out');
            document.forms.autorization.reset();
        }
    }
};

const registrationForListener = async(event)=> {
    event.preventDefault()
    const objDataValueInput =  Object.fromEntries(new FormData(document.forms.registration).entries());
    const check = dbLS.users.some(e => e.userName === objDataValueInput.userName);
    if (!objDataValueInput.userName || !objDataValueInput.userPass) {
        debounceErrorMessage($registration, 'registration');                  
        return;  
    }
    SETTING.userName = objDataValueInput.userName;
    const res = await apiGetAllCats()
    if (res.length) {
        debounceErrorMessage($registration, 'registration_two');   
    } else {
        if(check) {
            debounceErrorMessage($registration, 'registration_two');  
        } else {
            SETTING.userName = objDataValueInput.userName;
            const res = await apiGetAllCats();
            if(!res) {
                return;
            } else {
                localStorage.setItem('userName', objDataValueInput.userName);
                dbLS.users.push(objDataValueInput);
                localStorage.setItem('DB_USERS', JSON.stringify(dbLS)) ;
                $wrapper.replaceChildren();
                $btnAddcat.classList.remove('btn-add-cat-hidden');
                $search.classList.remove('search-hidden');
                render(await apiGetAllCats());
                $btnLogIn.classList.add('log-in');
                $btnLogOut.classList.remove('log-out');
                $registration.classList.add('form-registration-hidden');
            }
        }
    }
}

$autorization.addEventListener('submit', autorizationForListener);

$registration.addEventListener('submit', registrationForListener);

$btnLogIn.addEventListener('click', ()=>{   
    $autorization.classList.remove('form-autorization-hidden')
});

$btnLogOut.addEventListener('click', ()=>{
    localStorage.removeItem('userName');
    localStorage.removeItem('form-add-cat')
    location.reload();
});

$btnCloseAutorization.addEventListener('click', ()=>{   
    $autorization.classList.add('form-autorization-hidden');
    document.forms.autorization.reset();
});

$btnRegistration.addEventListener('click', ()=> {
    document.forms.registration.reset()
    $autorization.classList.add('form-autorization-hidden');
    $registration.classList.remove('form-registration-hidden');
});

$btnCloseRegistration.addEventListener('click', ()=> {
    $registration.classList.add('form-registration-hidden');
});


