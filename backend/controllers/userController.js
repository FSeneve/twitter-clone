import User from "../models/user.model.js";

const getUserProfile = async (req, res)=>{
    try {
        const { username } = req.params;
        const user = await User.findOne({username}).select("-password");

        if(!user) {
            res.status(404).json({error: "User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in userController get profile: " + error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

const followUnfollowUser = (req, res)=>{
    try {
        
    } catch (error) {
        console.log("Error in followUnFollow controller " + error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

const getSuggestedUsers = (req, res)=>{
    res.send("getSuggestedUsers");
}

const updateUser = (req, res)=>{
    res.send("updated user");
}


export {
    getUserProfile,
    followUnfollowUser,
    getSuggestedUsers,
    updateUser
}