import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Details from "./components/Details";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // Creo gli stati per gestire i dati dell'applicazione
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState([]);

  // Gestisco il cambiamento dell'input per la città
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // Recupero i dati meteo dalla API
  const fetchWeather = async () => {
    const apiKey = "796d0f8738a4dc6ad5ccd3986a4dcc47";
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=it`;

    // Faccio le richieste in parallelo
    const [resWeather, resForecast] = await Promise.all([
      fetch(urlWeather),
      fetch(urlForecast),
    ]);
    const dataWeather = await resWeather.json();
    const dataForecast = await resForecast.json();

    // Aggiorno gli stati con i dati ricevuti
    setWeather(dataWeather);
    setForecast(dataForecast);

    // Aggiungo la città alla cronologia se non vi è già
    if (city && !history.includes(city)) {
      setHistory([city, ...history].slice(0, 10)); // Limito a 10 ricerche recenti
    }
  };

  // Pulizia dati della ricerca
  const handleClearSearch = () => {
    setCity("");
    setWeather(null);
    setForecast(null);
  };

  // Cancello la cronologia delle ricerche
  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    // Configuro le routes dell'applicazione
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              city={city}
              onCityChange={handleInputChange}
              onSearch={fetchWeather}
              weather={weather}
              forecast={forecast}
              history={history}
              setCity={setCity}
              onSearchHistory={fetchWeather}
              onClearSearch={handleClearSearch}
              onClearHistory={handleClearHistory}
            />
          }
        />
        <Route
          path="/details"
          element={<Details weather={weather} forecast={forecast} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
