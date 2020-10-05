/* Global Variables */

//APIs
const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = 'hind55';

const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherApiKey = '2c269b6512514b848dcb8d35f1e75ea7';

const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayApiKey = '17900937-b0d650291e5b920612db01c3e';

let projectData = {};
let icon = "";

// geonames get request
const getCityInfo = async (geonamesURL, city, username) => {
    const request = await fetch(`${geonamesURL}${city}&maxRows=1&username=${username}`);
    try {
        const allData = await request.json();
        return allData;
    } catch (error) {
        console.log("error: ", error);
    }
};

// weatherbit get request
const getWeatherForecast = async (weatherbitURL, city, weatherApiKey) => {
        const request = await fetch(`${weatherbitURL}city=${city}&key=${weatherApiKey}`);
        try {
            const allData = await request.json();
            icon = allData.data[0].weather.icon;
            const output = "High - "+ allData.data[0].high_temp  +", Low - "+ allData.data[0].low_temp
            + "<br>"+allData.data[0].weather.description +" throughout the day.";
            return output;
            
        } catch (error) {
            console.log("error: ", error);
        }  
};

// pixabay pics get request
const getPixImg = async (pixabayURL, city, pixabayApiKey) => {
    const request = await fetch(`${pixabayURL}${pixabayApiKey}&q=${city}&image_type=photo&category=places&pretty=true&orientation=horizontal`); 
    try {
        const data = await request.json();
        return data.hits[0].largeImageURL;
        
    }    
    catch(error) {
        console.log("error", error);
    }
};

// calculate trip length function
const getTripLength = (startDate, endDate) => {
    const tripLength = new Date(endDate).getTime() - new Date(startDate).getTime()
    const tripLengthInDays = tripLength / (1000 * 60 * 60 * 24);
    return tripLengthInDays;
};

// calculate remaining days to trip function
const getRemainingDays = (startDate) => {
  const current = Date.now();
  const remainingTime = new Date(startDate).getTime() - new Date(current).getTime();
  const remainingTimeInDays = Math.ceil(remainingTime/ (1000 * 60 * 60 * 24));
  return remainingTimeInDays;
};

// Updating the app dynamically with API's information
const updateUI = async (image, projectData) => {
    try{
      document.getElementById("modal-image").setAttribute("src", image);
      document.getElementById("modal-icon").setAttribute("src", `https://www.weatherbit.io/static/img/icons/${icon}.png`);
      document.getElementById("city").innerHTML = projectData.city;
      document.getElementById("country").innerHTML = projectData.country;
      document.getElementById("weather").innerHTML = projectData.weather;
      document.getElementById("remaining-time").innerHTML = projectData.remainingTime;
      document.getElementById("length").innerHTML = projectData.tripLength;
      document.getElementById("modal-display").click();
  
    }catch(error){
      console.log("error", error);
    }
  };

// Request processing
document.getElementById('submit').addEventListener('click', function (event) {
    const city = document.getElementById('destination').value;
    let startDate = document.getElementById('start').value;
    let endDate = document.getElementById('end').value;

    projectData.tripLength = parseInt(getTripLength(startDate, endDate));
    projectData.remainingTime = parseInt(getRemainingDays(startDate));
    projectData.city = city;
    projectData.startDate = startDate;

    if (Client.validateInputs(startDate, endDate, city)) {
    document.getElementById("error").innerHTML = "";
    getCityInfo(geonamesURL, city, username)
    .then(function(data) {
        console.log(data);
        projectData.city = data.geonames[0].name;
        projectData.country = data.geonames[0].countryName;
        projectData.latitude = data.geonames[0].lat;
        projectData.longitude = data.geonames[0].lng;
        projectData.tripLength = getTripLength(startDate, endDate);
        projectData.remainingTime = getRemainingDays(startDate);
        console.log(projectData);

        const weather = getWeatherForecast(weatherbitURL, city, weatherApiKey);
        return weather;
        }).then(function(data){
            projectData.weather = data;
            const image = getPixImg(pixabayURL, city, pixabayApiKey);
            return image;
        }
        ).then(function(image){
            projectData.image = image;
            updateUI(image, projectData);

        });
    }
    else {
        document.getElementById("error").innerHTML = "Please enter a valid inputs!";;
    }
    } 
);


// export { handleSubmit }
