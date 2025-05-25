import { Link } from "react-router-dom";
import Footer from "./Footer";
// In questa pagina ho utilizzato le props
function Homepage({ city, onCityChange, onSearch, weather, onClearSearch }) {
  const hasWeather = weather && weather.main;

  return (
    <div
      className="d-flex flex-column vh-100"
      style={{
        background:
          "linear-gradient(180deg,rgb(76, 109, 169) 0%,rgb(39, 64, 152) 100%)",
      }}
    >
      <div className="container d-flex flex-column align-items-center">
        <div className="row w-75 justify-content-center mt-4">
          <div className="col-12 col-md-6 col-lg-4 text-center">
            <h1 className="mb-3 text-white">Che tempo farà?</h1>

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Cerca una città"
                value={city}
                onChange={onCityChange}
              />
              <button
                className="btn btn-dark rounded-end-pill"
                onClick={onSearch}
              >
                Cerca
              </button>
            </div>
          </div>
        </div>

        {hasWeather && (
          <div>
            <div className="row justify-content-center mb-4">
              <div className="col-12 col-md-6 col-lg-6 mb-3">
                <div className="card bg-dark text-white h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title">Città</h5>
                    <p className="card-text">{weather.name}</p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-6 mb-3">
                <div className="card bg-dark text-white h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title">Temperatura</h5>
                    <p className="card-text">{weather.main.temp}°C</p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-6 mb-3">
                <div className="card bg-dark text-white h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title">Meteo</h5>
                    <p className="card-text">
                      {weather.weather[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {hasWeather && (
          <div className="d-flex justify-content-center mt-5 mb-5">
            <div className="d-flex flex-wrap gap-4 justify-content-center">
              <Link to="/details">
                <button className="btn btn-dark btn-sm">Mostra dettagli</button>
              </Link>
              <button className="btn btn-dark btn-sm" onClick={onClearSearch}>
                Pulisci ricerca
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
