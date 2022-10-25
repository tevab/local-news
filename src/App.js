import Header from './Components/Header/Header.jsx'
import MainContainer from './Components/MainContainer/MainContainer.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { useEffect, useState } from 'react'

const api = {
  key: '361bf1c841e118b50c9f5673d768679d',
  base: 'http://api.openweathermap.org/data/2.5/',
}

function App() {

  const [search, setSearch] = useState('');
  // const [weather, setWeather] = use

  const handleChange = e => {
    setSearch(e.target.value);
  }
  
  const handleSearch = e => {
    if (e.keyCode === 13) {
      fetch(`${api.base}weather?q=${search}&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          console.log(result);
        })
        .catch(console.log('error'))
    };
  };

  return (
    <>
      <Header
        search={search}
        handleSearch={handleSearch}
        handleChange={handleChange}
      />
      <MainContainer />
      <Footer />
    </>
  );
}

export default App;
