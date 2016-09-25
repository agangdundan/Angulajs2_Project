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

categoryRouter.post("/savecategory", function(req, res, next){
    // console.log("cate data = ", req.body);
    var data = req.body;
    if(data.cate_id == "create"){
        category.saveCategory(data, function(id){
            res.json({
                status:true,
                id:id
            });
        }, function(errorMessage){
            console.log("error m : ", errorMessage);
            res.json({
                status:false,
                error:errorMessage
            });
        });
    }
});

export { categoryRouter }
