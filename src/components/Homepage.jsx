import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Slideshow from "./Slideshow";

function Homepage({
  city,
  onCityChange,
  onSearch,
  weather,
  history,
  setCity,
  onSearchHistory,
  onClearSearch,
  onClearHistory,
}) {
  // Gestisco la visibilità del dropdown con la cronologia
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Aggiungo lo slideshow di sfondo */}
      <Slideshow />

      {/* Creo un overlay scuro per migliorare la leggibilità */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(25, 25, 25, 0.3)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        className="container d-flex flex-column align-items-center flex-grow-1"
        style={{ padding: 10, position: "relative", zIndex: 5 }}
      >
        <div
          className="row w-100 justify-content-center"
          style={{ marginTop: "20px" }}
        >
          <div
            className="col-12 col-sm-10 col-md-8 col-lg-6 text-center"
            style={{ position: "relative" }}
          >
            <h1 className="mb-3 text-white text-stroke">Che tempo farà?</h1>
            {/* Campo di ricerca con dropdown per ricerche recenti */}
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Cerca una città"
                value={city}
                onChange={onCityChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                onKeyDown={(e) => {
                  // Faccio funzionare Enter
                  if (e.key === "Enter") {
                    onSearch();
                  }
                }}
                autoComplete="off"
              />
              <button
                className="btn btn-dark rounded-end-pill"
                onClick={onSearch}
              >
                Cerca
              </button>
            </div>
            {/* Menu a tendina per cronologia */}
            {history && history.length > 0 && showDropdown && (
              <ul
                className="list-group position-absolute"
                style={{
                  zIndex: 10,
                  top: "100%",
                  left: 0,
                  width: "50%",
                  maxHeight: 200,
                  overflowY: "auto",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  margin: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
              >
                {history.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer", textAlign: "left" }}
                    onMouseDown={() => {
                      // Ricerca della città selezionata. Il droppdown si chiude
                      setCity(item);
                      setTimeout(() => onSearchHistory(), 0);
                      setShowDropdown(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Eventuale visualizzazione della cronologia */}
        {weather && weather.main && (
          <div style={showDropdown ? { marginTop: 120 } : { marginTop: 60 }}>
            <div
              className="d-flex justify-content-center mb-3"
              style={{ gap: 13 }}
            >
              {/* Card con informazioni sulla città */}
              <div
                className="col-12 col-sm-6 col-md-3"
                style={{ minWidth: 150, maxWidth: 190 }}
              >
                <div className="card bg-dark text-white h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title">Città</h5>
                    <p className="card-text">{weather.name}</p>
                  </div>
                </div>
              </div>
              {/* Card temperatura */}
              <div
                className="col-12 col-sm-6 col-md-3"
                style={{ minWidth: 150, maxWidth: 190 }}
              >
                <div className="card bg-dark text-white h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title">Temperatura</h5>
                    <p className="card-text">{weather.main.temp}°C</p>
                  </div>
                </div>
              </div>
              {/* Card meteo */}
              <div
                className="col-12 col-sm-6 col-md-3"
                style={{ minWidth: 150, maxWidth: 190 }}
              >
                <div className="card bg-dark text-white h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title">Meteo</h5>
                    <p className="card-text">
                      {weather.weather[0].description}
                      {/* Icona ombrello se piove */}
                      {weather.weather[0].main === "Rain" ? " ☔" : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottoni */}
        <div className="d-flex justify-content-center mt-5 mb-3">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {weather && weather.main && (
              <Link to="/details">
                <button className="btn btn-dark btn-sm">Mostra dettagli</button>
              </Link>
            )}

            {weather && weather.main && (
              <button className="btn btn-dark btn-sm" onClick={onClearSearch}>
                Pulisci ricerca
              </button>
            )}

            {history && history.length > 0 && (
              <button className="btn btn-dark btn-sm" onClick={onClearHistory}>
                Pulisci cronologia
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
