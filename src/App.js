import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import GlobalStyle from './Theme/GlobalStyle.js' 
import Header from './Components/Header.jsx';
import MainContainer from './Components/MainContainer.jsx';
import Footer from './Components/Footer.jsx';
import moment from 'moment-timezone';

function App() {

  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, isLoading] = useState(true);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongtitude] = useState('');
  const [currentCity, setCity] = useState('');
  const [currentState, setState] = useState('');
  const [currentCountry, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [degree, setDegrees] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [error, setError] = useState('');
  const [bgImage, setBgImage] = useState('');

  const initialLoad = useRef(true);

  const handleSearchChange = e => {
    setSearch(e.target.value);
  }
  
  const handleSearch = e => {
    if (e.keyCode === 13) {
      getWeather();
    };
  };

  const degrees = ['Fahrenheit', 'Celsius'];

  const getTemperature = () => {
      let kelvin = weather?.main?.temp;
      const klevinToFahrenheit = (kelvin - 273.15) * 1.8 + 32;
      const klevinToCelsius = kelvin - 273.15;
      if (degree === 'Fahrenheit') {
        let value = (Math.round(klevinToFahrenheit));
        setTemperature(value);
      } else if (degree === 'Celsius')  {
        let value = (Math.round(klevinToCelsius));
        setTemperature(value);
      }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useLayoutEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false
      return;
    } else if (currentCity) {
      getWeather();
    }
  }, [currentCity]);

  useEffect(() => {
    if (!weather) {
      return;
    } else {
      getTemperature();
    }
  }, [weather, degree]);

  useEffect(() => {
    if (!loading) {
      setWeatherDescription(weather.weather[0].description);
      setLatitude(weather.coord.lat);
      setLongtitude(weather.coord.lon); 
    }
  }, [weather]);
  
  useEffect(() => {
    if (weatherDescription) {
      searchPhotos();
    }
  }, [weatherDescription]);

  useEffect(() => {
    if (latitude) {
      showCity();
    }
  }, [latitude]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showCity);
    } else { 
      console.log('Geolocation is not supported by this browser.');
    }
  }
  
  const showCity = (position) => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(`${process.env.REACT_APP_LOCATION_BASE}lat=${latitude || position.coords.latitude}&lon=${longitude || position.coords.longitude}&format=json&apiKey=${process.env.REACT_APP_LOCATION_API_KEY}`, requestOptions)
    .then(response => {
      if (response.ok) {
        setError('');
        return response.json()
      } else if (response.status === 404) {
        setError('Could not find your location :(');
      } else {
        setError('error ' + response.status);
      }
    })
    .then(data => {
      let locationCity = data.results[0].city;
      let locationState = data.results[0].state;
      let locationCountry = data.results[0].country;
      setSearch(locationCity + ', ' + locationState + ', ' + locationCountry);
      setCity(data.results[0].city);
      setState(data.results[0].state);
      setCountry(data.results[0].country);
      setTimezone(data.results[0].timezone.name);
      isLoading(false);
    })
    .catch(error => console.log(error));
  }

  const getWeather = () => {
    fetch(`${process.env.REACT_APP_WEATHER_BASE}weather?q=${search || currentCity}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(response => {
      if (response.ok) {
        setError('');
        return response.json()
      } else if (response.status === 404) {
        setError('Invalid query')
      } else {
        setError('Error ' + response.status)
      }
    })
    .then(data => {
      setWeather(data); 
    })
    .catch(error => console.log(error));
  }

  const numItemsToGenerate = 1; 

  function searchPhotos(){
    fetch(`https://source.unsplash.com/1600x900/?` + weatherDescription).then((response)=> {   
      setBgImage(response.url);
    }) 
  }

  return (
    <>
      <GlobalStyle
        bgImage={bgImage}
        loading={loading}
      />
      <Header
        loading={loading}
        search={search}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        error={error}
        degree={degree}
        weather={weather}
        setTemperature={setTemperature}
        degrees={degrees}
        setDegrees={setDegrees}
      />
      <MainContainer
        loading={loading}
        weather={weather}
        temperature={temperature}
        degree={degree}
        currentCountry={currentCountry}
        currentState={currentState}
        currentCity={currentCity}
        timezone={timezone}
      />
      <Footer />
    </>
  );
}

export default App;
