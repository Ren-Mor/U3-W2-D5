import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Slideshow from "./Slideshow"; // <-- importa lo slideshow

function Homepage({
  city,
  onCityChange,
  onSearch,
  weather,
  forecast,
  history,
  setCity,
  onSearchHistory,
  onClearSearch,
  onClearHistory,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <Slideshow />
      {/* Overlay per rendere leggibile il contenuto */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.35)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        className="container d-flex flex-column align-items-center flex-grow-1"
        style={{ padding: 10, position: "relative", zIndex: 2 }}
      >
        <div
          className="row w-100 justify-content-center"
          style={{ marginTop: "20px" }}
        >
          <div
            className="col-12 col-sm-10 col-md-8 col-lg-6 text-center"
            style={{ position: "relative" }}
          >
            <h1 className="mb-3">Che città cerchiamo?</h1>
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
                  if (e.key === "Enter") {
                    onSearch();
                  }
                }}
                autoComplete="off"
              />
              <button
                className="btn btn-primary rounded-end-pill"
                onClick={onSearch}
              >
                Cerca
              </button>
            </div>
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

        {weather && weather.main && (
          <div style={showDropdown ? { marginTop: 70 } : {}}>
            <h2 className="fs-4">{weather.name}</h2>
            <p className="mb-1">Temperatura: {weather.main.temp}°C</p>
            <p className="mb-1">
              Meteo: {weather.weather[0].description}
              {weather.weather[0].main === "Rain" ? " ☔" : ""}
            </p>
            <Link to="/details">
              <button className="btn btn-secondary btn-sm me-2">
                Vedi dettagli
              </button>
            </Link>
          </div>
        )}
        {(weather && weather.main) || (history && history.length > 0) ? (
          <div className="mt-2 d-flex gap-2 justify-content-center">
            {weather && weather.main && (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={onClearSearch}
              >
                Pulisci ricerca
              </button>
            )}
            {history && history.length > 0 && (
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={onClearHistory}
              >
                Pulisci cronologia
              </button>
            )}
          </div>
        ) : null}
        {forecast && forecast.list && (
          <div>
            <h3 className="fs-5">Prossimi giorni:</h3>
            <ul className="mb-2">
              {forecast.list.slice(0, 5).map((item, idx) => (
                <li key={idx} style={{ fontSize: "0.95em" }}>
                  {item.dt_txt}: {item.main.temp}°C,{" "}
                  {item.weather[0].description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
