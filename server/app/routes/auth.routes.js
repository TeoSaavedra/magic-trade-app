const controller = require("../controllers/auth.controller");
const verifySignUp = require("../middleware/verifysignup.middleware");

module.exports = function(app) {

    app.use (function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/auth/check", controller.checkEmail);

    app.post(
        "/api/auth/signup", 
        [
            verifySignUp.checkDuplicateEmail,
            verifySignUp.checkRolesExisted,
        ],
        controller.signup
    );

    // app.get("/api/auth/verify", controller.verify);
}