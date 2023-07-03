import { createServer } from "http";
import asteroids from "./asteroids.js";
import https from 'https';
let myserver = createServer((req, res)=>{
    if(req.url == "/asteroids"){
        asteroids.asteroidGet(req, res);
    }else{
        let data = "";
        https.get("https://api.nasa.gov/planetary/apod?api_key=5WjbHT1Oqu2o9vdlregm5Jw2Mrq9pUVnbTpYuDdz", (peticion)=>{
        peticion.on("data", (chuck)=>{
            data += chuck;
        })
        peticion.on("end", ()=>{
            let plantilla = /*HTML*/`
            <div id="body" style="width: 100%;height: 100%;background-color: blue;margin: 0;padding: 0;           
            background-image: url('https://64.media.tumblr.com/af8dc0552e6e5dfaf57f146c5db0c057/074a4fdc5886cd6b-c4/s2048x3072_c0,15500,99833,100000/d5d7faec0e59064ad2bb8fad39fc0b749471f399.gif');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;">
                <div id="box1" class="box blurred-bg tinted" style="width:500px; height:300px; left:-webkit-calc( 50% - 250px );top:20%;
                position:absolute;border-radius:5px;border:1px solid rgba(255,255,255,.3);padding:20px;text-align: center;text-shadow:0 1px 1px rgba(0,0,0,.4);
                display: flex; background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));">
                    <div class="content" style="">
                        <h1>Sistema de seguimiento de asteroides</h1>
                            <h2>Api usada: <a href="https://api.nasa.gov" rel="follow" target="_blank">Nasa Api</a></h2>
                            <p>Bienvenido al sistema de siguimeinto de asteroides. Aqui podras ver los asteroides 
                            que pasen cerca de la tierra a tiempo real</p>
                        <p class="related">Preciona para entrar al sistema: <a href="http://127.9.0.198:3000/asteroids">Asteroides</a></p>  
                    </div>
                </div>
            </div>
            `;
            res.end(plantilla);
        })
    })
    }
})

const config = {
    hostname : "127.9.0.198",
    port : 3000
}
myserver.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}/`);
});

