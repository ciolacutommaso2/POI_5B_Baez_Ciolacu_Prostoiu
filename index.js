function modificaDati(indice) {
    //INSERIMENTO DENTRO GLI INPUT
    document.querySelector("#Posizione").value = data[i].name.Posizione;
    document.querySelector("#Titolo").value = data[i].name.Titolo;
    document.querySelector("#Data_inizio").value = data[i].name.Datainizio;
    document.querySelector("#Data_fine").value = data[i].name.Datafine;
    document.querySelector("#Paragrafo_1").value = data[i].name.Paragrafo_1;
    document.querySelector("#Paragrafo_2").value = data[i].name.Paragrafo_2;
    document.querySelector("#Paragrafo_3").value = data[i].name.Paragrafo_3;
    document.querySelector("#Feriti").value = data[i].name.feriti;
    document.querySelector("#Morti").value = data[i].name.morti;
    document.querySelector("#Immagine_1").value = data[i].name.Immagine_1;
    document.querySelector("#Immagine_2").value = data[i].name.Immagine_2;
    
    
    const btnAggiungiModifica = document.querySelector("#Aggiungi");
    btnAggiungiModifica.textContent = "Salva Modifica";
    btnAggiungiModifica.onclick = () => {
            
        let tempID = data[i].name.id;
        console.log("MODIFICA DATI: ", data[i].nome)
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
            
            const dataDiz = {
                "id" : tempID,
                "Posizione" : Posizione,
                "Titolo" : Titolo,
                "Datainizio" : Datainizio,
                "Datafine" : Datafine,
                "Paragrafo_1" : Paragrafo_1,
                "Paragrafo_2" : Paragrafo_2,
                "Paragrafo_3" : Paragrafo_3,
                "feriti" : feriti,
                "morti" : morti,
                "Immagine_1" : Immagine_1,
                "Immagine_2" : Immagine_2
            }
            data[i].nome = dataDiz;

            compFetch.setData(data).then(dato => {
                compFetch.getData().then(datoNew=>{
                    data = datoNew;
                    console.log("DATO MODIFICATO -> ", datoNew);
                    btnAggiungiModifica.textContent = "Aggiungi posto";
                    
                    btnAggiungiModifica.onclick = eliminaDati();
            })})
    }
}

function eliminaDati(indice) {
    data.splice(indice, 1);
    compFetch.setData(data).then(dato => {
        compFetch.getData().then(dato => {
            data = dato;
            console.log("DATO ELIMINATO -> ", dato);
            //parentElement.innerHTML = html;
        });
    });
}




const tabella = document.getElementById("tabella");
const formElement = document.getElementById("form");
const formLogin = document.getElementById("formlogin");
const bottone_formlogin = document.getElementById("Login");
const bottone_admin = document.getElementById("buttonadmin");
const paginaPosto = document.getElementById("pagina_posto");
const tabellaAdmin1 = document.getElementById("tabellaAdmin");
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
import {createDetail} from "./componenti/detail.js";
import {createTableAdmin} from "./componenti/tabellaAdmin.js";


let dati_fetch;


fetch("conf.json").then(r => r.json()).then(conf => {
    const fetchComp = generateFetchComponent();
    const Map=createMap()
    const table1 = tableComponent();
    const detailComp = createDetail(paginaPosto);
    const navigator = createNavigator(document.querySelector("#container"),detailComp);
    const form_login=createFormLogin(formLogin)
    const Login = createLogin()
    const form = createForm(formElement);
    const tabellaAdmin = createTableAdmin(fetchComp, modificaDati, eliminaDati);

    fetchComp.caricaDati(conf)
    fetchComp.getData().then(p => {
        if (p == null){p = []}
        
        console.log("PPPP: ", p)
        dati_fetch=p;
        table1.setParentElement(tabella);
        table1.setData(p);
        table1.render();
        detailComp.setData(p);

        //TABELLA ADMIN
        tabellaAdmin.setParentElement(tabellaAdmin1);
        tabellaAdmin.setData(p);
        tabellaAdmin.render(form);

        //detailComp.render();
        Map.setData(p)
        Map.render(detailComp)
    });
    form.render(table1, Map, conf, fetchComp, tabellaAdmin);
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