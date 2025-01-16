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
import { createNavigator } from "./navigator.js";


fetch("conf.json").then(r => r.json()).then(conf => {
    const navigator = createNavigator(document.querySelector("#container"));
    const form = createForm(formElement);
    const form_login = createFormLogin(formLogin);
    const table1 = tableComponent();
    const compFetch = generateFetchComponent();
    const Map = createMap();
    const Login = createLogin();

    compFetch.caricaDati(conf)
    compFetch.getData().then(data => {
        table1.setData(data); // Imposta i dati nel componente tabella
        table1.setParentElement(tabella);
        table1.render(starDay);// Renderizza la tabella con i dati recuperati
        Map.setData(data)
        Map.render();
    });
    precendente.onclick = () => {
        table1.indietro()
        table1.render();
    }

    successiva.onclick = () => {
        table1.avanti()
        table1.render();
    }
    form.render(table1, Map, conf,compFetch);
    form_login.render(Login,bottone_admin)
    //BARRA DI RICERCA
    let filtro = document.getElementById("filtro");
    filtro.addEventListener('input', function() {
        let dati = table1.exportData()
        let new_data=ricerca(filtro.value,dati);
        table1.reset_inizio()
        table1.dati_filtro(new_data)
        table1.render()
    });
    
});
window.addEventListener("load", function () {
    let risposta = sessionStorage.getItem("login");
    let Login = createLogin()
    console.log(risposta)
    if (risposta==="true"){
        Login.render(bottone_admin)
    }
});
