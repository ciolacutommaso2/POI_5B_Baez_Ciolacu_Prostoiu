const tabella = document.getElementById("tabella");
const formElement = document.getElementById("form");
const formLogin = document.getElementById("formlogin");
const bottone_admin = document.getElementById("buttonadmin")
document.body.focus();
bottone_admin.classList.add("d-none");
let starDay = 0;

import {tableComponent} from './componenti/table.js';
import {createForm} from './componenti/form.js';
import {createFormLogin} from './componenti/form_login.js';
import { createLogin } from './componenti/login.js';
import {generateFetchComponent} from './componenti/fetch_component.js';
import {createMap} from './componenti/mappa.js';
import {ricerca} from './componenti/barra_ricerca.js';
import {createNavigator} from "./componenti/navigator.js";


fetch("conf.json").then(r => r.json()).then(conf => {
    const navigator = createNavigator(document.querySelector("#container"));
});
window.addEventListener("load", function () {
    let risposta = sessionStorage.getItem("login");
    let Login = createLogin()
    console.log(risposta)
    if (risposta==="true"){
        Login.render(bottone_admin)
    }
});
