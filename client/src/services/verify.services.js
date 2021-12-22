import api from "./index";

class VerifyService {
  checkEmail(email) {
    return api.get("/auth/check", {
      params: {
        email: email
      }
    });
  }
}

export default new VerifyService();