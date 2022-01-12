import api from "./index";

class VerifyService {
  checkEmail(email) {
    return api.get("/auth/check", {
      params: {
        email: email
      }
    });
  }
  verifyUser(hash) {
    return api.post("/auth/verify",{ hash })
  }
}

export default new VerifyService();