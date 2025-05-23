import { Link } from "react-router-dom";
import Footer from "./Footer";
import Slideshow from "./Slideshow"; // <-- importa lo slideshow

function Details({ weather }) {
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
            background: "rgba(0,0,0,0.35)",
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
            <Link to="/" className="btn btn-primary mt-3">
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
        style={{ padding: 20, position: "relative", zIndex: 2 }}
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
      <Footer />
    </div>
  );
}

export default Details;
