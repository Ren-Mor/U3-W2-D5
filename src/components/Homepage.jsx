import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Slideshow from "./Slideshow";

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
            <h1 className="mb-3 text-white text-stroke">
              Che città cerchiamo?
            </h1>
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
                className="btn btn-dark rounded-end-pill"
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
            <h2 className="fs-4 text-white text-stroke">{weather.name}</h2>
            <p className="mb-1 text-white text-stroke">
              Temperatura: {weather.main.temp}°C
            </p>
            <p className="mb-1 text-white text-stroke">
              Meteo: {weather.weather[0].description}
              {weather.weather[0].main === "Rain" ? " ☔" : ""}
            </p>
            <div className="d-flex gap-2 justify-content-center mt-2">
              <Link to="/details">
                <button className="btn btn-dark btn-sm">Vedi dettagli</button>
              </Link>
              <button
                className="btn btn-dark btn-sm"
                onClick={onClearSearch}
                style={{ display: weather && weather.main ? "block" : "none" }}
              >
                Pulisci ricerca
              </button>
              <button
                className="btn btn-dark btn-sm"
                onClick={onClearHistory}
                style={{
                  display: history && history.length > 0 ? "block" : "none",
                }}
              >
                Pulisci cronologia
              </button>
            </div>
          </div>
        )}
        {forecast && forecast.list && (
          <div>
            <h3 className="fs-3 m-3 text-white text-stroke">
              Prossimi giorni:
            </h3>
            <ul className="mb-2">
              {forecast.list.slice(0, 5).map((item, idx) => (
                <li
                  key={idx}
                  style={{ fontSize: "0.95em" }}
                  className="text-white text-stroke"
                >
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
