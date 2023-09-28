import axios from "axios";

let baseURL = ``;

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

    axios.interceptors.request.use((config) => {
      config.headers.apitoken = token;
      console.log(config.headers);
      return config;
    });
  }
}

export default new CrmService();
