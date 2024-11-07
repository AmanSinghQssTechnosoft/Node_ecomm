import { createUser} from '../models/userModel.js';
export const registerController=async(req,res)=>{
   try{
       const {name,email,password,address,city,country}=req.body;
       if(!name||!email||!password || !city || !address || !country){
         return res.status(500).send({
            success:false,
            message:"Please Provide All Fields"
         });
       }

       const existingUser=await createUser.findOne({email});
       if(existingUser){
        return res.status(500).send({
            success:false,
            message:"email is  already taken",
        });
       }

      const user=await createUser.create({
        name,email,password,address,city,country,
      });
      res.status(201).send({
        success:true,
        message:'registration success please login',
      })
    }
   catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error In Register API',
        error
    })
   }
};

export const loginController=async(req,res)=>{
    try{
       const {email,password}=req.body
       if(!email || !password){
        return res.status(500).send({
            success:false,
            message:'please Add email or password'
        })
       }
       const user=await createUser.findOne({email});
       if(!user){
        return res.status(404).send({
            success:false,
            message:'user not found'
        })
       }
       

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:"false",
            message:"Error in login api"
        })
    }
}