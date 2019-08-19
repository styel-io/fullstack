const express = require("express");
const connectDB = require("./config/db");
const logger = require("morgan");
const app = express();
const path = require("path");

// Connect Database
connectDB();

// html 렌더링 설정
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static(path.join(__dirname, "public")));


// Init Middleware
app.use(express.json({ extended: false }));
app.use(logger("dev"));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/controllers", require("./routes/controllers/media"));
// 관리자 페이지
app.use("/admin", require("./routes/serve/admin"));
// 비즈니스 페이지



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
