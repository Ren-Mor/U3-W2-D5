import { Link } from "react-router-dom";
import Footer from "./Footer";
// In questa pagina ho utilizzato le props
function Details({ weather, forecast }) {
  return (
    <div
      className="d-flex flex-column vh-100"
      style={{
        background:
          "linear-gradient(180deg, rgb(76, 109, 169) 0%,rgb(39, 64, 152) 100%)",
      }}
    >
      <div
        className="container"
        style={{
          padding: 25,
        }}
      >
        <div className="text-center" style={{ marginTop: 50 }}>
          <h2 className="text-white">Dettagli Meteo per {weather?.name}</h2>

          <h3 className="text-white mt-4">Oggi</h3>
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Temperatura</h5>
                  <p className="card-text">
                    {weather?.main?.temp}
                    °C
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Condizioni</h5>
                  <p className="card-text">
                    {weather?.weather?.[0]?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col col-md-6 col-lg-3 mb-3">
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Umidità</h5>
                  <p className="card-text">{weather?.main?.humidity}%</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">Vento</h5>
                  <p className="card-text">{weather?.wind?.speed} m/s</p>
                </div>
              </div>
            </div>
          </div>

          {forecast && forecast.list && forecast.list.length > 0 && (
            <div>
              <h3 className="text-white mt-4">Prossimi giorni</h3>
              <div className="row">
                {forecast.list
                  .filter((item) => {
                    const ora = new Date(item.dt * 1000).getHours();
                    return ora >= 12 && ora < 15;
                  })
                  .map((item, index) => {
                    const data = new Date(item.dt * 1000);
                    const giorni = [
                      "Domenica",
                      "Lunedì",
                      "Martedì",
                      "Mercoledì",
                      "Giovedì",
                      "Venerdì",
                      "Sabato",
                    ];
                    const giorno = giorni[data.getDay()];

                    return (
                      <div
                        className="col-12 col-md-6 col-lg-4 mb-3"
                        key={index}
                      >
                        <div className="card bg-dark text-white">
                          <div className="card-body">
                            <h5 className="card-title">{giorno}</h5>
                            <p className="card-text">
                              {item.main.temp}°C
                              <br />
                              {item.weather[0].description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          <Link to="/" className="btn btn-dark mt-4">
            Torna alla ricerca
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;
