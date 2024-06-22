import generateTokenAndSetCookie from '../lib/generateTokenAndSetCookie.js';
import User from '../models/user.model.js';
import bcryt from 'bcryptjs';


const signup = async (req, res)=>{

    try {
            const {username, fullName, email, password} = req.body;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }

            const existingUser = await User.findOne({username});

            if(existingUser){
                return res.status(400).json({error: "Username already in use"});
            }

            const existingEmail = await User.findOne({email});

            if(existingEmail){
                return res.status(400).json({error: "Email already in use"});
            }

            if(password.length < 6){
                return res.status(400).json({error: "Password must be at least 6 characters long"});
            }

            const salt = await bcryt.genSalt(10);
            const hashedPassword = await bcryt.hash(password, salt);

            const newUser = new User({
                username,
                fullName,
                email,
                password: hashedPassword
            });

            if(newUser){
                generateTokenAndSetCookie(newUser._id, res);
                await newUser.save();

                res.status(201).json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    email: newUser.email,
                    followers: newUser.followers,
                    following: newUser.following,
                    profileImg: newUser.profileImg,
                    coverImg: newUser.coverImg,
                });

            }else{
                res.status(400).json({error: "Invalid user data"});
            }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({error: "Internal server error"});
    }

}

const login = async (req, res)=>{
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcryt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			followers: user.followers,
			following: user.following,
			profileImg: user.profileImg,
			coverImg: user.coverImg,
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

const logout = async (req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller " + error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

const getMe = async (req, res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in controller get user " + error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export { signup, login, logout, getMe }