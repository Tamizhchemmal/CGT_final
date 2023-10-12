import axios from "axios";
import App from "../App";
import { useEffect } from "react";
import { useState } from "react";

let baseURL = `http://127.0.0.1:8000/`;

class CrmService {
  login(body) {
    return axios.post(`${baseURL}api/crm/login`, body);
  }

  userLoggedIn() {
    // let status = localStorage.getItem("isUserLoggedIn");
    // console.log(status);
    // if (status) {
    //   this.setupAxiosInterceptors();
    // }
    //  TokenStorage();
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

  createStudentPymentDetails(body) {
    return axios.post(`${baseURL}api/crm/student/receivepayment/paid`, body);
  }

  createPymentDetails(body) {
    return axios.post(`${baseURL}api/crm/user/sentpayment/paid`, body);
  }

  deletePaymentDetails(body) {
    return axios.post(`${baseURL}api/crm/user/sentpayment/changestatus`, body);
  }

  //Logout

  logoutapi() {
    return axios.get(`${baseURL}api/crm/logout`);
  }

  deletestudentpaymentdetials(body) {
    return axios.post(
      `${baseURL}api/crm/student/receivepayment/changestatus`,
      body
    );
  }

  editPymentDetails(receiptId) {
    return axios.post(`${baseURL}api/crm/user/sentpayment/{receiptId}`);
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

  getinduvidualusers(userId) {
    return axios.get(`${baseURL}api/crm/user/${userId}`);
  }

  getmyreferrals() {
    return axios.get(`${baseURL}api/crm/user/getMyReferrals`);
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

  setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
      (config) => {
        config.headers.apitoken = localStorage.getItem("apitoken");
        console.log(config);
        return config;
      },
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );
  };
}

export default new CrmService();
