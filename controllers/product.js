
const Product=require("../models/product")
const formidable=require("formidable")
const _ =require("lodash")
const fs=require("fs")

exports.getproductbyid=(req,res,next,id)=>{
    Product.findById(id).populate("category").exec(error,product=>{
        if(error){
            return res.status(400).json({
                message:"Product didnt exist"
            })
        }

        req.product=product;
        next();
    })
}

exports.createProduct=(req,res)=>{
    let form= new formidable.IncomingForm();
    form.keepExtensions=true;

    form.parse(req,(errors,fields,file)=>{
        if(errors){
            return res.status(400).json({
                message:"Problem in Image"
            })
        }

        const{name,description,price,category,stock}=fields;

        if(!name|| !description|| !price|| !category|| !stock){
            return res.status(400).json({
                message:"Please enter all the necessary fields"
            })

        }

        let product=new Product(fields) //Fields will be passed by the user from frontend

        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    message:"File Size too big"
                })
            }
        }

        //Including file in product
        product.photo.data=fs.readFileSync(file.photo.filepath)
        product.photo.contentType =file.photo.mimetype

        product.save((error,product)=>{
            if(error){
                return res.status(400).json({
                    message:"Saving Tshirt in DB Failed"
                })
            }

            res.json(product)
        })
    })
}