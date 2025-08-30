document.addEventListener('DOMContentLoaded',()=>{

const cityinput=document.getElementById('city-input')
const getwheather=document.getElementById('get-wheather-btn')
const wheatherinfo=document.getElementById('wheather-info')
const cityname=document.getElementById('city-name')
const citytemp=document.getElementById('temp')
let empty=document.getElementById('empty')

const citydes=document.getElementById('des')

const errormsg=document.getElementById('error-msg')


const apiKey = "7ac72f555ee89917f81197e122eb20bc";//env variable




getwheather.addEventListener('click',async()=>{
    const city=cityinput.value.trim()
    if(city=="") {
        return  empty.textContent="Please Enter a city Name...";
    }
    // it may through some error

    try{
       const wheatherdata=await fetchwheather(city);
      
       displaywheather(wheatherdata)
       empty.textContent=""
    }catch(error){
        showerror()
    }
        
})


async function fetchwheather(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=
    ${city}&units=metric&appid=${apiKey}`;

     const response=await fetch(url);
     console.log(typeof response)
        if(!response.ok){
            throw new Error('city not found')
        }

        const data= await response.json();
        return data
    

}



function displaywheather(data){
    console.log(data)
    const{name,main,weather}=data
    cityname.textContent=name;
    citytemp.textContent=`Temperature:${main.temp}`;
    citydes.textContent=`Description:${weather[0].description}`;

    errormsg.classList.add('hidden')
    wheatherinfo.classList.remove('hidden')

}


function showerror(){
    errormsg.classList.remove('hidden')
    wheatherinfo.classList.add('hidden')
}


//change the backgroung image randomly

  const backgrounds = [
    'img/weather1.jpg',
    'img/weather2.jpg',
    'img/weather3.jpg',
    'img/weather4.jpg',
    'img/weather5.jpg',
    'img/weather6.jpg',
    'img/weather7.jpg',
  ];

  const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  document.body.style.backgroundImage = `url('${randomBg}')`;

 

})




// const apiKey = "YOUR_API_KEY";
// const city = "London";
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     document.getElementById("temp").textContent = data.main.temp + "°C";
//     document.getElementById("weather").textContent = data.weather[0].description;
//   })
//   .catch(error => console.error("Error fetching weather:", error));



