import express,{Request, Response} from 'express'
import {z} from 'zod'
import {signUpInput} from 'common/src/index'
import { User } from '../db/index'
import jwt from 'jsonwebtoken'

const router =express.Router()

const SECRET ='SeCrEt'

router.post('/signup',async(req:Request,res:Response) => {
    try{
    const parsedInput= signUpInput.safeParse(req.body);
    if(!parsedInput.success){
        res.status(403).json({msg:"Invalid Input"})
        return;
    }

    const username = parsedInput.data.username
    const password = parsedInput.data.password

    const user= await User.findOne({username:parsedInput.data.username})
    if(user){
        res.status(403).json({msg:"Username already exists"})
    }
    else{
        const newUser= new User({username,password})
        newUser.save()
        const token = jwt.sign({username:newUser.username},SECRET,{expiresIn:'1h'})
        res.json({message:"User created successfully",token})
    }
}
catch(err){
    res.status(500).json({msg:"Server Error"})
}
})

export default router;