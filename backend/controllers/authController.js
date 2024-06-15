
const signup = async (req, res)=>{
    res.json({message: "You registered successfully"});
}

const login = async (req, res)=>{
    res.json({message: "Login successfully"});
}

const logout = async (req, res)=>{
    res.json({message: "Logout successfully"});
}

export { signup, login, logout }