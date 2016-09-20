import { Router, Request, Response, NextFunction } from "express";
var category = require("../library/db.category");

const categoryRouter: Router = Router();

categoryRouter.post("/category_list", function(req, res, next) {
    //console.log(" รับ cate = ", req.body);
    category.getCategoryList(function(cate){
        res.json({
            data:cate,
            status:true
        });
    }, function(errorMessage){
        console.log("errorMessage = ", errorMessage);
        res.json({
            status:false,
            error: errorMessage
        });
    });
    // res.json({
    //     data: "ส่งcate กลับไป",
    //     status: true
    // });
});

export { categoryRouter }
