export const createTableAdmin = () => {
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
        setData: (dato) =>{data=dato;data2=dato},
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
        render: () => {
            
            let html = `
                    <tr class="table-light">
                        <th scope="col">Nome</th>
                        <th scope="col">Dettagli</th>
                        <th scope="col">Azioni</th>
                    </tr>`
                
            let templateBtn = 
            `<button type="button" class="btn btn-danger btn-sm btnAdminElimina" id="eliminaBtn#N" >Elimina posto</button>
            <button type="button" class="btn btn-primary btn-sm btnAdminModifica" id="modificaBtn#N" >Modifica posto</button>
                        `
            let c = -1;
            console.log(data,data2)
            data2.forEach((el) => {
                    c++;
                    let html2 = "";
                    html2 += templateRow.replace("#D1", el.Nome);
                    html2 = html2.replace("#D2", el.Feriti);
                    let t = templateBtn.replace("#N", c);t = templateBtn.replace("#N", c);
                    html2 = html2.replace("#D3", t); 
                    html += html2;             
            });
            
            
            
            parentElement.innerHTML = html;
            listBtnAdminElimina = document.querySelectorAll("btn btn-danger btn-sm btnAdminElimina"); // PARSING DEI BOTTONI
            
            let btns = [];
            for (let i = 0; i < listBtnAdminElimina.length; i++) {
                const btn =  document.getElementById(("eliminaBtn" + i));
                btn.onclick = () => {
                    data.splice(i, 1);
                    console.log("POSTO ELIMINATO")
                    render();
                }
            }
        }
        
    }
};
