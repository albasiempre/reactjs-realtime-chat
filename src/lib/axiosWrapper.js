import axios from 'axios';

class AxiosWrapper {

  static create() {
    return axios.create({
      baseURL: "https://node-app-separated-187489b363c3.herokuapp.com"
    })
  }
}

export default AxiosWrapper;