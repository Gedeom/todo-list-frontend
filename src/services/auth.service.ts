import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8888/api/v1/auth/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  checkToken() {
    return axios
      .post(API_URL + 'checkToken', {}, {headers: authHeader()});
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(user) {
    return axios.post(API_URL + 'register', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}
export default new AuthService();