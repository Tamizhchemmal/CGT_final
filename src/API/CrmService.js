import axios from "axios";

class CrmService {
  // let baseURL = `https://56eb-2405-201-e002-409b-5f30-c547-5ad7-7e9e.ngrok-free.app`;

  login(body) {
    return axios.post(
      `https://56eb-2405-201-e002-409b-5f30-c547-5ad7-7e9e.ngrok-free.app/api/crm/login`,
      body
    );
  }

  userLoggedIn() {
    let status = localStorage.getItem("isUserLoggedIn");
    if (status) {
      this.setupAxiosInterceptors();
    }
  }

  createTrainerOrReferral(body) {
    return axios.post(
      `https://56eb-2405-201-e002-409b-5f30-c547-5ad7-7e9e.ngrok-free.app/api/crm/user/add`,
      body
    );
  }

  createStudent(body) {
    return axios.post(
      `https://56eb-2405-201-e002-409b-5f30-c547-5ad7-7e9e.ngrok-free.app/api/crm/students/add`,
      body
    );
  }

  setupAxiosInterceptors() {
    let token = localStorage.getItem("apitoken");

    axios.interceptors.request.use((config) => {
      config.headers.apitoken = token;
      return config;
    });
  }
}

export default new CrmService();
