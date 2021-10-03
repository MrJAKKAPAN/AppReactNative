import React, { useState } from "react";
export const AppStateContext = React.createContext();

export const AppStateProvider = (props) => {
  const [me, setMe] = useState("");
  const [token, setToken] = useState(null);
  const [badgeCartTab,setBadgeCartTab] = useState();
  const contextValues = { me, setMe, token, setToken, badgeCartTab,setBadgeCartTab};
  
  return (
    <AppStateContext.Provider value={contextValues}>
      {props.children}
    </AppStateContext.Provider>
  );
};
