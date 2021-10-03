import axios from "axios";
import config from "../config";
import * as SecureStore from 'expo-secure-store';

const load = (method, url, dataAPI) => {
  return axios({
    method: method,
    url: `${config.apiHost}${url}`,
    //headers:{ token},
    dataAPI: dataAPI,
  });
};

export default load;
