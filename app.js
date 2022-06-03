const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// *rename to match my router files
const projectsRouter = require("./routes/projects");
const studentsRouter = require("./routes/students");
const instructorsRouter = require("./routes/instructors");
const contactFormRouter = require("./routes/contact_form");
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// needed to make this folder static inorder to access the file in the browser using its name
app.use("/public/files", express.static("public/files"));

// *rename to match my router files
//adding /api to every route
app.use("/api/projects", projectsRouter);
app.use("/api/students", studentsRouter);
app.use("/api/instructors", instructorsRouter);
app.use('/api/users', usersRouter);

app.use('/api/auth', authRouter); 
app.use('/api/index', indexRouter);
app.use("/", contactFormRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get("env") === "development" ? err : {};

// 	// send the error page to client
// 	res.status(err.status || 500);
// 	res.send("error");
// });

app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
