export const tableComponent = () => {
    let data= [];
    let data2= [];
    let inizioIndex = 0;
    let templateRow = `
        <tr class="tbl1">
            <td class = "border border-slate-600" >#D1</td>
            <td class = "border border-slate-600" >#D2</td>
            <td class = "border border-slate-600" >#D3</td>
            <td class = "border border-slate-600" >#D4</td>
            <td class = "border border-slate-600" >#D5</td>
            <td class = "border border-slate-600" >#D6</td>
            <td class = "border border-slate-600" >#D7</td>
            <td class = "border border-slate-600" >#D8</td>
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
        avanti:()=> {if ((inizioIndex + 5) <= data.length) {inizioIndex += 5}},
        indietro:()=> {if ((inizioIndex - 5) >= 0) {inizioIndex -= 5}},
        reset_inizio: () => {inizioIndex=0},
        dati_filtro: (new_Data) => {data2=new_Data},
        setTipo: (tip)=>{tipo=tip;},
        exportData: () => {return data;},
        render: () => {
            
            let html = ` <tr class="border"><th class="border-spacing-x-2">Indirizzo</th><th class="border">Targa 1</th>
            <th class="border">Targa 2</th><th class="border">Targa 3</th><th class="border">Data</th><th class="border">Ora</th>
            <th class="border">Feriti</th><th class="border">Morti</th></tr>`
            let c = 0;
            data2.forEach((el) => {
                if (c >= inizioIndex && c < (inizioIndex + 5)){
                    let html2 = "";
                    html2 += templateRow.replace("#D1", el.name.indirizzo);
                    html2 = html2.replace("#D2", el.name.targa1);
                    html2 = html2.replace("#D3", el.name.targa2);
                    html2 = html2.replace("#D4", el.name.targa3);
                    html2 = html2.replace("#D5", el.name.data);
                    html2 = html2.replace("#D6", el.name.ora);
                    html2 = html2.replace("#D7", el.name.feriti);
                    html2 = html2.replace("#D8", el.name.morti);   
                    html += html2;             
                }
                c++;
            });
            
            
            
            parentElement.innerHTML = html;
        },
    }
};
