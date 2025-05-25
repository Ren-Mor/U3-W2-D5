import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Details from "./components/Details";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// In questa pagina ho utilizzato gli hooks
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  function handleInputChange(e) {
    setCity(e.target.value);
  }

  async function cercaMeteo() {
    if (city === "") {
      return;
    }

    const apiKey = "796d0f8738a4dc6ad5ccd3986a4dcc47";

    const urlMeteo =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=metric&lang=it";

    const urlPrevisioni =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=metric&lang=it";

    const rispostaMeteo = await fetch(urlMeteo);
    const rispostaPrevisioni = await fetch(urlPrevisioni);

    const datiMeteo = await rispostaMeteo.json();
    const datiPrevisioni = await rispostaPrevisioni.json();

    setWeather(datiMeteo);
    setForecast(datiPrevisioni);
  }

  function pulisciRicerca() {
    setCity("");
    setWeather(null);
    setForecast(null);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              city={city}
              onCityChange={handleInputChange}
              onSearch={cercaMeteo}
              weather={weather}
              forecast={forecast}
              setCity={setCity}
              onClearSearch={pulisciRicerca}
            />
          }
        />
        <Route
          path="/details"
          element={<Details weather={weather} forecast={forecast} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
