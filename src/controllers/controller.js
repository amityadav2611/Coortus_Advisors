const {todoModel} = require('../models/model')
const jwt = require('jsonwebtoken')

const loginTodo = async (req, res) => {
    try{
        let data = req.body;
        const {Email, Password} = data

        //check data is present or not
        if(Object.keys(data).length == 0) return res.status(401).send({status: false, message: "Email and Password is required for login"})

        //check email or password is present in body or not
        if(!data.Email) return res.status(401).send({status: false, message: "Email field is empty"})
        if(!data.Password) return res.status(401).send({status: false, message: "Password field is empty"})


        //check email and password is corrrect or not
        let getUserData = await todoModel.findOne({Email: data.Email, Password: data.Password})
        //if(!getUserData) return res.status(400).send({status: false, message: "Email or password is invalid"})


        if(getUserData){
            
        //generate token
        let token = jwt.sign({ userId: getUserData._id }, "createtodoapp", {expiresIn: '30m'});

        //assign the userdId in a variable
       // let userData = getEmailData._doc
       //let userData = getUserData

        //set the headers
        res.status(200).setHeader("x-api-key", token);

        res.status(200).send({status: true, message: "Logged in successfully", Token: token})
        }else{
            res.status(400).send({status: false, message: "user does not signin"})
        }
        
    }catch(err){
        res.status(501).send({status: false, Error: err.message})
    }
}

const createTodo = async (req, res) =>{
    try{
        let data = req.body;

        if(!data) return res.status(400).send({status: false, message: "Enter the Todo Title"})

        let todoData = await todoModel.create(data)
        
        res.status(201).send({status: true, message: "Success",data:todoData})
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

const updateTodo = async (req, res) => {
    try{
        const todoId = req.params.id;
        if (!todoId) return res.status(400).send({status: false,message: "todoId not Exist"})

        let searchTodo = await todoModel.findOne({_id: todoId})
        if (!searchTodo) return res.status(404).send({status: false,message: `Todo Item does not exist by this ${todoId}.`})

        if(searchTodo.isDeleted == true) return res.status(404).send({status: false, message: "Data is deleted you cant updated now"})


        const data = req.body
        let changeDetails = await todoModel.findOneAndUpdate({_id: todoId}, { Title: data.Title, date: new Date() }, {new: true})
        res.status(200).send({status: true, message: "updated", data: changeDetails})

    }catch(err){
        res.status(500).send({status: false, Error:err.message})
    }
}

const getTodo = async(req, res) => {
    try{

        const {page,limit, fromDate, toDate} = req.query


        const todoList = await todoModel.find({isDeleted: false, createdAt: {$gte: `${fromDate}T00:00:00Z`, $lte: `${toDate}T00:00:00Z`}}).select({_id:0, Email: 0, Password: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 }).skip(limit * (page - 1)).limit(limit);



        if(todoList.length == 0) return res.status(404).send({status: false, msg:"No page Found"})
        res.status(200).send({status: true, data:todoList})


    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

const deleteTodo = async (req, res) =>{
    try{
        let todoId = req.params.id; //collect the data from params 
    
          let findTodo = await todoModel.findById(todoId);
          if (!findTodo) return res.status(404).send({ status: false, message: "Invalid todoid" }) 
  
          if (findTodo.isDeleted == false) {
               let updatedTodo = await todoModel.findOneAndUpdate({ _id: findTodo._id }, { isDeleted: true}, { new: true });
               if(!updatedTodo) return res.status(404).send({ status: false, message: "deleted failed"})
               res.status(200).send({status: false, message: "Deleted",updatedTodo})
           }else{
            return res.status(400).send({status: false, message:"Already Deleted"})
        }
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

module.exports = {loginTodo, createTodo,updateTodo, getTodo, deleteTodo}