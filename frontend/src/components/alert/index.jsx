import React, { useState, useEffect } from "react";

// dependencies
import "./styles.css";
import api from "../../services/api";

function Alert() {

  // default states
  const [title, setTitle] = useState("Cheat client is not running");
  const [message, setMessage] = useState("You wont be able to edit your config");
  const [alertCircleClasses, setAlertCircleClasses] = useState("alert-circle alert-circle-error");

  useEffect(() => {
    setInterval(async () => {
      try {

        // FIXME: request api responce only once or when needed
        const response = await api.get("/start");

        // if we get a valid PID it means that the game is opened and ready to receive requests from the cheat client
        if (response.data.gamePID > 0) {
          setAlertCircleClasses("alert-circle alert-circle-success");
          setTitle("Game client is running");
          setMessage("You can edit your config now");
        } 
        else { // the game is closed. the cheat will still work (send requests)
               // you will still be able to edit your configs, but you won't see those changes untill you open your game
          setAlertCircleClasses("alert-circle alert-circle-warning");
          setTitle("Game client is not running");
          setMessage("You won't be able to see your changes");
        }
      } 
      catch (e) { // if the website fails to get a response from the api, the website will assume that the cheat client is closed
        setAlertCircleClasses("alert-circle alert-circle-error");
        setTitle("Cheat client is not running");
        setMessage("You wont be able to edit your config");
      }
    }, 5000); // update status in every 5 seconds
  });

  return (
    <div className="alert" role="alert">
      <div className="pt-1 pl-1">
        <strong className="alert-heading" style={{ fontSize: 14 }}>{title}</strong>
        <div className="pt-3 d-flex flex-d align-items-center">
          <div className={alertCircleClasses}></div>
          <span className="ml-2" style={{ fontSize: 12 }}>
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Alert;
