export const createMap = () =>{
    let minZoom=4;
    let zoom = 4;
    let maxZoom = 5;
    let map = L.map('map').setView([37.697948,-97.314835], zoom);
    let places = [];
     return{
        setData: (dato) =>{places=dato},
        add: (dato) =>{
                map.setView(dato.coords, zoom);
                places.push(dato);
            },
        render: () => {
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
               maxZoom: maxZoom,
               minZoom: minZoom,
               attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            places.forEach((place) => {
                const marker = L.marker(place.coords).addTo(map);
                marker.bindPopup(`<h4>${place.name.Titolo}</h4><p>Data: ${place.name.Datainizio}</p><p>Ora: ${place.name.Datafine}</p>
                        <p>N° Feriti: ${place.name.feriti}</p><p>N° Morti: ${place.name.morti}</p>`);
            });
     }
    }
}