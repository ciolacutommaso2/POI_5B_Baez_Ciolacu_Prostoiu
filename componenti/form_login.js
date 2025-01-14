export const createFormLogin = (parentElement) => {
    return { 
        render: (login,bottone_aggiungi) => {
            parentElement.innerHTML = 
                `<div>Nome<br/><input id="Nome" type="text" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/></div>`+
                `<div>Password<br/><input id="Password" type="password" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"/></div>`
            document.querySelector("#Login").onclick = () => {
                const Nome = document.querySelector("#Nome").value;
                const Password = document.querySelector("#Password").value;
                if (Nome === "" || Password === "" ) {
                    outputform.innerHTML="ko";
                }else{
                    login.login(Nome,Password).then((r)=>{
                        console.log(r)
                        if(r==="Ok"){
                            login.sessionstorage()
                        }
                        let risposta = sessionStorage.getItem("login");
                        console.log(risposta)
                        if (risposta==="true"){
                            login.render(bottone_aggiungi)
                        }
                    })
            }
        }
    }
}
}
