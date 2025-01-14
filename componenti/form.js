export const createForm = (parentElement) => {
    return { 
        render: (table1, mappa, conf,compFetch) => {
            //creazione input
            parentElement.innerHTML = 
                `<div>Inserisci la località<br/><input id="indirizzo" type="text" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/></div>`+
                `<div>Data dell'incidente<br/><input id="Data" type="date" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/></div>`+
                `<div>Ora dell'incidente<br/><input id="Ora" type="time" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/></div>`+
                `<div>Targa 1<br/><input id="Targa1" type="text" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/></div>`+
                `<div>Targa 2<br/><input id="Targa2" type="text" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/></div>`+
                `<div>Targa 3<br/><input id="Targa3" type="text" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/></div>`+
                `<div>Numero feriti<br/><input id="Feriti" type="number" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/></div>`+
                `<div>Numero morti<br/><input id="Morti" type="number" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/></div>`+
                `<div id="outputform"></div>`
            //lettura valori inseriti
            document.querySelector("#Aggiungi").onclick = () => {
                const indirizzo = document.querySelector("#indirizzo").value;
                const data = document.querySelector("#Data").value;
                const ora = document.querySelector("#Ora").value;
                const targa1 = document.querySelector("#Targa1").value;
                const targa2 = document.querySelector("#Targa2").value;
                const targa3 = document.querySelector("#Targa3").value;
                const feriti = document.querySelector("#Feriti").value;
                const morti = document.querySelector("#Morti").value;
                if (indirizzo === "" || data === "" || ora === "" || targa1 === "" && targa2 === "" && targa3 === "" || feriti === "" || morti === "") {
                    // LUTENTE NON HA INSERITO CORRETTAMENTE I DATI
                    outputform.innerHTML="ko";
                }else{
                    //TUTTI I CAMPI COMPLETATI
                    const adesso = new Date();
                    const [anno, mese, giorno] = data.split("-");
                    const dataInput = new Date(anno, mese-1, giorno, 0, 0, 0, 0);
                    if (dataInput < adesso){
                        const dataDiz = {
                        "indirizzo": indirizzo,
                        "data": data,
                        "ora": ora,
                        "targa1": targa1,
                        "targa2": targa2,
                        "targa3": targa3,
                        "feriti": feriti,
                        "morti": morti
                        };
                        let url="https://us1.locationiq.com/v1/search?key=%TOKEN &q=%NOME, milano &format=json&"
                        url = url.replace("%TOKEN",conf.token)
                        url = url.replace("%NOME",indirizzo)
                        fetch(url)
                        .then(r => r.json())
                        .then(data => {
                            const dato ={
                                name: dataDiz,
                                coords: [data[0].lat, data[0].lon]
                            }
                            if(data[0].display_name.toLowerCase().includes("milano") && data[0].lat <= 45.6174047 && data[0].lat >= 45.1821072 && data[0].lon <= 9.4936171 && data[0].lon >= 8.7253673){

                                                table1.addData(dato,compFetch);
                                table1.render();
                                mappa.add(dato);
                                mappa.render();
                                outputform.innerHTML="ok";
                            }else{
                                outputform.innerHTML="ko";
                            }
                        })
                    } else {
                        outputform.innerHTML="DATA INVALIDA";
                    }
                
            }
            document.querySelector("#indirizzo").value = "";
            document.querySelector("#Data").value = "";
            document.querySelector("#Ora").value = "";
            document.querySelector("#Targa1").value = "";
            document.querySelector("#Targa2").value = "";
            document.querySelector("#Targa3").value = "";
            document.querySelector("#Feriti").value = "";
            document.querySelector("#Morti").value = "";
        }
    }
}
}

