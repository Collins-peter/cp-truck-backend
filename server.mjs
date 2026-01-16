import express from "express";
import dataBase from "./DATABASE/database.mjs";
import dotenv, { config, configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import register from "./controller/regAuth.mjs";
import login from "./controller/loginAuth.mjs";
import logout from "./controller/logoutAuth.mjs";
import verifyToken from "./controller/middleWare.mjs";
import uploadImage from "./controller/uploadImage.mjs";
import path from "path";
import { fileURLToPath } from 'url';
import trackPackage from "./controller/trackPackage.mjs";

dotenv.config({path: "./.env"});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: "https://cp-truck.netlify.app",
    methods: ['GET', "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//ROUTE TO REGISTRATION
app.post("/register", register);

//ROUTE TO LOGIN
app.post("/login", login);

//ROUTE TO LOGOUT
app.post("/logout", logout);

//ROUTE TO TRACK PACKAGE
app.get("/api/track-package/:trackingNumber", trackPackage);

//PROTECTED ROUTE EXAMPLE
app.get("/protected", verifyToken, (req, res) => {
    res.json({message: "Access granted to protected data", user: req.user});
});

//ROUTE TO UPLOAD IMAGE
app.post("/upload-image", verifyToken, uploadImage);




const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
})
