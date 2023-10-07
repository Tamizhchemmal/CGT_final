import axios from "axios";

let baseURL = `http://127.0.0.1:8000/`;

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
  //Create ApI
  createStudent(body) {
    return axios.post(`${baseURL}api/crm/students/add`, body);
  }
  editTrainer(body) {
    return axios.post(`${baseURL}api/crm/user/add`, body);
  }
  createBatch(body) {
    return axios.post(`${baseURL}api/crm/batch/create`, body);
  }

  createReferralOrTrainer(body) {
    return axios.post(`${baseURL}api/crm/user/add`, body);
  }

  editstudent(body) {
    return axios.post(`${baseURL}api/crm/students/update`, body);
  }
  getbatch() {
    return axios.get(`${baseURL}api/crm/batch/list`);
  }

  getCourse() {
    return axios.get(`${baseURL}api/crm/course/list`);
  }
  getReferalList() {
    return axios.get(`${baseURL}api/crm/user/getReferralLists`);
  }
  getTrainerList() {
    return axios.get(`${baseURL}api/crm/user/getTrainerLists`);
  }

  getStudentList() {
    return axios.get(`${baseURL}api/crm/students/list`);
  }

  getPaymentmode() {
    return axios.get(`${baseURL}api/crm/paymentmethod/list`);
  }

  getinduvidualusers(referralId) {
    return axios.get(`${baseURL}api/crm/user/${referralId}`);
  }

  // Delete Data

  deleteBatch(body) {
    return axios.post(`${baseURL}api/crm/batch/changeStatus`, body);
  }
  deleteReferral(body) {
    return axios.post(`${baseURL}api/crm/user/changeStatus`, body);
  }
  deleteStudent(body) {
    return axios.post(`${baseURL}api/crm/student/changeStatus`, body);
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
