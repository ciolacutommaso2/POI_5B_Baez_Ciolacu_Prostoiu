export const createTableAdmin = (compFetch) => {
    let data= [];
    let data2= [];
    let tipo="";
    let templateRow = `
        <tr class="tbl1">
            <td class = "border border-slate-600" >#D1</td>
            <td class = "border border-slate-600" >#D2</td>
            <td class = "border border-slate-600" >#D3</td>
        </tr>        
    `;
    let parentElement;

    return {
        togliDati: (inizio, fine) => {data.splice(inizio, fine)}, 
        setData: (dato) =>{
            data=dato;
            data2=dato;
            console.log(dato);
        },
        addData: (dato,compFetch) => {
            data.push(dato);
            compFetch.setData(data).then(dato => {
                compFetch.getData().then(dato=>{
                    data=dato;
                })
            })
        },
        setParentElement: (pr) => {
            parentElement = pr;
        },
        dati_filtro: (new_Data) => {data2=new_Data},
        exportData: () => {return data;},
        render: (form,table) => {
            
            console.log("DATI: ", data)
            if (parentElement){
                parentElement.innerHTML = "";
            }
            let html = `
                    <table>
                    <tr class="table-light">
                        <th scope="col">Nome</th>
                        <th scope="col">Dettagli</th>
                        <th scope="col">Azioni</th>
                    </tr>`
                
            
            
            let templateBtn = 
            `<button type="button" class="btn btn-danger btn-sm btnAdminElimina" id="eliminaBtn#N1" >Elimina posto</button>
            <button type="button" class="btn btn-primary btn-sm btnAdminModifica" id="modificaBtn#N2" >Modifica posto</button>
                        `
            
            //INSERIMENTO HTML
            for (let i = 0; i < data.length; i++) {


                // Controllo che l'oggetto abbia la struttura attesa
                if (!data[i] || !data[i].name || !data[i].name.Titolo) {
                    console.log(`Elemento non valido in data[${i}]:`, data[i]);
                    continue; // Salta questo elemento
                }

                html += templateRow.replace("#D1", data[i].name.Titolo);
                html = html.replace("#D2", data[i].name.Paragrafo_1);
                let t = templateBtn.replace("#N1", i);
                t = t.replace("#N2", i);
                html = html.replace("#D3", t);
            }
            html += "</table>";
            parentElement.innerHTML = html;
            //-
            

            //CREAZIONE BOTTONI
            for (let i = 0; i < data.length; i++) {
                //Modifica
               document.getElementById(("modificaBtn" + i)).onclick = () => {
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
                        data[i].name = dataDiz;

                        compFetch.setData(data).then(dato => {
                            compFetch.getData().then(datoNew=>{
                                data = datoNew;
                                console.log("DATO MODIFICATO -> ", datoNew);
                                btnAggiungiModifica.textContent = "Aggiungi posto";
                                table.render(form,table)
                        })})
                    }

               }

                //Elimina
                document.getElementById(("eliminaBtn" + i)).onclick = () => {
                    data.splice(i, 1);
                    compFetch.setData(data).then(dato => {
                        compFetch.getData().then(dato => {
                            data = dato;
                            console.log("DATO ELIMINATO -> ", dato);
                            //parentElement.innerHTML = html;
                            table.render(form,table)
                        });
                    });
                }
                document.querySelector("#Posizione").value = "";
                document.querySelector("#Titolo").value = "";
                document.querySelector("#Data_inizio").value = "";
                document.querySelector("#Data_fine").value = "";
                document.querySelector("#Paragrafo_1").value = "";
                document.querySelector("#Paragrafo_2").value = "";
                document.querySelector("#Paragrafo_3").value = "";
                document.querySelector("#Feriti").value = "";
                document.querySelector("#Morti").value = "";
                document.querySelector("#Immagine_1").value = "";
                document.querySelector("#Immagine_2").value = "";

            }  
        
    }
}};
