import dataBase from "../DATABASE/database.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const SECRET = "mysecretkey";

const login = async(req, res) => {
    console.log(req.body);

    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json( {message: "Enter Credentials"})
    }

    dataBase.query("SELECT * FROM cp_truck_users WHERE username = ?",
        [userName],
        async(err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({message: "Database error"})
            }

            if (result.length === 0 || !await bcrypt.compare(password, result[0].password)) {
                return res.status(401).json({message: "Incorrect Username or Password!"})
            } else {
                //CREATING A TOKEN WITH JWT
                const token = jwt.sign({userID: result[0].userID, username: result[0].username},
                    SECRET,
                    { expiresIn: "1h" }
                );

                const cookieOption = {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                }

                res.cookie("userRegistered", token, cookieOption);

                return res.status(200).json({message: "Successfully LoggedIn"})
            }
        }
    )
}

export default login;