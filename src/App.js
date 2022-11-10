import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import GlobalStyle from './Theme/GlobalStyle.js';
import Header from './Components/Header.jsx';
import MainContainer from './Components/MainContainer.jsx';
import Footer from './Components/Footer.jsx';
import CrossFade from './Components/CrossFade.jsx';

function App() {
	const [query, setQuery] = useState('');
	const [search, setSearch] = useState('');
	const [weather, setWeather] = useState({});
	const [loading, setLoading] = useState(true);
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

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
		setQuery(e.target.value);
	};

	const handleSearch = (e) => {
		if (e.keyCode === 13) {
			getWeather();

			document.getElementById('search').blur();
		}
	};

	useEffect(() => {
		setSearch(query);
	}, [query]);

	const degrees = ['Fahrenheit', 'Celsius'];

	const getTemperature = () => {
		const kelvin = weather?.main?.temp;
		const klevinToFahrenheit = (kelvin - 273.15) * 1.8 + 32;
		const klevinToCelsius = kelvin - 273.15;
		if (degree === 'Fahrenheit') {
			const value = (Math.round(klevinToFahrenheit));
			setTemperature(value);
		} else if (degree === 'Celsius') {
			const value = (Math.round(klevinToCelsius));
			setTemperature(value);
		}
	};

	useEffect(() => {
		getLocation();
	}, []);

	useLayoutEffect(() => {
		if (initialLoad.current) {
			initialLoad.current = false;
		} else if (currentCity) {
			getWeather();
		}
	}, [currentCity]);

	useEffect(() => {
		if (weather) {
			getTemperature();
		}
	}, [weather, degree]);

	useEffect(() => {
		if (!loading && weather) {
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
		} else if (currentTime >= 12 && currentTime < 17) {
			setTimeOfDay('afternoon');
		} else if (currentTime >= 17 && currentTime < 21) {
			setTimeOfDay('evening');
		} else if ((currentTime >= 21 && currentTime < 24) || (currentTime >= '0' && currentTime < 5)) {
			setTimeOfDay('night');
		}
	}, [currentTime]);

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showCity);
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	};

	const showCity = (position) => {
		const requestOptions = {
			method: 'GET',
		};

		fetch(`${process.env.REACT_APP_LOCATION_BASE}lat=${latitude || position.coords.latitude}&lon=${longitude || position.coords.longitude}&format=json&apiKey=${process.env.REACT_APP_LOCATION_API_KEY}`, requestOptions)
			.then((response) => {
				if (response.ok) {
					setError('');
					return response.json();
				} else if (response.status === 404) {
					setError('Could not find your location :(');
				} else {
					setError('error ' + response.status);
				}
			})
			.then((data) => {
				const locationCity = data.results[0].city;
				const locationState = data.results[0].state;
				const locationCountry = data.results[0].country;
				setQuery(locationCity + ', ' + locationState + ', ' + locationCountry);
				setSearch(query);
				setCity(data.results[0].city);
				setState(data.results[0].state);
				setCountry(data.results[0].country);
				setTimezone(data.results[0].timezone.name);
				setLoading(false);
			})
			.catch((error) => console.log(error));
	};

	const getWeather = () => {
		fetch(`${process.env.REACT_APP_WEATHER_BASE}weather?q=${search || currentCity}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
			.then((response) => {
				if (response.ok) {
					setError('');
					return response.json();
				} else if (response.status === 404) {
					setError('Could not find location');
				} else {
					setError('Error ' + response.status);
				}
			})
			.then((data) => {
				setWeather(data);
			})
			.catch((error) => setError(error));
	};

	return (
		<>
			<GlobalStyle
				loading={loading}
			/>
			<CrossFade
				weatherDescription={weatherDescription}
				timeOfDay={timeOfDay}
				currentCity={currentCity}
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
				query={query}
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
			<Footer
				style={{
					color: '#f5f5f5',
					textShadow: '0px 4px 4px rgb(30 18 18 / 52%)',
					fontSize: 12,
					margin: 20,
					textAlign: 'center',
				}}
			/>
		</>
	);
}

export default App;
