import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors"

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors())

app.get('/',(req,res)=>{
    res.sendFile(path.resolve('index.html'));

});

app.post('/register',(req,res)=>
{
    try{
        const { fullName, username, email, phone, password, confirmPassword, gender, programmingLanguages } = req.body;

        let errors={};

        if(!fullName) errors.fullName="Full Name is required";
        if(!username) errors.username="Username is required";
        if(!email || !email.includes('@')) errors.email="A valid email is required";
        if(!phone || !/^\d{10}$/.test(phone)) errors.phone = "Phone number must be 10 digits";
        if(!password) errors.password="Password is required";
        if(password !== confirmPassword) errors.confirmPassword="Passwords does not match";
        if(!gender) errors.gender="Gender is required";
        if(!programmingLanguages) errors.programmingLanguages="Atleast one programming language is required";

        if(Object.keys(errors).length >0)
        {
            return res.status(400).json({success:false,errors});

        }
        res.status(200).json({success:true,message:"Registration successful"});
        

        }
        catch(error)
        {
            console.error("Error in registration form",error);
            res.status(500).json({success:false,message:'Internal server error'});

            
        }
    });

app.listen(5000,()=>console.log('Server running in port 5000'));
    
