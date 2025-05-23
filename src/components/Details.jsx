import { Link } from "react-router-dom";

function Details({ weather }) {
  if (!weather || !weather.main) {
    return (
      <div
        className="container d-flex flex-column align-items-center"
        style={{ minHeight: "100vh", padding: 20 }}
      >
        <div
          className="col-12 col-sm-10 col-md-8 col-lg-6 text-center"
          style={{ marginTop: "40px" }}
        >
          <p>Nessuna città selezionata.</p>
          <Link to="/" className="btn btn-primary mt-3">
            Torna alla ricerca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{ minHeight: "100vh", padding: 20 }}
    >
      <div
        className="col-12 col-sm-10 col-md-8 col-lg-6 text-center"
        style={{ marginTop: "40px" }}
      >
        <h2 className="mb-4">Dettagli Meteo per {weather.name}</h2>
        <p>Temperatura: {weather.main.temp}°C</p>
        <p>Meteo: {weather.weather[0].description}</p>
        <p>Umidità: {weather.main.humidity}%</p>
        <p>Vento: {weather.wind.speed} m/s</p>
        <Link to="/" className="btn btn-primary mt-3">
          Torna alla ricerca
        </Link>
      </div>
    </div>
  );
}

export default Details;
