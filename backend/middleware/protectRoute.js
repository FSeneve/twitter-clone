import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const protectRoute = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({error: "No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            res.status(401).json({error: "Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            res.status(404).json({error: "User not found"});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in proectRoute middleware " + error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export default protectRoute;