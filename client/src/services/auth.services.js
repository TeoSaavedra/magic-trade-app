import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "/signup", {
      username,
      email,
      password,
    });
  }

  checkmail(email) {
    return axios.get(API_URL + "auth/verify", { email })
    .then((response) => {
      return response.data;
    });
  }
}

export default new AuthService();