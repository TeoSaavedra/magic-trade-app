import http from "./index";

class VerifyService {
  checkmail(email) {
    return http.get("/auth/verify", {
      params: {
        email: email
      }
    });
  }
}

export default new VerifyService();