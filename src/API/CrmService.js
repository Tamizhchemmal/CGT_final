import axios from "axios";

class CrmService {
  login(body) {
    return axios.post(
      `https://92d4-2405-201-e002-409b-2622-ea7c-ee0d-c2e4.ngrok-free.app/api/crm/login`,
      body
    );
  }

  userLoggedIn() {
    let status = localStorage.getItem("isUserLoggedIn");
    if (status) {
      this.setupAxiosInterceptors();
    }
  }

  createBatch(body) {
    return axios.post(
      `https://92d4-2405-201-e002-409b-2622-ea7c-ee0d-c2e4.ngrok-free.app/api/crm/batch/create`,
      body
    );
  }

  createReferralOrTrainer(body) {
    return axios.post(
      `https://92d4-2405-201-e002-409b-2622-ea7c-ee0d-c2e4.ngrok-free.app/api/crm/user/add`,
      body
    );
  }

  getStudent() {
    return axios.get(
      `https://92d4-2405-201-e002-409b-2622-ea7c-ee0d-c2e4.ngrok-free.app/api/crm/course/list`
    );
  }

  createStudent(body) {
    return axios.post(
      `https://92d4-2405-201-e002-409b-2622-ea7c-ee0d-c2e4.ngrok-free.app/api/crm/students/add`,
      body
    );
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
