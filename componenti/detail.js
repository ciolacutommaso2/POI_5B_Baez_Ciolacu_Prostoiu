export const createDetail = (parentElement) => {
    let data= [];
    let data2= [];
    return {
        render: () =>{
            urlNow = window.location.href;
            console.log("URL ", urlNow)
            let id = urlNow.replace("http://127.0.0.1:5500/POI.html#", "")
            data.forEach((d) => {
                if (d.id == id) {
                    template = `<div class="container mt-5">
                                    <header class="mb-4">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <h1 class="h3 mt-3">%POSTO</h1>
                                            <a href="#" class="btn btn-primary mt-3">Torna ad HOME</a>
                                        </div>
                                    </header>
                            
                                    <div class="row">
                                        <div class="col-md-8">
                                            <section class="mb-4">
                                                <h2 class="h5 mt-3">Paragrafo</h2>
                                                <p class="mt-3">Testo che riempirà il paragrafo e spiegherà l'argomento del paragrafo</p>
                                            </section>
                                            <section class="mb-4">
                                                <h2 class="h5 mt-3">Paragrafo</h2>
                                                <p class="mt-3">Testo che riempirà il paragrafo e spiegherà l'argomento del paragrafo</p>
                                            </section>
                                            <section class="mb-4">
                                                <h2 class="h5 mt-3">Paragrafo</h2>
                                                <p class="mt-3">Testo che riempirà il paragrafo e spiegherà l'argomento del paragrafo</p>
                                            </section>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="border rounded bg-light d-flex align-items-center justify-content-center"
                                                style="height: 300px;">
                                                <span class="text-center">IMMAGINI DEI POSTI</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                }
            })
             
        },
        setData: (dato) =>{data=dato;data2=dato},

    }
}