import User from "../model/User.js";
import bcryptjs from 'bcryptjs'
import createToken from '../utils/createToken.js';


const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({success:false,error:"Missing fields!"})
    }
    try {
        const existing = await User.findOne({email});
        if (existing) {
            return res.status(400).json({ success: false, error: "User email is already in use!" })
        }
        let cartData = [];
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = new User({ email, name, password:hashedPassword, cartData });
        const token=createToken(user._id);
        await user.save();
        res.status(200).json({success:true,token})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}

const login = async (req,res)=>{
    const {email, password}=req.body;
    if(!email||!password){
        return res.status(400).json({error:"Missing fields"})
    }
    const user = await User.findOne({email});
    if(user){
        const isPasswordValid= await bcryptjs.compare(password,user.password);
        if(isPasswordValid){
           const token = createToken(user._id);
           res.status(200).json({success:true,token});
        }else{
            res.status(400).json({success:false,error:"Invalid credentials"});
        }
    }else{
        res.status(400).json({success:false,error:"User is not registered"});
    }
}

export { signup,login }