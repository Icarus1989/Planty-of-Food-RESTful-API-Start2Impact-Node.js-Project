const api = require("./api");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
	res.json({
		message: "Welcome!",
	});
});

app.use("/api/v1", api);

app.listen(port, () => {
	console.log(`Listening: http://localhost:${port}`);
});

module.exports = app;
