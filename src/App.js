import Header from './Components/Header/Header.jsx'
import MainContainer from './Components/MainContainer/MainContainer.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { useEffect, useState } from 'react'

function App() {

  const [search, setSearch] = useState('');
  // const [weather, setWeather] = use

  const handleChange = e => {
    setSearch(e.target.value);
  }
  
  const handleSearch = e => {
    if (e.keyCode === 13) {
      fetch(`${process.env.REACT_APP_BASE}weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else if (response.status === 404) {
            return('Womp womp')
          } else {
            return('error ' + response.status)
          }
        })
        .then(data => console.log(data))
        .catch(error => console.log(error));
    };
  };

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //     console.log(showPosition)
  //   } else { 
  //     x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  // })

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
