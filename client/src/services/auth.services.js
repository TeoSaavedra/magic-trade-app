import api from "./index";

class AuthService {
  login(username, password) {
    return api
      .post("signin", { username, password })
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

  register(userData) {
    const {firstname,lastname,email,password} = userData
    return api.post("/auth/signup", {
      firstname,
      lastname,
      email,
      password,
    })
  }
}

export default new AuthService();