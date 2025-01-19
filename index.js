

const tabella = document.getElementById("tabella");
const formElement = document.getElementById("form");
const formLogin = document.getElementById("formlogin");
const bottone_formlogin = document.getElementById("Login");
const bottone_admin = document.getElementById("buttonadmin");
const paginaPosto = document.getElementById("pagina_posto");
document.body.focus();
bottone_admin.classList.add("d-none");

import {tableComponent} from './componenti/table.js';
import {createForm} from './componenti/form.js';
import {createFormLogin} from './componenti/form_login.js';
import { createLogin } from './componenti/login.js';
import {generateFetchComponent} from './componenti/fetch_component.js';
import {createMap} from './componenti/mappa.js';
import {ricerca} from './componenti/barra_ricerca.js';
import {createNavigator} from "./componenti/navigator.js";
import {createDetail} from "./componenti/detail.js"

let dati_fetch;

let dt = [{
    "name": {
        "id": "75bb12f2-c38e-49dd-a45e-84f4148da42e",
        "Posizione": "Fort Sumter",
        "Titolo": "Fort Sumter (Carolina del Sud)",
        "Datainizio": "1861-04-12",
        "Datafine": "1861-04-13",
        "Paragrafo_1": "Il primo scontro della guerra civile americana avvenne il 12 aprile 1861, segnando l'inizio del conflitto che durò per ben 4 anni.  In quella famosa giornata, la guarnigione dell'Unione, guidata con determinazione dal maggiore Robert Anderson, resistette a un intenso e prolungato bombardamento da parte delle forze confederate, sotto il comando del generale P.G.T. Beauregard. Dopo ore di battaglia. Cadde Fort Sumter, diventando un evento simbolico, questo evento aumentò drasticamente la tensione, spingendo il paese inesorabilmente verso una guerra totale che avrebbe segnato un'epoca.",
        "Paragrafo_2": "conseguenze",
        "Paragrafo_3": "riflessione",
        "feriti": "2313",
        "morti": "321",
        "Immagine_1": "321",
        "Immagine_2": "321"
    },
    "coords": [
        "32.7522877",
        "-79.87462531951533"
    ]
}]

fetch("conf.json").then(r => r.json()).then(conf => {
    const fetch = generateFetchComponent();
    const Map=createMap()
    const table1 = tableComponent();
    const detailComp = createDetail(paginaPosto);
    const navigator = createNavigator(document.querySelector("#container"),detailComp);
    const form_login=createFormLogin(formLogin)
    const Login = createLogin()
    const form = createForm(formElement);
    fetch.caricaDati(conf)
    fetch.getData().then(p => {
        console.log(p)
        dati_fetch=p
        table1.setParentElement(tabella);
        table1.setData(p);
        table1.render();
        detailComp.setData(p);
        //detailComp.render();
        Map.setData(p)
        Map.render(detailComp)
    });
    form.render(table1, Map, conf,fetch);
    form_login.render(Login,bottone_admin)
    //BARRA DI RICERCA
    //let filtro = document.querySelectorAll("filtro");
    //filtro.addEventListener('input', function() {
        //let dati = table1.exportData()
        //let new_data=ricerca(filtro.value,dati);
        //table1.reset_inizio()
        //table1.dati_filtro(new_data)
        //table1.render()
    //});
});
window.addEventListener("load", function () {
    let risposta = sessionStorage.getItem("login");
    console.log(risposta)
    if (risposta==="true"){
        bottone_admin.classList.remove("d-none")
    }
});