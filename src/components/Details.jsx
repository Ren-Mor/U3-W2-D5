import { Link } from "react-router-dom";
import Footer from "./Footer";
import Slideshow from "./Slideshow";

function Details({ weather, forecast }) {
  // Mostro un messaggio se non ci sono dati meteo
  if (!weather || !weather.main) {
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
          style={{ padding: 20, position: "relative", zIndex: 2 }}
        >
          <div
            className="col-12 col-sm-10 col-md-8 col-lg-6 text-center"
            style={{ marginTop: "40px" }}
          >
            <p>Nessuna città selezionata.</p>
            <Link to="/" className="btn btn-dark mt-3">
              Torna alla ricerca
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <Slideshow />
      {/* Overlay scuro */}
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
        style={{ padding: 20, position: "relative", zIndex: 2 }}
      >
        <div
          className="col-12 col-md-10 col-lg-8 text-center"
          style={{ marginTop: "40px" }}
        >
          <h2 className="mb-4 text-white text-stroke">
            Dettagli Meteo per {weather.name}
          </h2>

          {/* Sezione meteo di oggi */}
          <h3 className="fs-4 mb-3 text-white text-stroke">Oggi</h3>
          <div className="row g-3 justify-content-center mb-4">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card bg-dark text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Temperatura</h5>
                  <p className="card-text">{weather.main.temp}°C</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card bg-dark text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Meteo</h5>
                  <p className="card-text">{weather.weather[0].description}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card bg-dark text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Umidità</h5>
                  <p className="card-text">{weather.main.humidity}%</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card bg-dark text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Vento</h5>
                  <p className="card-text">{weather.wind.speed} m/s</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sezione meteo per i prossimi giorni */}
          {forecast && forecast.list && (
            <div>
              <h3 className="fs-4 mb-3 text-white text-stroke">
                Prossimi giorni
              </h3>
              <div className="row g-3 mb-4">
                {Object.entries(
                  forecast.list.reduce((acc, item) => {
                    // Estraggo la data
                    const date = item.dt_txt.split(" ")[0];

                    // Inizializzo l'accumulatore per questo giorno se non esiste
                    if (!acc[date]) {
                      acc[date] = {
                        temps: [],
                        descriptions: [],
                        hasRain: false,
                        date: date,
                        preview: item,
                      };
                    }

                    // Temperatura e descrizione all'accumulatore
                    acc[date].temps.push(item.main.temp);
                    acc[date].descriptions.push(item.weather[0].description);

                    // Controllo se piove
                    if (item.weather[0].main === "Rain") {
                      acc[date].hasRain = true;
                    }

                    return acc;
                  }, {})
                )
                  // Escludo il giorno corrente
                  .filter((_, index) => index > 0)
                  .map(([dateStr, dayData], idx) => {
                    // Calcolo la temperatura media
                    const avgTemp =
                      dayData.temps.reduce((sum, temp) => sum + temp, 0) /
                      dayData.temps.length;

                    // Rendo la data leggibile
                    const date = new Date(dateStr);
                    const formattedDate = date.toLocaleDateString("it-IT", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    });

                    // Card per ogni giorno
                    return (
                      <div className="col-12 col-md-6 col-lg-4" key={idx}>
                        <div className="card bg-dark text-white h-100">
                          <div className="card-body">
                            <h5
                              className="card-title"
                              style={{ fontSize: "1em" }}
                            >
                              {formattedDate}
                            </h5>
                            <p
                              className="card-text"
                              style={{ fontSize: "0.9rem" }}
                            >
                              <strong>Temp media:</strong> {avgTemp.toFixed(1)}
                              °C
                              <br />
                              {dayData.preview.weather[0].description}
                              {/* Icona ombrello se è prevista pioggia */}
                              {dayData.hasRain ? " ☔" : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          <Link to="/" className="btn btn-dark mt-3">
            Torna alla ricerca
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;
