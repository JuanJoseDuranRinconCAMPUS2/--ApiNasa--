import https from 'https';
function asteroidGet(req, res, fecha1, fecha2) {
    let data = "";
    let count = 0;
    const apiKey = '5WjbHT1Oqu2o9vdlregm5Jw2Mrq9pUVnbTpYuDdz';
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fecha1}&end_date=${fecha2}&api_key=${apiKey}`;
    https.get(apiUrl, (peticion)=>{
        peticion.on("data", (chuck)=>{
            data += chuck;
        })
        peticion.on("end", ()=>{
            const Data = JSON.parse(data);
            const nearEarthObjects = Data.near_earth_objects[fecha1];
            let plantilla = /*HTML*/`
                <div id="body" style="width: 100%;height: 1000px;margin: 0;padding: 0;           
                background-image: url('https://i.pinimg.com/originals/cf/88/99/cf889965c8db4cace0467ba17cbab3f6.gif');
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;">
                    <h1 style="font-family: 'Arial', sans-serif;font-size: 40px;color: #fff;text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);text-align: center;
                    padding:5%"> 
                    Asteroides mas cercanos a la Tierra en estos momentos </h1>
                    <div class="container">
                        <a class="prev">&#10094;</a>
                        <a class="next" >&#10095;</a>
            `;           
            nearEarthObjects.forEach((val) => {
                plantilla+= /*HTML*/`
                <div class="mySlides">
                    <div class="card">
                        <div class="header">
                            <div class="image">
                            </div>
                            <div class="date">
                            <span>id: ${val.id}</span>
                            </div>
                            <div class="date">
                            <span>magnitud: ${val.absolute_magnitude_h}</span>
                            </div>
                        </div>
                        <div class="info">
                            <a rel="noopener noreferrer" class="block">
                                <span class="title">Nombre: ${val.name}</span>
                            </a>
                            <div class="">
                                <span>Diametro estimado max</span>
                                <ul type="disc">
                                    <li>${val.estimated_diameter.meters.estimated_diameter_max} metros</li>
                                    <li>${val.estimated_diameter.miles.estimated_diameter_max} millas</li>
                                    <li>${val.estimated_diameter.feet.estimated_diameter_max} pies</li>
                                </ul>
                                <span>Velocidad relativa</span>
                                <ul type="disc">
                                    <li>${val.close_approach_data[0].relative_velocity.kilometers_per_second} km/s</li>
                                    <li>${val.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</li>
                                    <li>${val.close_approach_data[0].relative_velocity.miles_per_hour} m/h</li>
                                </ul>
                                <span>Distancia</span>
                                <ul type="disc">
                                    <li>${val.close_approach_data[0].miss_distance.astronomical} astronomica</li>
                                    <li>${val.close_approach_data[0].miss_distance.lunar} lunar</li>
                                    <li>${val.close_approach_data[0].miss_distance.kilometers} kilometros</li>
                                    <li>${val.close_approach_data[0].miss_distance.miles} millas</li>
                                </ul>
                            </div>
                                <p class="description">Es peligroso: ${(val.is_potentially_hazardous_asteroid == true) ? "Es peligroso" :  "No es peligroso"}</p>
                        </div>
                    </div>
                </div>
                
                `;
            });
            plantilla+= /*HTML*/`
                <div class="elements">
                `;
            nearEarthObjects.forEach((val) => {
                count++
                plantilla+= /*HTML*/`
                <span class="quadrate" onclick="currentSlide(count)"></span>
                `;
            });
            plantilla+= /*HTML*/`
                        </div>
                    </div>
                </div>
                <script>
                    let slideIndex = 1;
                    showSlides(slideIndex)
                    function plusSlides(n){
                        showSlides(slideIndex += n)
                    }
                    function currentSlide(n){
                        showSlides(slideIndex = n)
                    }
                    let prev = document.querySelector(".prev")
                    prev.addEventListener("click", (e)=>{
                        plusSlides(-1)
                        })
                        let next = document.querySelector(".next")
                        next.addEventListener("click", (e)=>{
                        plusSlides(1)
                    })
                    function showSlides(n){
                    let i;
                    let slides = document.querySelectorAll(".mySlides");
                    let quadrates = document.querySelectorAll(".quadrate");
                    if(n > slides.length) slideIndex = 1
                    if(n < 1) slideIndex = slides.length
                    for(i = 0; i < slides.length; i++){
                        slides[i].style.display = "none"
                    }
                    for(i = 0; i < quadrates.length;i++){
                        quadrates[i].className =
                        quadrates[i].className.replace("active","")
                    }
                    slides[slideIndex-1].style.display = "block";
                    quadrates[slideIndex-1].className += " active";
                    }
                </script>
                <style>
                    .container{
                    width: 50%;
                    position: relative;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    }
                    .mySlides{
                    display: none;
                    }
                    .prev,
                    .next{
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    width: auto;
                    margin-top: -22px;
                    padding: 16px;
                    color: #fff;
                    font-weight: bold;
                    font-size: 18px;
                    transition: 0.6 ease;
                    border-radius: 0 3px 3px 0;
                    user-select: none;
                    border: solid #fff 2px;
                    }
                    .next {
                    right: 0;
                    border-radius: 3px 0 0 3px;
                    }
                    .prev:hover,
                    .next:hover{
                    background-color: rgba(0, 0, 0, 0.8);
                    }
                    .elements{
                    text-align: center;
                    }
                    .quadrate{
                    cursor: pointer;
                    height: 4px;
                    width: 50px;
                    margin: 0 2px;
                    background-color: #717171;
                    display: inline-block;
                    transition: background-color 0.6s ease;
                    border-radius: 2px;
                    }
                    .active, .quadrate:hover{
                    background-color: #fff;
                    }
                    @media screen and (max-width:900px) {
                    .container{
                    width: 100%;
                    }
                    }
                    @media screen and (max-width:500px) {
                    .container{
                    width: 100%;
                    }
                    .prev,
                    .next{
                    padding: 5px;
                    }
                    }
                    .card {
                    padding: 10px;
                    max-width: 300px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0,
                    0, 0.06);
                    background-color: rgb(255, 255, 255);
                    font-family: sans-serif;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    }
                    .content {
                    margin-top: 1rem;
                    }
                    .content .header {
                    margin-top: 0.5rem;
                    }
                    .image {
                    width: 94%;
                    height: 150px;
                    border-radius: 4px;
                    background-image: url('https://bestanimations.com/media/solar-system/552174649asteroid-animation-9.gif');
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    padding: 9px;
                    }
                    .tag {
                    text-transform: capitalize;
                    background-color: rgba(255, 101, 101, 0.425);
                    padding: 2px 8px;
                    border-radius: 4px;
                    color: #0F4C81;
                    }
                    .date {
                    display: flex;
                    font-size: 0.75rem;
                    line-height: 1rem;
                    align-items: center;
                    margin: 2px;
                    }
                    .title {
                    display: block;
                    font-size: 1.25rem;
                    line-height: 1.35rem;
                    font-weight: 600;
                    padding-bottom: 5px;
                    padding-top: 14px;
                    color: #0F4C81;
                    text-align: center;
                    }
                    .description {
                    line-height: 1.375;
                    }
                </style>
            `;
            res.end(plantilla);
        })    
    })
}
export default{
    asteroidGet
}