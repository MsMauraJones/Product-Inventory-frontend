import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getDirectorBoard() {
    return axios.get(API_URL + 'director', { headers: authHeader() });
  }

  getDevOpsBoard() {
    return axios.get(API_URL + 'devops', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAllUsers(){
    return axios.get(API_URL + 'allusers', { headers: authHeader() });
  }

  getAllRoles(){
    return axios.get(API_URL + 'all-roles', { headers: authHeader() });
  }

  getUser(userId){
    return axios.get(API_URL + `users/${userId}`, { headers: authHeader() });
  }

  updateUser(userId, data){
    return axios.put(API_URL + `users/${userId}`, data, { headers: authHeader() })
  }

  deleteUser(userId){
    return axios.delete(API_URL + `users/${userId}`, { headers: authHeader() });
  }

  findByName(username){
    return axios.get(API_URL + `users/search/${username}`, { headers: authHeader() });

  }

}

export default new UserService();