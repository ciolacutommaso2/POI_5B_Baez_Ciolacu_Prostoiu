//import { v4 as uuidv4 } from 'uuid';
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js';


const tabella = document.getElementById("tabella");
const formElement = document.getElementById("form");
const formLogin = document.getElementById("formlogin");
const bottone_formlogin = document.getElementById("Login");
const bottone_admin = document.getElementById("buttonadmin");
const paginaPosto = document.getElementById("pagina_posto");
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
import {createDetail} from "./componenti/detail.js"
//BARRA DI RICERCA
//let filtro = document.querySelectorAll("filtro");
//filtro.addEventListener('input', function() {
    //let dati = table1.exportData()
    //let new_data=ricerca(filtro.value,dati);
    //table1.reset_inizio()
    //table1.dati_filtro(new_data)
    //table1.render()
//});

let dati_fetch;

fetch("conf.json").then(r => r.json()).then(conf => {
    const fetch = generateFetchComponent();
    fetch.caricaDati(conf)
    fetch.getData().then(p => {
        console.log(p)
        dati_fetch=p
        const table1 = tableComponent();
        table1.setParentElement(tabella);
        table1.setData(p);
        table1.render();
        //pagina posto
        const detailComp = createDetail(paginaPosto);
        detailComp.setData(p);
        detailComp.render();
        //-
        const form = createForm(formElement);
        form.render();
        document.querySelector("#Aggiungi").onclick = () => {
            const Posizione = document.querySelector("#Posizione").value;
            const Titolo = document.querySelector("#Titolo").value;
            const Datainizio = document.querySelector("#Data_inizio").value;
            const Datafine = document.querySelector("#Data_fine").value;
            const Paragrafo_1 = document.querySelector("#Paragrafo_1").value;
            const Paragrafo_2 = document.querySelector("#Paragrafo_2").value;
            const Paragrafo_3 = document.querySelector("#Paragrafo_3").value;
            const feriti = document.querySelector("#Feriti").value;
            const morti = document.querySelector("#Morti").value;
            const Immagine_1 = document.querySelector("#Immagine_1").value;
            const Immagine_2 = document.querySelector("#Immagine_2").value;
            if (Titolo === "" || Datainizio === "" || Datafine === "" || Paragrafo_1 === "" && Paragrafo_2 === "" && Paragrafo_3 === "" || feriti === "" || morti === "" || Immagine_1 === "" && Immagine_2 === "") {
                // LUTENTE NON HA INSERITO CORRETTAMENTE I DATI
                outputform.innerHTML="ko";
            }else{
                outputform.innerHTML="ok";  
                let nuovo_dato = {}
                const idunico = uuidv4();//ID GENERATO CASUALMENTE
                nuovo_dato["id"] = idunico
                nuovo_dato["Posizione"] = Posizione
                nuovo_dato["Nome"]=Titolo
                nuovo_dato["Data_inizio"]=Datainizio
                nuovo_dato["Data_fine"]=Datafine
                nuovo_dato["Paragrafo1"]=Paragrafo_1
                nuovo_dato["Conseguenze"]=Paragrafo_2
                nuovo_dato["Riflessioni"]=Paragrafo_3
                nuovo_dato["Num_feriti"]=feriti
                nuovo_dato["Num_morti"]=morti
                nuovo_dato["Foto1"]=Immagine_1
                nuovo_dato["Foto2"]=Immagine_2
                console.log(nuovo_dato)
                dati_fetch.push(nuovo_dato)
                fetch.setData(dati_fetch)
                fetch.getData().then(p => {console.log(p)})
            }
        }
    })
    const navigator = createNavigator(document.querySelector("#container"));
    const form_login=createFormLogin(formLogin)
    const Login = createLogin()
    form_login.render(Login,bottone_admin)
    const Map=createMap()
    Map.render()
});
window.addEventListener("load", function () {
    let risposta = sessionStorage.getItem("login");
    console.log(risposta)
    if (risposta==="true"){
        bottone_admin.classList.remove("d-none")
    }
});
