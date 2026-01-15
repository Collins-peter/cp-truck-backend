import jwt from "jsonwebtoken";

const SECRET = "mysecretkey";

//MIDDLEWARE FUNCTION
const verifyToken = (req, res, next) => {
    const token = req.cookies?.userRegistered;

    if (!token) return res.status(401).json({message: "Access Denied!"});

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Invalid or Expired Token"});
        } else {
            console.log("decoded token", decoded);
        }
        req.user = decoded;

        next();
    });
}


export default verifyToken