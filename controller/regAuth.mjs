import dataBase from "../DATABASE/database.mjs";
import bcrypt from "bcryptjs";


const register = async(req, res) => {
    console.log(req.body);
    const { userName, email, password, confirmPassword } = req.body;

    if (!userName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Please input all values!" });
    }

    dataBase.query("SELECT email FROM cp_truck_users WHERE email=?",
        [email], async(error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Database error" });
            }
            if (result.length > 0) {
                return res.status(409).json({ message: "Email already exists" });
            } 
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match!" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            dataBase.query("INSERT INTO cp_truck_users SET?",
                { username: userName,
                  email: email,
                  password: hashedPassword
                },
                (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: "Error registering user" });
                    }
                    return res.status(201).json({ message: "User registered successfully" });
                }
            )
        }
    )

}

export default register;

