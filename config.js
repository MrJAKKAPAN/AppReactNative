////////  game --->  connect url (28 - 4 - 64)////////
import { Platform } from "react-native";

module.exports = (() => {
  if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_STAGING
      ? {
          // plot function
          apiHost: "https://asia-east2-kslproject.cloudfunctions.net/api/v1",
          lineClientId: "1655547650",
          lineClientSecret: "3e7bb1f596191d03828a7a530da40a75",
        }
      : {
          // plot function
          apiHost: "https://asia-east2-kslproject.cloudfunctions.net/api/v1",
          lineClientId: "1655547650",
          lineClientSecret: "3e7bb1f596191d03828a7a530da40a75",
        };
  }
  // Default config
  return {
    apiHost: 'http://localhost:5001/kslproject/asia-east2/api/v1',
    lineClientId: "1655547650",
    lineClientSecret: "3e7bb1f596191d03828a7a530da40a75",
    redirectUrl: "http://localhost:3000/member",
  };
})();
