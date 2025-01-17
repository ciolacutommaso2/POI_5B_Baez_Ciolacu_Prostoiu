const tabella = document.getElementById("tabella");
const formElement = document.getElementById("form");
const formLogin = document.getElementById("formlogin");
const bottone_formlogin = document.getElementById("Login");
const bottone_admin = document.getElementById("buttonadmin");
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

const form_login=createFormLogin(formLogin)
const Login = createLogin()
form_login.render(Login,bottone_admin)
const Map=createMap()
Map.render()


//BARRA DI RICERCA
let filtro = document.getElementById("filtro");
filtro.addEventListener('input', function() {
    let dati = table1.exportData()
    let new_data=ricerca(filtro.value,dati);
    table1.reset_inizio()
    table1.dati_filtro(new_data)
    table1.render()
});
fetch("conf.json").then(r => r.json()).then(conf => {
    const navigator = createNavigator(document.querySelector("#container"));
    const form = createForm(formElement);
});
window.addEventListener("load", function () {
    let risposta = sessionStorage.getItem("login");
    console.log(risposta)
    if (risposta==="true"){
        bottone_admin.classList.remove("d-none")
    }
});
