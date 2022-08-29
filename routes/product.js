const express=require("express");
const router = express.Router();
const {getUserbyId}=require("../controllers/user")
const {isSignedIn,isAuthenticate,isAdmin} =require("../controllers/auth")
const {getproductbyid,createProduct}=require("../controllers/product")

router.param("myid",getUserbyId);
router.param("productid",getproductbyid);

router.post("/product/create/:myid",isSignedIn,isAuthenticate,isAdmin,createProduct)
module.exports=router;