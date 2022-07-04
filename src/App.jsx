import { useState } from "react";
import { useEffect } from "react";
import Contrys from "./components/Contrys";
import "./App.css";
import axios from "axios";

function App() {

  const [data, setData] = useState({});
  const [background, setBackground] = useState("");
  const [temperatureUnit, setTemperatureUnit] = useState(0);
  const [country, setCountry] = useState(data.sys?.country);
  const [isNameUnit, setIsNameUnit] = useState(true);
  const [isUnit, setIsUnit] = useState("°C");
  let icon = data.weather?.[0].icon;
  
  // Conexion API
  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const crd = pos.coords;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8e471d31ab7b8f00b925f222855d0f27`
        )
        .then((res) => {

          setData(res.data);
          //Conversion a °C
          setTemperatureUnit(Math.round(res.data.main?.temp - 273.15));
          //extración código Ciudad
          setCountry(data.sys?.country)
        })
        .catch((error) => console.log(error));
    };
    // ejecución metodo de  localización
    navigator.geolocation.getCurrentPosition(success);
     
    // llamado Función de Background
    changeBackground(icon);

  }, [icon]);

  // console.log(data);

  // Función  para conversion de temperatura a °F y °C segun solicitud de Button/ cambio Button
  const changeUnit = () => {
    if (isNameUnit) {
      setTemperatureUnit(Math.round((temperatureUnit * 9) / 5 + 32));

      setIsNameUnit(false);

      setIsUnit("°C");
    } else {
      setTemperatureUnit(Math.round(((temperatureUnit - 32) * 5) / 9));

      setIsNameUnit(true);
      setIsUnit("°F");
    }
  };

  // Función cambio Background
  const changeBackground = (icon) => {

    if (icon) {
      icon = parseInt(icon.slice(0, 2));
    }

    if (icon === 1) {
      setBackground("https://i.ibb.co/kX3NhF6/IMG-2868-2-2.jpg");
    }

    if (icon >= 2 && icon <= 4) {
      setBackground("https://i.ibb.co/ZhQ7HkD/IMG-20220108-063442273.jpg");
    }

    if (icon >= 9 && icon <= 11) {
      setBackground("https://i.ibb.co/wpNqx7Q/IMG-2638-1.jpg");
    }

    if (icon >= 13) {
      setBackground("https://i.ibb.co/BLbJNh3/ST4-AWRWH45-GSBPY3-WASCBKOWMA.jpg");
      
    }
  };


  document.body.style = `background: url(${background}) no-repeat center center fixed;
                           background-size: cover;`;

  return (
    <div className="App">

     <div className="title">
     
      <h1>Weather App</h1>

      </div>
      <div className="icono">
        <h4>{data.weather?.[0].description}</h4>

        <img
          src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`}
          alt=""
        />
      </div>

      <div className="Wheather">
        <h2 className="city">{data.name},</h2>
   
        {/* // llamado componente*/}

        <Contrys country={country} /> 
        <h3>
          <i className="fa-solid fa-droplet"> </i> &nbsp; &nbsp;
          {data.main?.humidity}% humedad
        </h3>

        <h3>
          {" "}
          <i className="fa-solid fa-earth-americas "> </i> &nbsp; &nbsp;
          {data.main?.pressure} mb Pressure
        </h3>
      </div>
      <div className="temp">
        <h2 className="temperature">
          {temperatureUnit}&nbsp;
          {isNameUnit ? "°C" : "°F"}
        </h2>
        <button onClick={changeUnit}>Degrees {isUnit}</button>
      </div>
    </div>
  );
}

export default App;
