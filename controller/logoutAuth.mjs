const logout = (req, res) => {
    console.log(req.body);

    res.clearCookie ("userRegistered");
    return res.json({message: "Logout Successful"})
}

export default logout;