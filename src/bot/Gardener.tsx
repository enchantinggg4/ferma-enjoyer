import { observer, useLocalStore } from "mobx-react-lite";
import GardenFarmer from "../process/GardenFarmer";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { fertilizerOptions, getByValue, plantOptions } from "../process/data";
import cx from "classnames";

const App = () => {
  const farmer = useLocalStore(() => GardenFarmer);

  useEffect(() => {
    if (sessionStorage.getItem("session_bot") === "garden") {
      farmer.startBot();
      if (window.location.href.startsWith("https://vk.myfarm.mobi/main")) {
        window.location.href = "https://vk.myfarm.mobi/garden";
      }
    }
    return () => farmer.stopBot();
  }, []);

  return (
   <>
      <div className="row block">
        <Select
          onChange={(e) => {
            if (e) {
              farmer.config.whatWeWantToPlant = e.value;
              farmer.persist();
            }
          }}
          value={getByValue(plantOptions, farmer.config.whatWeWantToPlant)}
          options={plantOptions}
        />
      </div>

      <div className="row block">
        <Select
          onChange={(e) => {
            if (e) {
              farmer.config.fertNumber = e.value;
              farmer.persist();
            }
          }}
          value={getByValue(fertilizerOptions, farmer.config.fertNumber)}
          options={fertilizerOptions}
        />
      </div>

      <div className="row">
        <input
          id="doPlantNew"
          type="checkbox"
          checked={farmer.config.doPlantNew}
          onChange={(e) => {
            farmer.config.doPlantNew = e.target.checked;
            farmer.persist();
          }}
        />

        <label htmlFor="doPlantNew" className="text">
          Засаживать новые?
        </label>
      </div>

      <div className="row">
        <button onClick={() => farmer.startBot()}>Запустить бота</button>
        <button onClick={() => farmer.stopBot()}>Остановить бота</button>
      </div>

      <div className="row">
        <div
          className={cx(
            "status",
            farmer.isBotRunning ? "status-active" : "status-inactive",
          )}
        />

        <div className="text">
          {farmer.isBotRunning ? "Бот запущен" : "Бот выключен"}
        </div>

        {farmer.isDirty && <div className="text">Изменения не применены</div>}
      </div>
    </>
  );
};
export default observer(App);
