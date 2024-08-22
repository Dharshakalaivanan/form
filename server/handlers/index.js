import { pool } from "../database.config.js";

export const getUser = async(req, res)=>{
    try {
        const query = 'SELECT * FROM sample.users LIMIT 0;'
        const [queryResult] = await pool.query(query);

        if (queryResult.length === 0) {
            console.log('No content found')
            res.json('No content found').status(204)
            return
        }
        queryResult.phone_number = "0987654321"
        const jsonResponse = JSON.stringify(queryResult)
        res.send(jsonResponse);
    } catch (exception) {
        console.error('Error querying database:', exception);
        res.json({ success: false, message: 'Internal server error' }).status(500);
    }

}

export const registerUser = async (req,res)=>
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
    }