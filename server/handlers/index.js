
/*export const getUser = async(req, res)=>{
    try {
        const query = 'SELECT * FROM sample.productTitle LIMIT 1;'
        const [queryResult] = await pool.query(query);

        /*if (queryResult.length === 0) {
            console.log('No content found')
            res.json('No content found').status(204)
            return
}
      //  queryResult.phone_number = "0987654321"
        const jsonResponse = JSON.stringify(queryResult)
        res.send(jsonResponse);
    } catch (exception) {
        console.error('Error querying database:', exception);
        res.json({ success: false, message: 'Internal server error' }).status(500);
    }

}*/


import { pool } from "../database.config.js";

export const getProduct = async (req, res) => {
    const id = req.params.productId;
    const q = "SELECT * FROM product WHERE productId = ?";
    console.log(`Executing query: ${q} with id: ${id}`); 
    try {
        const [data] = await pool.query(q, [id]);
        console.log('Query result:', data); 
        return res.json({ data });
    } catch (err) {
        console.error('Error:', err); 
        return res.json({ error: err.sqlMessage });
    }
};

export const putProduct = async (req, res) => {
    const id = req.params.productId;
    const data = req.body;
    const q = `UPDATE product SET ${Object.keys(data).map(k => `${k} = ?`).join(", ")} WHERE productId = ?`;
    try {
        const [out] = await pool.query(q, [...Object.values(data), id]);
        return res.json({ data: out });
    } catch (err) {
        return res.json({ error: err.message });
    }
};



export const postProduct = async (req, res) => {
    const q = `INSERT INTO product (productId, productTitle, productDescription, productPrice, availableQuantity, productThumbnail)
               VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.productId,
        req.body.productTitle,
        req.body.productDescription,
        req.body.productPrice,
        req.body.availableQuantity,
        req.body.productThumbnail
    ];

    try {
        const [data] = await pool.query(q, values);
        return res.status(201).json({ data });
    } catch (err) {
        console.error('Error inserting product:', err);
        return res.status(500).json({ error: err.sqlMessage });
    }
};

export const deleteProduct = async (req, res) => {
    const id = req.params.productId;
    const q = `DELETE FROM product WHERE productId = ?`;
    try {
        const [data] = await pool.query(q, [id]);
        return res.json({ data });
    } catch (err) {
        return res.json({ error: err.sqlMessage });
    }
};

/*export const registerUser = async (req,res)=>
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
    }*/