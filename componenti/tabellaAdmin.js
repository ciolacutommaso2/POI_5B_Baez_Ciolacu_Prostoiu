export const createTableAdmin = (compFetch, modificaDati, eliminaDati) => {
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
        render: (form) => {
            
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
                //ELIMINA
                document.getElementById(("eliminaBtn" + i)).onclick = eliminaDati(i);

                //MODIFICA
                document.getElementById(("modificaBtn" + i)).onclick = modificaDati(i);

            }  
        
    }
}};
