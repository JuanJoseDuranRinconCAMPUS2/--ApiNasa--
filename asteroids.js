import https from 'https';
function asteroidGet(req, res) {
    let data = "";
    let fechaActual = new Date();
    var añoActual = fechaActual.getFullYear();
    var mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); 
    var diaActual = fechaActual.getDate().toString().padStart(2, '0');
    fechaActual = añoActual + "-" + mesActual + "-" + diaActual;
    // var fechaSiguiente = new Date();
    // fechaSiguiente.setDate(fechaActual.getDate() + 1);
    https.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${fechaActual}&end_date=${fechaActual}&api_key=5WjbHT1Oqu2o9vdlregm5Jw2Mrq9pUVnbTpYuDdz`, (peticion)=>{
        peticion.on("data", (chuck)=>{
            data += chuck;
        })
        peticion.on("end", ()=>{
            res.end(data);
        })    
    })
}
export default{
    asteroidGet
}