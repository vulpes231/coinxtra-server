const express = require("express");
const { connectDB } = require("./configs/connectDB");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const { reqLogger, errorLogger } = require("./middlewares/logger");
const { corsOptions } = require("./configs/corsOptions");
require("dotenv").config();
const cors = require("cors");
const { verifyJWT } = require("./middlewares/verifyJWT");
const { allowedOrigins } = require("./configs/allowedOrigins");

const app = express();

// connectDB();
const PORT = process.env.PORT || 3000;

app.use(reqLogger);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// user endpoints with auth
app.use(verifyJWT);

app.use(errorLogger);

// mongoose.connection.once("connected", () => {
//   server.listen(PORT, () =>
//     console.log(`Server started on http://localhost:${PORT}`)
//   );
// });

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
