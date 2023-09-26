import axios from "axios";

let baseURL = `https://4d29-2405-201-e002-409b-2c2b-32ff-940d-644.ngrok-free.app/`;

class CrmService {
  login(body) {
    return axios.post(`${baseURL}api/crm/login`, body);
  }

  userLoggedIn() {
    let status = localStorage.getItem("isUserLoggedIn");
    if (status) {
      this.setupAxiosInterceptors();
    }
  }

  createBatch(body) {
    return axios.post(`${baseURL}api/crm/batch/create`, body);
  }

  createReferralOrTrainer(body) {
    return axios.post(`${baseURL}api/crm/user/add`, body);
  }

  getStudent() {
    return axios.get(`${baseURL}api/crm/course/list`);
  }

  createStudent(body) {
    return axios.post(`${baseURL}api/crm/students/add`, body);
  }

  setupAxiosInterceptors() {
    let token = localStorage.getItem("apitoken");
    let content = "application/json";

    axios.interceptors.request.use((config) => {
      config.headers.apitoken = token;
      config.headers.contentType = content;
      return config;
    });
  }
}

export default new CrmService();
