import { Link } from "react-router-dom";
import Footer from "./Footer";

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
  return (
    <div className="d-flex flex-column min-vh-100">
      <div
        className="container d-flex flex-column align-items-center flex-grow-1"
        style={{ padding: 10 }}
      >
        <div
          className="row w-100 justify-content-center"
          style={{ marginTop: "20px" }}
        >
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 text-center">
            <h1 className="mb-3">Che città cerchiamo?</h1>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Cerca una città"
                value={city}
                onChange={onCityChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSearch();
                  }
                }}
              />
              <button
                className="btn btn-primary rounded-end-pill"
                onClick={onSearch}
              >
                Cerca
              </button>
            </div>
          </div>
        </div>

        {/* Cronologia ricerche */}
        {history && history.length > 0 && (
          <div
            className="row w-100 justify-content-center"
            style={{ marginTop: 10 }}
          >
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
              <h3 className="fs-5">Ricerche recenti:</h3>
              <ul className="mb-2">
                {history.map((item, idx) => (
                  <li key={idx} style={{ display: "inline", marginRight: 8 }}>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "blue",
                        cursor: "pointer",
                        textDecoration: "underline",
                        padding: 0,
                      }}
                      onClick={() => {
                        setCity(item);
                        setTimeout(() => onSearchHistory(), 0);
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {weather && weather.main && (
          <div>
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
        {weather && weather.main && (
          <div className="mt-2 d-flex gap-2 justify-content-center">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={onClearSearch}
            >
              Pulisci ricerca
            </button>
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={onClearHistory}
            >
              Pulisci cronologia
            </button>
          </div>
        )}
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
