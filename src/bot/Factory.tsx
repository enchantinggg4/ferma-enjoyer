import { observer, useLocalStore } from "mobx-react-lite";
import React, { useEffect } from "react";
import FactoryManager from "../process/FactoryManager";
import Select from "react-select";
import {
  factoryOptions,
  getByValue,
  paymentOptions,
  productionTypeOptions,
} from "../process/data";
import cx from "classnames";
const Factory = () => {
  const factory = useLocalStore(() => FactoryManager);

  useEffect(() => {
    if (sessionStorage.getItem("session_bot") === "factory") {
      factory.startBot();
      if (window.location.href.startsWith("https://vk.myfarm.mobi/main")) {
        window.location.href = "https://vk.myfarm.mobi/industry";
      }
    }
    return () => factory.stopBot();
  }, []);

  return (
    <>
      <div className="row block">
        <Select
          onChange={(e) => {
            if (e) {
              factory.config.factoryType = e.value;
              factory.persist();
            }
          }}
          value={getByValue(factoryOptions, factory.config.factoryType)}
          options={factoryOptions}
        />
      </div>

      <div className="row block">
        <Select
          onChange={(e) => {
            if (e) {
              factory.config.paymentSize = e.value;
              factory.persist();
            }
          }}
          value={getByValue(paymentOptions, factory.config.paymentSize)}
          options={paymentOptions}
        />
      </div>

      <div className="row block">
        <Select
          onChange={(e) => {
            if (e) {
              factory.config.productionType = e.value;
              factory.persist();
            }
          }}
          value={getByValue(
            productionTypeOptions,
            factory.config.productionType,
          )}
          options={productionTypeOptions}
        />
      </div>

      <div className="row">
        <button onClick={() => factory.startBot()}>Запустить бота</button>
        <button onClick={() => factory.stopBot()}>Остановить бота</button>
      </div>

      <div className="row">
        <div
          className={cx(
            "status",
            factory.isBotRunning ? "status-active" : "status-inactive",
          )}
        />

        <div className="text">
          {factory.isBotRunning ? "Бот запущен" : "Бот выключен"}
        </div>

        {factory.isDirty && <div className="text">Изменения не применены</div>}
      </div>
    </>
  );
};

export default observer(Factory);
