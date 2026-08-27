import type {Request,Response,NextFunction} from "express";
import { clerkMiddleware, clerkClient, getAuth } from '@clerk/express'
import { User } from "../models/User";
import {requireAuth} from "@clerk/express";

export type AuthRequest=Request & {userId?:string};
export const protectedRoute=[
    requireAuth(),
    
    async (req:AuthRequest,res:Response,next:NextFunction)=>{
        try{
            const {userId:clerkId} = getAuth(req);
            if(!clerkId) return res.status(401).json({message:"Unauthorized-invalid token"});

            const user=await User.findOne({clerkId});

            if(!user) return res.status(404).json({message:"user not found"});

            req.userId=user._id.toString();
            next();

        }
        catch(error){

            console.error("Error in protectedRoute middleware:", error);
            res.status(500).json({message:"Internal server error"});

        }
    }
]