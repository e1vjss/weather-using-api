

const apiKey = window.myConfig.apiKey;


let forecastDisplayed = false;
let weekDisplayed = false;

async function getWeather(location) {
 

  try {
    const apiUrl = ` http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}`;
    response = await fetch(apiUrl); //Lets Fetch the API
    if (!response.ok) {
      //if the response is not okay lets get the REPONSE error.status
      throw new Error(`we ecountered Error ${response.status}`);
    }
    //else lets create a varibale to get the data
    data = await response.json();
   
    let currentTemp = JSON.stringify(data.current.temp_f);
    let locationName = data.location.name;
    if (!forecastDisplayed) {
      currentForecast(currentTemp, locationName);
      forecastDisplayed = true;
    }

    
  } catch (error) {
    console.error(`ERROR:`, error);
    alert('location can not be blank')
  }
}

function inputDisplay() {
  const inputBox = document.getElementById("input");
  const searchButton = document.getElementById("search");
  searchButton.addEventListener("click", function () {
    let input = inputBox.value;
    forecastDisplayed = false;
  
    getWeather(input);
    weekDisplayed = false;

    weekly(input);
    
    
  });
}
function currentForecast(currentTemp, locationName) {
  let forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";
  let div = document.createElement("div");
  div.className = "weather";
  div.innerHTML = `${currentTemp}&deg;C`;
  let name = document.createElement("div");
  name.className = "weather";
  name.innerHTML = `${locationName}`;
  forecastContainer.appendChild(name);
  forecastContainer.appendChild(div);
}

async function weekly(location) {
  try {
    
    let days = 7;
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${days}`;
    response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`we ecountered an Error${response.status}`);
    }
    let data = await response.json();
    console.log(data.forecast.forecastday);
    if (!weekDisplayed){
      days = data.forecast.forecastday;
    arrayDays(days);
    weekDisplayed = true;
  
    
    
    }
    
  } catch (error) {
    return error;
  }
}
function getDayOfWeek(dateString) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(`${dateString}T00:00:00Z`); // Assuming UTC time
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  return dayOfWeek;

}

function arrayDays(days) {
  let weeklyContainer = document.getElementById("weeklyForecast");
  weeklyContainer.innerHTML = '';

  days.forEach((day) => {
    maxTemp = day.day.maxtemp_f
    minTemp = day.day.mintemp_f
    theday =day.date;
    const dayOfWeek = getDayOfWeek(theday);
    console.log(dayOfWeek,maxTemp)
    let div = document.createElement('div')
    div.className = 'daysOfTheWeek';
    div.innerHTML = `<p>${dayOfWeek} </p>
    <p>${maxTemp}</p>`
    weeklyContainer.appendChild(div)
    
    


  });
}
inputDisplay();
