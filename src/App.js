import Header from './Components/Header/Header.jsx'
import Settings from './Components/Settings/Settings.jsx';
import MainContainer from './Components/MainContainer/MainContainer.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

function App() {

  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState('');
  const [loading, isLoading] = useState(true);
  const [currentLocation, setLocation] = useState('');
  const [degree, setDegrees] = useState('');
  const [temperature, setTemperature] = useState('');

  const initialLoad = useRef(true);

  const handleSearchChange = e => {
    setSearch(e.target.value);
  }
  
  const handleSearch = e => {
    if (e.keyCode === 13) {
      getWeather();
    };
  };

 const handleSettings = e => {
    setDegrees('Fahrenheit');
 }

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
        return response.json()
      } else if (response.status === 404) {
        return('Womp womp')
      } else {
        return('error ' + response.status)
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
        return response.json()
      } else if (response.status === 404) {
        return('Womp womp')
      } else {
        return('error ' + response.status)
      }
    })
    .then(data => {
      setWeather(data);
      console.log('getWeather ', data);
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <Header
        search={search}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
      />
      <Settings
        degree={degree}
        setDegrees={setDegrees}
        weather={weather}
        setTemperature={setTemperature}
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
