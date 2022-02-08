import React, { useEffect } from "react";
import "./app.scss";
import { observer } from "mobx-react-lite";
import Gardener from "./bot/Gardener";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Factory from "./bot/Factory";

export default observer(() => {

  useEffect(() => {

  }, [])
  return (
    <div className="bot-wrapper">
      <Tabs defaultIndex={sessionStorage.getItem("session_bot") === 'factory' ? 1 : 0}>
        <TabList>
          <Tab>Огород</Tab>
          <Tab>Завод</Tab>
        </TabList>

        <TabPanel>
          <Gardener />
        </TabPanel>
        <TabPanel>
          <Factory />
        </TabPanel>
      </Tabs>
    </div>
  );
});
