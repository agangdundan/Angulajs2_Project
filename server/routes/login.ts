import { Router, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2 } from "crypto";
import { sign } from "jsonwebtoken";
import { secret, length } from "../config";

let lnPermission = require("../library/lnpermission");
let logins = require("../library/db.login");

const loginRouter: Router = Router();

const user = {
    hashedPassword: "97fe86e10b558f6b0de6b20a4f22fae853bcce13723451999327976a2ca6fa4e7bb554c1cc0f262f8b0caa31ca967761" +
    "a5d283aa140e0b1388dbbcb42d58a07576564eb32cdf9e090820f17b5595a9c50f53b584089cbef4788c088e7fc6181080ec7" +
    "310b08edd3964d1a031aa1730b9d6a5ab91efea70e16350dd92d3f6c69e",
    salt: "joH3RgPYTAgRy/+cBbQGwy26fZE/fmzbmw2/v/DLoJWvF8QAUuzvFFTp9xcvh9BBoxB0E1E6e7bL/Gc4s+aYHCrLwYebXLMx0" +
    "P/VRWTPqvoUe7T1JrzCBdLK5yDvb5Vl2H5oB8hCe/Gb6fLP3/fQM7CKsAQJHJYwq8aj1N7ssjI=",
    username: "john"
};

loginRouter.post("/signup", function (request: Request, response: Response, next: NextFunction) {
    if (!request.body.hasOwnProperty("password")) {
        let err = new Error("No password");
        return next(err);
    }

    const salt = randomBytes(128).toString("base64");

    pbkdf2(request.body.password, salt, 10000, length, function (err, hash) {
        response.json({
            hashed: hash.toString("hex"),
            salt: salt
        });
    });
});

// login method
loginRouter.post("/", function (request: Request, response: Response, next: NextFunction) {

    pbkdf2(request.body.password, user.salt, 10000, length, function (err, hash) {
        if (err) {
            console.log(err);
        }

        // check if password is active
        if (hash.toString("hex") === user.hashedPassword) {

            const token = sign({"user": user.username, permissions: []}, secret, { expiresIn: "7d" });
            response.json({"jwt": token});

        } else {
            response.json({message: "Wrong password"});
        }

    });
});

loginRouter.get('/checkLogin', function(req, res, next) {
    let resStatus = false;
    let resData = {};
    if(lnPermission.isLogin(req)){
        resStatus = true;
    }else {
        //console.log("Go to Login");
    }
    res.json({
        "status": resStatus,
        "data": resData
    });
});

loginRouter.get('/login', function(req, res, next){
    //console.log("get login res = ");
    lnPermission.clearToken(res);
    res.json({
        "status": true,
        "data": "set0"
    });
});

loginRouter.post("/login", function(req,res,next){
    // console.log("Post login data = ", req.body);
    let user = req.body.user;
    let password  = req.body.password;

    logins.checkLogin(user, password, function(login){
        // console.log("login base data = ", login);
        lnPermission.writeToken(res, login[0]._id);
        res.json({
            data:login,
            status:true
        });
    }, function(errorMessage){
        console.log("errorMessage = ", errorMessage);
        res.json({
            status:false,
            error: errorMessage
        });
    });
});

loginRouter.post("/updatestaff", function(req, res, next){
  let reqdata = {
    name: req.body.name,
    user: req.body.user,
    id: req.body.id,
    password: req.body.password
  }

  logins.updateStaff(reqdata, function(logingData){
    res.json({
        data:logingData,
        status:true
    });
  }, function(errorMessage){
    console.log("errorMessage = ", errorMessage);
    res.json({
        status:false,
        error: errorMessage
    });
  });

});

export { loginRouter }
