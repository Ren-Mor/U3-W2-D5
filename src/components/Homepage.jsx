import { Link } from "react-router-dom";

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
    <div
      className="container d-flex flex-column align-items-center"
      style={{ minHeight: "100vh", padding: 20 }}
    >
      <div
        className="row w-100 justify-content-center"
        style={{ marginTop: "40px" }}
      >
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 text-center">
          <h1 className="mb-4">Che città cerchiamo?</h1>
          <div className="input-group mb-3">
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
          style={{ marginTop: 20 }}
        >
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
            <h3>Ricerche recenti:</h3>
            <ul>
              {history.map((item, idx) => (
                <li key={idx}>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
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
          <h2>{weather.name}</h2>
          <p>Temperatura: {weather.main.temp}°C</p>
          <p>
            Meteo: {weather.weather[0].description}
            {weather.weather[0].main === "Rain" ? " ☔" : ""}
          </p>
          <Link to="/details">
            <button className="btn btn-secondary me-2">Vedi dettagli</button>
          </Link>
        </div>
      )}
      {weather && weather.main && (
        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-outline-danger" onClick={onClearSearch}>
            Pulisci ricerca
          </button>
          <button className="btn btn-outline-warning" onClick={onClearHistory}>
            Pulisci cronologia
          </button>
        </div>
      )}
      {forecast && forecast.list && (
        <div>
          <h3>Prossimi giorni:</h3>
          <ul>
            {forecast.list.slice(0, 5).map((item, idx) => (
              <li key={idx}>
                {item.dt_txt}: {item.main.temp}°C, {item.weather[0].description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Homepage;
