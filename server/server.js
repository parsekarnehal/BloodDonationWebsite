const express = require("express");
const adminRoute = require("./routes/adminRoute");
const authorityRoute = require("./routes/authorityRoute");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/admin", adminRoute);
app.use("/authority", authorityRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server started at port ${PORT}, client at 3000`)
);
