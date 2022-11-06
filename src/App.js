import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import GlobalStyle from './Theme/GlobalStyle.js' 
import Header from './Components/Header.jsx';
import MainContainer from './Components/MainContainer.jsx';
import Footer from './Components/Footer.jsx';
import moment from 'moment-timezone';
import CrossFade from './Components/CrossFade.jsx';

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
  const [currentTime, setCurrentTime] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [error, setError] = useState('');
  const [profile, setProfile] = useState([]);

  const initialLoad = useRef(true);

  const handleSearchChange = e => {
    setSearch(e.target.value);
  }
  
  const handleSearch = e => {
    if (e.keyCode === 13) {
      getWeather();
    }
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
    if (latitude) {
      showCity();
    }
  }, [latitude]);

  useEffect(() => {
    if (currentTime >= 5 && currentTime < 12) {
      setTimeOfDay('morning');
    } else if (currentTime >= 12 && currentTime < 16) {
      setTimeOfDay('afternoon');
    } else if (currentTime >= 16 && currentTime < 21) {
      setTimeOfDay('evening');
    } else if ((currentTime >= 21 && currentTime < 24) || (currentTime >= 0 && currentTime < 5)) {
      setTimeOfDay('night');
    } else {
      return;
    }
  })

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

  return (
    <>
      <GlobalStyle
        loading={loading}
      />
      <CrossFade
        weatherDescription={weatherDescription}
        timeOfDay={timeOfDay}
      />
      <Header
        loading={loading}
        setSearch={setSearch}
        search={search}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        error={error}
        degree={degree}
        weather={weather}
        setTemperature={setTemperature}
        degrees={degrees}
        setDegrees={setDegrees}
        profile={profile}
        setProfile={setProfile}
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
        setCurrentTime={setCurrentTime}
        profile={profile}
        weatherDescription={weatherDescription}
        currentTime={currentTime}
        timeOfDay={timeOfDay}
      />
      <Footer />
    </>
  );
}

export default App;
