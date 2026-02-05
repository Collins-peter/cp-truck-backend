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

//***ADMIN IMPORT*******/
import createPackage from "./controller/Admin Tracker/createPackage.mjs";
import adminTrackPackage from "./controller/Admin Tracker/adminTrackPackage.mjs";
import updateStatus from "./controller/Admin Tracker/updateStatus.mjs";

dotenv.config({path: "./.env"});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: process.env.CLIENT_API,
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


//****************ADMIN TRACKING API*********/
//SOCKET CONNECTION
io.on("connection", (socket) => {
    console.log("Client Connected:" , socket.id);
});

//ROUTERS
app.post("/admin/create-tracker", createPackage);
app.put("/admin/update-status", updateStatus);
app.get("/admin/track-package/:trackId", adminTrackPackage);

//MAKING io AVAILABLE GLOBALLY FOR CONTROLLER
global.io = io;


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
})
