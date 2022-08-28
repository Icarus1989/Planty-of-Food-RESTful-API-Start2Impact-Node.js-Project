// Working

if (query.filter && query.value == undefined) {
	res.status(404).json({
		message: "Need a &value=parameter for search..."
	});
	// orderManager.missParam("&value=");
} else if ((query.filter && query.value) || query.order) {
	// let mapped;
	await orderManager.determinate();
	await orderManager.ordering();

	// // async function determinate(filter, value) {
	switch (query.filter) {
		case "productname":
			mapped = await savedOrders.map((elem) => {
				return elem["users"][0]["products"];
			});
			// (async function () {
			for await (let elem of mapped) {
				for (let i = 0; i < elem.length; i++) {
					if (
						elem[i]["productname"] ==
						`${String(query.value)[0].toUpperCase()}${String(query.value).slice(
							1
						)}`
					) {
						results.push(savedOrders[mapped.indexOf(elem)]);
						// return new Promise();
						new Promise((resolve) => {
							resolve();
						});
					}
				}
			}

			break;
		case "username":
		case "products":
			mapped = await savedOrders.map((elem) => {
				return elem["users"][0];
			});
			for (let elem of mapped) {
				if (elem["username"] == query.value) {
					results.push(savedOrders[mapped.indexOf(elem)]);
				}
			}
			new Promise((resolve) => {
				resolve();
			});
			break;
		case "_id":
		case "orderId":
		case "shipped":
		case "createAt":
			results = await Order.find({
				[query.filter]: query.value
			});
			new Promise((resolve) => {
				resolve();
			});
			break;
	}
	// }

	// determinate(query.filter, query.value).then(() => {
	// 	console.log("Arrive Promise");
	// if (results.length < 1) {
	// 	return res.status(200).json({
	// 		message: "Product not present in the orders"
	// 	});
	// }
	// });

	// if (results.length < 1) {
	// 	return res.status(200).json({
	// 		message: "Product not present in the orders"
	// 	});
	// }
	// problemi con search all results

	switch (query.order) {
		case "ascendent":
			if (results.length == 0) {
				results = savedOrders;
			}
			const ascOrders = results.sort(reorderAscedent);
			res.json(ascOrders);
			break;
		case "descendent":
			if (results.length == 0) {
				results = savedOrders;
			}
			const descOrders = results.sort(reorderDescent);
			res.json(descOrders);
			break;
		// default:
		// 	res.status(404).json({ message: "Error in url entries" });
	}
}

// --- funzionante ---

// if (query.filter || query.order) {
// 	if (query.filter == "productname") {
// 		let mapped = await savedOrders.map((elem) => {
// 			return elem["users"][0]["products"];
// 		});
// 		for (let elem of mapped) {
// 			for (let i = 0; i < elem.length; i++) {
// 				// console.log(elem[i]["productname"]);
// 				if (
// 					elem[i]["productname"] ==
// 					`${String(query.value)[0].toUpperCase()}${String(
// 						query.value
// 					).slice(1)}`
// 				) {
// 					results.push(savedOrders[mapped.indexOf(elem)]);
// 				}
// 			}
// 		}
// 	} else if (query.filter == "username" || query.filter == "products") {
// 		let mapped = await savedOrders.map((elem) => {
// 			return elem["users"][0];
// 		});
// 		for (let elem of mapped) {
// 			if (elem["username"] == query.value) {
// 				results.push(savedOrders[mapped.indexOf(elem)]);
// 			}
// 		}
// 	} else if (
// 		query.filter == "_id" ||
// 		query.filter == "orderId" ||
// 		query.filter == "shipped" ||
// 		query.filter == "createdAt"
// 	) {
// 		results = await Order.find({
// 			[query.filter]: query.value
// 		});
// 	}

// 	if (query.order) {
// 		if (results.length == 0) {
// 			results = savedOrders;
// 		}
// 		if (query.order == "descent") {
// 			const orders = results.sort(reorderDescent);
// 			return res.json(orders);
// 		} else if (query.order == "ascendent") {
// 			const orders = results.sort(reorderAscedent);
// 			return res.json(orders);
// 		}
// 	} else if (query.order == undefined) {
// 		res.status(200).json(results);
// 	}
// } else {
// 	res.status(200).json(savedOrders);
// }
// --- funzionante ---

// switch (this.orderQuery) {
// 	case "ascendent":
// 		this.results = this.arr.sort(this.reorderAscedent);
// 		break;
// 	case "descendent":
// 		this.results = this.arr.sort(this.reorderDescent);
// 		break;
// }

// switch (this.filterQuery) {
// 	case "productname":
// 		this.mapped = await this.data.map((elem) => {
// 			// console.log(elem);
// 			return elem["users"][0]["products"];
// 		});

// 		for (let elem of this.mapped) {
// 			for (let i = 0; i < elem.length; i++) {
// 				if (
// 					elem[i]["productname"] ==
// 					`${String(this.valueQuery)[0].toUpperCase()}${String(
// 						this.valueQuery
// 					).slice(1)}`
// 				) {
// 					this.results.push(this.data[this.mapped.indexOf(elem)]);
// 					new Promise((resolve) => {
// 						// console.log(this.results);
// 						resolve();
// 					});
// 				}
// 			}
// 		}
// 		// console.log(this.results.length);
// 		break;
// 	case "username":
// 	case "products":
// 		this.mapped = await this.data.map((elem) => {
// 			return elem["users"][0];
// 		});
// 		for (let elem of this.mapped) {
// 			if (elem["username"] == this.valueQuery) {
// 				this.results.push(this.data[this.mapped.indexOf(elem)]);
// 			}
// 		}
// 		new Promise((resolve) => {
// 			resolve();
// 		});
// 		break;
// 	case "_id":
// 	case "orderId":
// 	case "shipped":
// 	case "createAt":
// 		this.results = await this.schema.find({
// 			[this.filterQuery]: this.valueQuery
// 		});
// 		new Promise((resolve) => {
// 			resolve();
// 		});
// 		break;
// }

// if (this.filterQuery == "productname") {
// 	this.mapped = await this.data.map((elem) => {
// 		return elem["users"][0]["products"];
// 	});
// 	// console.log(this.mapped);
// 	for (let elem of this.mapped) {
// 		for (let i = 0; i < elem.length; i++) {
// 			if (
// 				elem[i]["productname"] ==
// 				`${String(this.valueQuery)[0].toUpperCase()}${String(
// 					this.valueQuery
// 				).slice(1)}`
// 			) {
// 				this.results.push(this.data[this.mapped.indexOf(elem)]);
// 				// new Promise((resolve) => {
// 				// 	resolve();
// 				// });
// 			}
// 		}
// 	}
// 	return this.results;
// }

// console.log("Here date");
// this.mapped = this.data.map((elem) => {
// 	return elem[this.filterQuery];
// });
// console.log(this.mapped);
// this.mapped = this.data.map((elem) => {
// 	return elem["createdAt"];
// });

// this.mapped = this.data.filter((elem) => {
// 	return elem[this.filterQuery];
// });
// for (let elem of this.mapped) {
// 	if (
// 		new Date(elem).getUTCFullYear() ==
// 			new Date(this.valueQuery).getUTCFullYear() &&
// 		new Date(elem).getUTCMonth() ==
// 			new Date(this.valueQuery).getUTCMonth() &&
// 		new Date(elem).getUTCDate() == new Date(this.valueQuery).getUTCDate()
// 	) {
// 		this.results.push(this.data[this.mapped.indexOf(elem)]);
// 	}
// }
// return this.results;

// const newOrder = new Order(data);
// newOrder.save((err, postedData) => {
// 	if (err) {
// 		console.log(err);
// 	}

// 	// );
// 	// Qui modifica user - aggiunta ad array orders - object con orderid e url...
// 	// ... se user non disponibile res.status(404).json{message: userXXXX not exists}
// 	// ........

// 	// Qui modifica quantità dei vari products aggiunti all'ordine - diminuire...
// 	// quantità dispinibile

// 	// console.log(

// 	// ---------------------------------------------------------------------------s
// 	// Spostare tutto il blocco all'esterno di newOrder.save e inserirlo all'intero dell'if else...
// 	// ...qui sotto
// 	// postedData["users"].map((elem) => {
// 	// 	elem["products"].map(async (el) => {
// 	// 		console.log(el["productname"]);
// 	// 		let pToChanged = await Product.find({ name: el["productname"] });
// 	// 		if (pToChanged[0]["quantity"] < el["quantity"]) {
// 	// 			res.status(200).json({
// 	// 				message: `There aren't enough quantity of ${pToChanged[0]["name"]}.`
// 	// 			});
// 	// 			console.log(
// 	// 				`There aren't enough quantity of ${pToChanged[0]["name"]}.`
// 	// 			);
// 	// 		} else {
// 	// 			// let err = new Error(
// 	// 			// 	`There aren't enough quantity of ${pToChanged[0]["name"]}.`
// 	// 			// );
// 	// 			// throw err;
// 	// 			await Product.findOneAndUpdate(
// 	// 				{
// 	// 					name: el["productname"]
// 	// 				},
// 	// 				{
// 	// 					quantity: pToChanged[0]["quantity"] - el["quantity"]
// 	// 				}
// 	// 			);
// 	// 			// res.status(200).json(newOrder);
// 	// 		}

// 	// 		res.status(200).json(newOrder);
// 	// 		// console.log(el["quantity"]);
// 	// 		// console.log(pToChanged[0]["quantity"]);
// 	// 	});
// 	// });
// 	// Spostare tutto il blocco all'esterno di newOrder.save e inserirlo all'intero dell'if else...
// 	// ...qui sopra
// 	// ---------------------------------------------------------------------------

// 	// Qui possibile Ric...
// });

// 	// console.log(

// 	// ---------------------------------------------------------------------------s
// 	// Spostare tutto il blocco all'esterno di newOrder.save e inserirlo all'intero dell'if else...
// 	// ...qui sotto
// 	// postedData["users"].map((elem) => {
// 	// 	elem["products"].map(async (el) => {
// 	// 		console.log(el["productname"]);
// 	// 		let pToChanged = await Product.find({ name: el["productname"] });
// 	// 		if (pToChanged[0]["quantity"] < el["quantity"]) {
// 	// 			res.status(200).json({
// 	// 				message: `There aren't enough quantity of ${pToChanged[0]["name"]}.`
// 	// 			});
// 	// 			console.log(
// 	// 				`There aren't enough quantity of ${pToChanged[0]["name"]}.`
// 	// 			);
// 	// 		} else {
// 	// 			// let err = new Error(
// 	// 			// 	`There aren't enough quantity of ${pToChanged[0]["name"]}.`
// 	// 			// );
// 	// 			// throw err;
// 	// 			await Product.findOneAndUpdate(
// 	// 				{
// 	// 					name: el["productname"]
// 	// 				},
// 	// 				{
// 	// 					quantity: pToChanged[0]["quantity"] - el["quantity"]
// 	// 				}
// 	// 			);
// 	// 			// res.status(200).json(newOrder);
// 	// 		}

// 	// 		res.status(200).json(newOrder);
// 	// 		// console.log(el["quantity"]);
// 	// 		// console.log(pToChanged[0]["quantity"]);
// 	// 	});
// 	// });
// 	// Spostare tutto il blocco all'esterno di newOrder.save e inserirlo all'intero dell'if else...
// 	// ...qui sopra
// 	// ---------------------------------------------------------------------------

// let productsnames = products[0].map((elem) => {
// 	return elem["productname"];
// });
// console.log(productsnames);

// - trovare soluzione
// - passare a classes -> ProductUpdaterClass

// .map((prod) => {
// 	console.log(prod);
// });

// console.log(products);

// let results = data["users"].map((user) => {
// 	user["products"].map(async (prod) => {
// 		// console.log(prod["productname"]);
// 		const prodsToUpdate = await Product.find({
// 			name: prod["productname"]
// 		});
// 		// async function checkQuantity() {
// 		if (prodsToUpdate[0]["quantity"] < prod["quantity"]) {
// 			const message = `There aren't enough quantity of ${prodsToUpdate[0]["name"]}.`;

// 			// console.log(
// 			// 	`There aren't enough quantity of ${prodsToUpdate[0]["name"]}.`
// 			// );
// 			// return {
// 			// 	response: "negative",
// 			// 	message: message
// 			// };
// 			// reject("negative");
// 		} else {
// 			console.log("Start update quantity");

// 			Product.findOneAndUpdate(
// 				{
// 					name: prod["productname"]
// 				},
// 				{
// 					quantity: prodsToUpdate[0]["quantity"] - prod["quantity"]
// 				}
// 			);

// 			const message = `All ok.`;

// 			// return {
// 			// 	response: "positive",
// 			// 	message: message
// 			// };
// 			// resolve("Positive");
// 			// 	// );
// 			// 	// Qui modifica user - aggiunta ad array orders - object con orderid e url...
// 			// 	// ... se user non disponibile res.status(404).json{message: userXXXX not exists}
// 			// 	// ........
// 		}

// 		// }

// 		// checkQuantity().then((response) => {
// 		// 	return response;
// 		// });

// 		// if (prodsToUpdate[0]["quantity"] < prod["quantity"]) {
// 		// 	jsonNegRes = {
// 		// 		message: `There aren't enough quantity of ${prodsToUpdate[0]["name"]}.`
// 		// 	};

// 		// 	console.log(
// 		// 		`There aren't enough quantity of ${prodsToUpdate[0]["name"]}.`
// 		// 	);
// 		// } else {
// 		// 	console.log("Start update quantity");

// 		// 	await Product.findOneAndUpdate(
// 		// 		{
// 		// 			name: prod["productname"]
// 		// 		},
// 		// 		{
// 		// 			quantity: prodsToUpdate[0]["quantity"] - prod["quantity"]
// 		// 		}
// 		// 	);
// 		// 	saveOk = true;

// 		// 	// 	// );
// 		// 	// 	// Qui modifica user - aggiunta ad array orders - object con orderid e url...
// 		// 	// 	// ... se user non disponibile res.status(404).json{message: userXXXX not exists}
// 		// 	// 	// ........
// 		// }

// 		// res.status(200).json(newOrder);
// 		// console.log(el["quantity"]);
// 		// console.log(pToChanged[0]["quantity"]);
// 	});
// });

// Promise.all(results).then((result) => {
// 	console.log(result);
// });

// if (saveOk == true) {
// 	console.log("Start saving");
// 	const newOrder = new Order(data);
// 	newOrder.save((err, savedData) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		res.status(200).json(savedData);
// 	});
// } else if (saveOk == false) {
// 	res.status(200).json(jsonNegRes);
// }

// let jsonNegRes;
// let saveOk = false;

// let products = data["users"].map((user) => {
// 	user["products"];
// });

// for (let user in data["users"][0]) {
// 	console.log(user);
// }

// let products = data["users"].map((user) => {
// 	return user["products"];
// });

// // provare ad unire products e permissions

// let permissions = products[0].map(async (elem) => {
// 	const prodsToUpdate = await Product.find({
// 		name: elem["productname"]
// 	});
// 	if ((await prodsToUpdate[0]["quantity"]) < elem["quantity"]) {
// 		console.log("No");
// 		return {
// 			productname: elem["productname"],
// 			response: "negative",
// 			message: `Too little quantity of ${await prodsToUpdate[0]["name"]}`
// 		};
// 	} else {
// 		console.log("Ok");
// 		return {
// 			productname: elem["productname"],
// 			response: "positive",
// 			quantity: elem["quantity"]
// 			// data: prodsToUpdate
// 		};
// 	}
// });
// // let result = await Promise.all(permissions);
// // let choose = await result.map(async (elem) => {
// // 	if (elem["response"] == "negative") {
// // 		negativeArr.push({
// // 			message: elem["message"]
// // 		});
// // 	} else if (elem["response"] == "positive") {
// // 		const productToUpdate = await Product.findOne({
// // 			name: elem["productname"]
// // 		});
// // 		Product.findOneAndUpdate(
// // 			{
// // 				name: elem["productname"]
// // 			},
// // 			{
// // 				quantity: productToUpdate["quantity"] - elem["quantity"]
// // 			},
// // 			(err, docs) => {
// // 				// if (err) {
// // 				// 	res.status(200).json({
// // 				// 		message: "Error in quantity updating"
// // 				// 	});
// // 				// }
// // 				console.log("Error in quantity updating");
// // 			}
// // 		);
// // 	}
// // });
// // let response = await

// Promise.all(permissions)
// 	.then((result) => {
// 		let negativeArr = [];
// 		result.map(async (elem) => {
// 			// console.log(elem["quantity"]);

// 			if (elem["response"] == "negative") {
// 				negativeArr.push({
// 					message: elem["message"]
// 				});
// 			} else if (elem["response"] == "positive") {
// 				// console.log("elem data ");
// 				// console.log(elem["productname"]);
// 				const productToUpdate = await Product.findOne({
// 					name: elem["productname"]
// 				});
// 				Product.findOneAndUpdate(
// 					{
// 						name: elem["productname"]
// 					},
// 					{
// 						quantity: productToUpdate["quantity"] - elem["quantity"]
// 					},
// 					(err, docs) => {
// 						if (err) {
// 							// res.status(200).json({
// 							// 	message: "Error in quantity updating"
// 							// });
// 							console.log("Error in quantity updating");
// 						}
// 					}
// 				);
// 			}
// 		});
// 		return negativeArr;
// 	})
// 	.then((negativeArr) => {
// 		console.log(negativeArr);
// 		if (negativeArr.length == 0) {
// 			const newOrder = new Order(data);
// 			newOrder.save((err, savedData) => {
// 				if (err) {
// 					console.log(err);
// 				}
// 				res.status(200).json(savedData);
// 			});
// 		} else {
// 			let negInfo = {};
// 			negativeArr.map((elem) => {
// 				negInfo[`message${negativeArr.indexOf(elem)}`] = elem["message"];
// 			});
// 			res.status(200).json(negInfo);
// 		}
// 	});

// --- da classes.js ---
// async detProducts() {
// 	this.products = this.data["users"].map((user) => {
// 		user["products"];
// 	});
// }

// this.orderUsers = await this.data["users"].map(async (user) => {
// 	try {
// 		this.usersArr.push({
// 			name: user["username"],
// 			data: await this.userModel.findOne({
// 				username: user["username"]
// 			})
// 		});
// 		console.log(this.usersArr);
// 	} catch (error) {
// 		this.usersArr.push({
// 			name: user["username"],
// 			data: null
// 		});
// 	}
// 	// return user["username"];
// });
// console.log(this.usersArr);
// this.r = await this.orderUsers;
// // console.log(Promise.all(this.r));
// Promise.all(this.r).then((result) => {
// 	console.log(result);
// });

// async searchProd() {
// 		this.permissions = [];
// 		for await (let userSection of this.data["users"]) {
// 			console.log(userSection["products"]);

// 			// this.permissions = userSection["products"].map(async (user) =>
// 			for await (let user of userSection["products"]) {
// 				// console.log(user["productname"]);
// 				this.prodsToUp = await this.productModel.find({
// 					name: user["productname"]
// 				});
// 				for (let i = 0; i < this.prodsToUp.length; i++) {
// 					if ((await this.prodsToUp[i]["quantity"]) < user["quantity"]) {
// 						// console.log("No");
// 						// console.log(this.prodsToUp[0]["name"]);
// 						this.permissions.push({
// 							productname: user["productname"],
// 							response: "negative",
// 							message: `Too little quantity of ${await this.prodsToUp[i][
// 								"name"
// 							]}`
// 						});
// 					} else {
// 						// console.log("Ok");
// 						// console.log(this.prodsToUp[0]["name"]);
// 						this.permissions.push({
// 							productname: user["productname"],
// 							response: "positive",
// 							quantity: user["quantity"]
// 						});
// 					}
// 				}
// 			}
// 		}
// 		return this.permissions;
// 		// console.log("Perm");
// 		// console.log(this.perm);
// 		// this.products = await this.data["users"].map((user) => {
// 		// 	return user["products"];
// 		// });
// 		// // console.log(this.products);
// 		// this.permissions = await this.products[0].map(async (elem) => {
// 		// 	this.prodsToUpdate = await this.productModel.find({
// 		// 		name: elem["productname"]
// 		// 	});
// 		// 	if ((await this.prodsToUpdate[0]["quantity"]) < elem["quantity"]) {
// 		// 		console.log("No");
// 		// 		console.log(this.prodsToUpdate[0]["name"]);
// 		// 		return {
// 		// 			productname: elem["productname"],
// 		// 			response: "negative",
// 		// 			message: `Too little quantity of ${await this.prodsToUpdate[0][
// 		// 				"name"
// 		// 			]}`
// 		// 		};
// 		// 	} else {
// 		// 		console.log("Ok");
// 		// 		console.log(this.prodsToUpdate[0]["name"]);
// 		// 		return {
// 		// 			productname: elem["productname"],
// 		// 			response: "positive",
// 		// 			quantity: elem["quantity"]
// 		// 		};
// 		// 	}
// 		// });
// 		// console.log("Permission");
// 		// console.log(this.permission);
// 	}
// 	async createResults() {
// 		console.log(this.permissions);

// 		this.results = await Promise.all(this.permissions);

// 		this.negativeArr = [];
// 		// provare a correggere errore quantità qui
// 		// this.results.map(async (elem) =>
// 		for await (let elem of this.results) {
// 			if (elem["response"] == "negative") {
// 				this.negativeArr.push({
// 					message: elem["message"]
// 				});
// 			} else if (elem["response"] == "positive") {
// 				this.updatingProduct = await this.productModel.findOne({
// 					name: elem["productname"]
// 				});
// 				this.productModel.findOneAndUpdate(
// 					{
// 						name: elem["productname"]
// 					},
// 					{
// 						quantity: this.updatingProduct["quantity"] - elem["quantity"]
// 					},
// 					(err, docs) => {
// 						if (err) {
// 							// this.response.status(200).json({
// 							// 	message: "Error in quantity updating"
// 							// });
// 							console.log("Error in quantity updating");
// 						}
// 					}
// 				);
// 			}
// 		}
// 	}

// class UserUpdaterClass {
// 	constructor(data, UserModel, OrderModel, response) {
// 		this.data = data;
// 		this.userModel = UserModel;
// 		this.orderModel = OrderModel;
// 		this.response = response;
// 	}

// 	// Aggiungere controllo esistenza user

// 	async findData() {
// 		this.usersArr = [];

// 		for (let user of this.data["users"]) {
// 			try {
// 				this.usersArr.push({
// 					name: user["username"],
// 					data: await this.userModel.findOne({
// 						username: user["username"]
// 					})
// 				});
// 				// console.log(this.usersArr);
// 			} catch (error) {
// 				this.usersArr.push({
// 					name: user["username"],
// 					data: null
// 				});
// 			}
// 		}
// 		return this.usersArr;
// 	}

// 	async usersExistCheck() {
// 		this.existArray = await this.findData();
// 		this.message = {};
// 		// this.results = this.existArray.map((elem) =>

// 		for (let elem of this.existArray) {
// 			if (elem["data"] == null) {
// 				this.message[
// 					`message${this.usersArr.indexOf(elem)}`
// 				] = `${elem["name"]} not exist.`;
// 				// return this.message;
// 			}
// 			// else {
// 			// 	return null;
// 			// }
// 		}
// 		return this.message;
// 		// .map(async (elem) => {
// 		// 	this.resultElem = await this.userModel.findOne({
// 		// 		username: elem
// 		// 	});
// 		// });
// 		// this.results = this.usersArr.map(async (elem) => {
// 		// 	if (elem["data"] == null) {
// 		// 		this.message[
// 		// 			`message${this.usersArr.indexOf(elem)}`
// 		// 		] = `${elem["name"]} not exist.`;
// 		// 		return this.message;
// 		// 	} else {
// 		// 		return elem["name"];
// 		// 	}
// 		// });
// 		// // this.arr = await Promise.all(this.results);
// 		// // console.log(this.results);
// 		// return Promise.all(this.results);
// 		// Cercare di sommare i risultati negativi in un'unica response in orders.js

// 		// return await this.message;
// 		// console.log(this.results.length);
// 		// return this.results;
// 		// if (this.results.length < 1) {
// 		// 	return false;
// 		// } else {
// 		// 	return this.message;
// 		// }
// 		// this.results.map((elem) => {
// 		// 	if(elem == null )
// 		// })
// 		// this.results.map((elem) => {
// 		// 	if (elem == null) {
// 		// 		this.response.status(200).json({

// 		// 		})
// 		// 	} else if (elem == null) {

// 		// 	}
// 		// })
// 		// console.log(this.results);
// 		// for (let i = 0; i < this.results.length; i++) {
// 		// 	if (this.results[i] == null) {
// 		// 		console.log("Miss");
// 		// 		console.log(this.data["users"][i]["username"]);
// 		// 		// this.response.status(200).json({
// 		// 		// 	message: `The user ${
// 		// 		// 		this.data["users"].indexOf(elem)["username"]
// 		// 		// 	} not exist`
// 		// 		// });
// 		// 	}
// 		// }

// 		// this.results.map((elem) => {
// 		// 	console.log(elem);
// 		// });
// 		// this.negInfo = {};
// 		// this.negativeArr.map((elem) => {
// 		// 	this.negInfo[`message${this.negativeArr.indexOf(elem)}`] =
// 		// 		elem["message"];
// 		// });
// 		// this.response.status(200).json(this.negInfo);
// 	}

// console.log(this.fieldToUpdate["orders"]);
// for await (let orders of this.fieldToUpdate["orders"]) {
// 	// console.log(orders["orderid"]);
// 	if (orders["orderid"] == this.data["orderid"]) {
// 		console.log("Yes");
// 		console.log(orders);
// 		console.log(this.fieldToUpdate["orders"]);
// 	}
// }

// this.updatedField = await this.fieldToUpdate["orders"].concat([
// 	{
// 		orderid: this.data["orderid"],
// 		url: `/api/v1/orders-archieve/${this.data["orderid"].slice(5)}`
// 	}
// ]);
// this.result = await this.userModel.findOneAndUpdate(
// 	{
// 		username: elem
// 	},
// 	{
// 		orders: this.updatedField
// 	}
// 	// {
// 	// 	new: true
// 	// }
// );

// console.log(this.fieldsToUpdate);
// this.fieldsUpdated = await this.fieldsToUpdate.map((elem) => {
// 	// elem.
// 	// console.log(elem);
// 	// user
// 	// 	.filter((elem) => {
// 	// 	console.log(elem["orderid"]);
// 	// 	// elem["orderid"] !== this.data["orderid"];
// 	// 	// console.log(this.data["orderid"]);
// 	// });
// });

// console.log(this.dataUpdated);
// console.log(this.resolvedUsers[this.fieldsToUpdate.indexOf(orders)]);
// elem["orderid"] == this.data["orderid"];
// console.log(orders);
// console.log(this.fieldsUpdated);
// console.log(this.resolvedUsers);
// console.log(elem);
