const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { default: mongoose, connect } = require("mongoose");
const userRouter = require("./routes/user.routes");
const cors = require("cors");
const cookieParsesr = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParsesr());

app.use("/api/v1/user", userRouter);


async function RunServer(){
    await mongoose
            .connect(process.env.DB_CONNECT)
            .then(() => {
                console.log("Connected to DB");
                app.listen( process.env.PORT, () => {console.log(`Server Running on ${process.env.PORT}`)});
            })
            .catch( err => console.log(err));
}

RunServer();