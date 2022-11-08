const api = require("./api");
const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome!",
		GetAllOption1: "/api/v1/products-storage/",
		GetAllOption2: "/api/v1/users/",
		GetAllOption3: "/api/v1/orders-archieve/"
	});
});

app.use("/api/v1", api);

app.listen(port, () => {
	console.log(`Listening: http://localhost:${port}`);
});

module.exports = app;
