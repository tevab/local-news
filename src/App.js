import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Header from './Components/Header.jsx';
import Settings from './Components/Settings.jsx';
import MainContainer from './Components/MainContainer.jsx';
import Footer from './Components/Footer.jsx';

function App() {

  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState();
  const [loading, isLoading] = useState(true);
  const [currentLocation, setLocation] = useState('');
  const [degree, setDegrees] = useState('');
  const [temperature, setTemperature] = useState('');
  const [error, setError] = useState('');

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

  const handleSettings = e => {
      setDegrees('Fahrenheit');
  }

  const getTemperature = () => {
      let kelvin = weather?.main?.temp;
      const klevinToFahrenheit = (kelvin - 273.15) * 1.8 + 32;
      const klevinToCelsius = kelvin - 273.15;
      if (degree === 'Fahrenheit') {
        let value = (Math.round(klevinToFahrenheit) + 'F');
        setTemperature(value);
      } else if (degree === 'Celsius')  {
        let value = (Math.round(klevinToCelsius) + 'C');
        setTemperature(value);
      }
  };

  useEffect(() => {
    getLocation();
    handleSettings();
  }, []);

  useLayoutEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false
      return;
    } else if (currentLocation) {
      getWeather();
    }
  }, [currentLocation]);

  useEffect(() => {
    if (!weather) {
      return;
    } else {
      getTemperature();
    }
  }, [weather, degree]);

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

    fetch(`${process.env.REACT_APP_LOCATION_BASE}lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=${process.env.REACT_APP_LOCATION_API_KEY}`, requestOptions)
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
      setSearch(data.results[0].city);
      setLocation(data.results[0].city);
      isLoading(false);
    })
    .catch(error => console.log(error));
  }

  const getWeather = () => {
    fetch(`${process.env.REACT_APP_WEATHER_BASE}weather?q=${search || currentLocation}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
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
      <Header
        loading={loading}
        search={search}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        error={error}
      />
      <Settings
        degree={degree}
        setDegrees={setDegrees}
        weather={weather}
        setTemperature={setTemperature}
        degrees={degrees}
      />
      <MainContainer
        loading={loading}
        weather={weather}
        temperature={temperature}
      />
      <Footer />
    </>
  );
}

export default App;
