export const createForm = (parentElement) => {
    return { 
        render: () => {
            //creazione input
            parentElement.innerHTML = 
                `<div>Titolo <br/><input id="Titolo" type="text" class="form-control"/></div>`+
                `<div>Data di inizio <br/><input id="Data_inizio" type="date" class="form-control"/></div>`+
                `<div>Data di fine <br/><input id="Data_fine" type="date" class="form-control"/></div>`+
                `<div>Paragrafo 1<br/><input id="Paragrafo_1" type="text" class="form-control"/></div>`+
                `<div>Paragrafo 2<br/><input id="Paragrafo_2" type="text" class="form-control"/></div>`+
                `<div>Paragrafo 3<br/><input id="Paragrafo_3" type="text" class="form-control"/></div>`+
                `<div>Numero feriti<br/><input id="Feriti" type="number" class="form-control"/></div>`+
                `<div>Numero morti<br/><input id="Morti" type="number" class="form-control"/></div>`+
                `<div>immagine 1<br/><input id="Immagine_1" type="text" class="form-control"/></div>`+
                `<div>immagine 2<br/><input id="Immagine_2" type="text" class="form-control"/></div>`+
                `<div id="outputform"></div>`
            //lettura valori inseriti;
            document.querySelector("#Aggiungi").onclick = () => {
                const Titolo = document.querySelector("#Titolo").value;
                const Data_inizio = document.querySelector("#Data_inizio").value;
                const Data_fine = document.querySelector("#Data_fine").value;
                const Paragrafo_1 = document.querySelector("#Paragrafo_1").value;
                const Paragrafo_2 = document.querySelector("#Paragrafo_2").value;
                const Paragrafo_3 = document.querySelector("#Paragrafo_3").value;
                const feriti = document.querySelector("#Feriti").value;
                const morti = document.querySelector("#Morti").value;
                const Immagine_1 = document.querySelector("#Immagine_1").value;
                const Immagine_2 = document.querySelector("#Immagine_2").value;
                if (Titolo === "" || Data_inizio === "" || Data_fine === "" || Paragrafo_1 === "" && Paragrafo_2 === "" && Paragrafo_3 === "" || feriti === "" || morti === "" || Immagine_1 === "" && Immagine_2 === "") {
                    // LUTENTE NON HA INSERITO CORRETTAMENTE I DATI
                    outputform.innerHTML="ko";
                }else{
                    outputform.innerHTML="ok";
        }
    }
}
}
}
