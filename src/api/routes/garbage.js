// Working

// if (query.filter && query.value == undefined) {
// 	res.status(404).json({
// 		message: "Need a &value=parameter for search..."
// 	});
// 	// orderManager.missParam("&value=");
// } else if ((query.filter && query.value) || query.order) {
// 	// let mapped;
// 	await orderManager.determinate();
// 	await orderManager.ordering();

// 	// // async function determinate(filter, value) {
// 	switch (query.filter) {
// 		case "productname":
// 			mapped = await savedOrders.map((elem) => {
// 				return elem["users"][0]["products"];
// 			});
// 			// (async function () {
// 			for await (let elem of mapped) {
// 				for (let i = 0; i < elem.length; i++) {
// 					if (
// 						elem[i]["productname"] ==
// 						`${String(query.value)[0].toUpperCase()}${String(query.value).slice(
// 							1
// 						)}`
// 					) {
// 						results.push(savedOrders[mapped.indexOf(elem)]);
// 						// return new Promise();
// 						new Promise((resolve) => {
// 							resolve();
// 						});
// 					}
// 				}
// 			}

// 			break;
// 		case "username":
// 		case "products":
// 			mapped = await savedOrders.map((elem) => {
// 				return elem["users"][0];
// 			});
// 			for (let elem of mapped) {
// 				if (elem["username"] == query.value) {
// 					results.push(savedOrders[mapped.indexOf(elem)]);
// 				}
// 			}
// 			new Promise((resolve) => {
// 				resolve();
// 			});
// 			break;
// 		case "_id":
// 		case "orderId":
// 		case "shipped":
// 		case "createAt":
// 			results = await Order.find({
// 				[query.filter]: query.value
// 			});
// 			new Promise((resolve) => {
// 				resolve();
// 			});
// 			break;
// 	}
// 	// }

// 	// determinate(query.filter, query.value).then(() => {
// 	// 	console.log("Arrive Promise");
// 	// if (results.length < 1) {
// 	// 	return res.status(200).json({
// 	// 		message: "Product not present in the orders"
// 	// 	});
// 	// }
// 	// });

// 	// if (results.length < 1) {
// 	// 	return res.status(200).json({
// 	// 		message: "Product not present in the orders"
// 	// 	});
// 	// }
// 	// problemi con search all results

// 	switch (query.order) {
// 		case "ascendent":
// 			if (results.length == 0) {
// 				results = savedOrders;
// 			}
// 			const ascOrders = results.sort(reorderAscedent);
// 			res.json(ascOrders);
// 			break;
// 		case "descendent":
// 			if (results.length == 0) {
// 				results = savedOrders;
// 			}
// 			const descOrders = results.sort(reorderDescent);
// 			res.json(descOrders);
// 			break;
// 		// default:
// 		// 	res.status(404).json({ message: "Error in url entries" });
// 	}
// }

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

// console.log(this.permissions);
// this.results = await Promise.all(this.permissions);
// this.negativeArr = [];
// for await (let elem of this.results) {
// 	if (elem["response"] == "negative") {
// 		this.negativeArr.push({
// 			message: elem["message"]
// 		});
// 	} else if (elem["response"] == "positive") {
// 		this.updatingProduct = await this.productModel.findOne({
// 			name: elem["productname"]
// 		});
// 		this.productModel.findOneAndUpdate(
// 			{
// 				name: elem["productname"]
// 			},
// 			{
// 				quantity: this.updatingProduct["quantity"] - elem["quantity"]
// 			},
// 			(err, docs) => {
// 				if (err) {
// 					// this.response.status(200).json({
// 					// 	message: "Error in quantity updating"
// 					// });
// 					console.log("Error in quantity updating");
// 				}
// 			}
// 		);
// 	}
// }

// this.productsToUpdate = await user["products"].forEach(
// Tested with .map too...results will be filtered and not update double products
// 	async (product) => {
// 		console.log(product["productname"]);
// 		// ----->
// 		// Inserire qui aumento quantità
// 		this.oldQuantity = await this.productModel.findOne({
// 			name: product["productname"]
// 		});
// 		this.productUpdate = await this.productModel.findOneAndUpdate(
// 			{
// 				name: product["productname"]
// 			},
// 			{
// 				quantity: this.oldQuantity["quantity"] + product["quantity"]
// 			}
// 		);
// 		// <-----
// 	}
// );
// console.log(this.newOrder);
// console.log(Number(this.totalprice.toFixed(2)));

// this.newOrder["users"].map(async (user) => {
// 	// this.prod = await this.productModel.findOne({
// 	// })
// 	// user.cost =
// });
// user["products"].map(async (elem) =>
// console.log(elem["quantity"]);
// console.log(this.item["price"]);
// console.log(this.itemsPrice);
// console.log(this.itemPrice);
// console.log(user);

// classes.js first of rename

// class OrderManagerClass {
// 	constructor(response, data, filterQuery, valueQuery, orderQuery) {
// 		this.res = response;
// 		this.data = data;
// 		this.filterQuery = filterQuery;
// 		this.valueQuery = valueQuery;
// 		this.orderQuery = orderQuery;
// 		this.results = [];
// 		this.mapped;
// 	}
// 	missParam(paramIndication) {
// 		this.res.status(400).json({
// 			message: `Need a ${paramIndication}parameter for search...`
// 		});
// 	}

// 	async determinate() {
// 		if (this.filterQuery == "productname") {
// 			this.mapped = await this.data.map((elem) => {
// 				return elem["users"][0]["products"];
// 			});
// 			for (let elem of this.mapped) {
// 				for (let i = 0; i < elem.length; i++) {
// 					if (
// 						elem[i]["productname"] ==
// 						`${String(this.valueQuery)[0].toUpperCase()}${String(
// 							this.valueQuery
// 						).slice(1)}`
// 					) {
// 						this.results.push(this.data[this.mapped.indexOf(elem)]);
// 					}
// 				}
// 			}
// 			return this.results;
// 		} else if (
// 			this.filterQuery == "username" ||
// 			this.filterQuery == "products"
// 		) {
// 			this.mapped = await this.data.map((elem) => {
// 				return elem["users"][0];
// 			});
// 			for (let elem of this.mapped) {
// 				if (elem["username"] == this.valueQuery) {
// 					this.results.push(this.data[this.mapped.indexOf(elem)]);
// 				}
// 			}
// 		} else if (this.filterQuery == "shipped") {
// 			this.results = this.data.filter((elem) => {
// 				if (elem[this.filterQuery] == Boolean(this.valueQuery)) {
// 					return true;
// 				} else {
// 					return false;
// 				}
// 			});
// 			return this.results;
// 		} else if (this.filterQuery == "_id" || this.filterQuery == "orderid") {
// 			this.results = this.data.filter((elem) => {
// 				if (elem[this.filterQuery] == this.valueQuery) {
// 					return true;
// 				} else {
// 					return false;
// 				}
// 			});
// 			return this.results;
// 		} else if (this.filterQuery == "date") {
// 			this.results = this.data.filter((elem) => {
// 				if (
// 					new Date(elem[this.filterQuery]).getUTCFullYear() ==
// 						new Date(this.valueQuery).getUTCFullYear() &&
// 					new Date(elem[this.filterQuery]).getUTCMonth() ==
// 						new Date(this.valueQuery).getUTCMonth() &&
// 					new Date(elem[this.filterQuery]).getUTCDate() ==
// 						new Date(this.valueQuery).getUTCDate()
// 				) {
// 					return true;
// 				} else {
// 					return false;
// 				}
// 			});
// 			return this.results;
// 		}
// 	}

// 	reorderIncr(a, b) {
// 		if (a.orderId.slice(5) > b.orderId.slice(5)) {
// 			return 1;
// 		} else if (a.orderId.slice(5) < b.orderId.slice(5)) {
// 			return -1;
// 		}
// 	}

// 	reorderDecr(a, b) {
// 		if (a.orderId.slice(5) > b.orderId.slice(5)) {
// 			return -1;
// 		} else if (a.orderId.slice(5) < b.orderId.slice(5)) {
// 			return 1;
// 		}
// 	}

// 	async ordering(arr) {
// 		this.arr = arr;
// 		if (this.orderQuery == "decreasing" && this.arr.length > 0) {
// 			return (this.arr = this.arr.sort(this.reorderDecr));
// 		} else if (this.orderQuery == "increasing" && this.arr.length > 0) {
// 			return (this.arr = this.arr.sort(this.reorderIncr));
// 		} else {
// 			return this.arr;
// 		}
// 	}

// 	async createResponse(arr) {
// 		this.res.status(200).json(arr);
// 	}

// 	async noProducts() {
// 		this.res.status(200).json({
// 			message: `Product ${this.valueQuery} is not present in the orders archieve`
// 		});
// 	}
// }

// class ProductUpdaterClass {
// 	constructor(data, productModel, orderModel, response) {
// 		this.data = data;
// 		this.productModel = productModel;
// 		this.orderModel = orderModel;
// 		this.response = response;
// 	}

// 	async orderExistsCheck() {
// 		return await this.orderModel.findOne({
// 			orderid: this.data["orderid"]
// 		});
// 	}

// 	async searchProd() {
// 		this.permissions = [];
// 		for await (let userSection of this.data["users"]) {
// 			for await (let user of userSection["products"]) {
// 				this.prodsToUp = await this.productModel.find({
// 					name: user["productname"]
// 				});
// 				for (let i = 0; i < this.prodsToUp.length; i++) {
// 					if ((await this.prodsToUp[i]["quantity"]) < user["quantity"]) {
// 						// console.log("No");
// 						this.permissions.push({
// 							productname: user["productname"],
// 							response: "negative",
// 							message: `Too little quantity of ${await this.prodsToUp[i][
// 								"name"
// 							]}`
// 						});
// 					} else {
// 						// console.log("Ok");
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
// 	}
// 	async createResults() {
// 		this.results = await Promise.all(this.permissions);
// 		this.negativeArr = [];
// 		this.totalprice = 0;
// 		for await (let elem of this.results) {
// 			if (elem["response"] == "negative") {
// 				this.negativeArr.push({
// 					message: elem["message"]
// 				});
// 			} else if (elem["response"] == "positive") {
// 				this.updatingProduct = await this.productModel.findOne({
// 					name: elem["productname"]
// 				});
// 				this.totalprice =
// 					this.totalprice + this.updatingProduct["price"] * elem["quantity"];
// 				// test with await... -->
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
// 				// <--- test with await...
// 			}
// 		}
// 	}
// 	async createNewOrder() {
// 		if (this.negativeArr.length == 0) {
// 			this.newOrder = new this.orderModel(this.data);
// 			for await (let user of this.newOrder["users"]) {
// 				this.itemsCost = 0;
// 				for await (let elem of user["products"]) {
// 					this.item = await this.productModel.findOne({
// 						name: elem["productname"]
// 					});
// 					this.itemsPrice = this.item["price"] * elem["quantity"];
// 					this.itemsCost = this.itemsCost + this.itemsPrice;

// 					user.cost = Number(this.itemsCost.toFixed(2));
// 					this.itemsPrice = 0;
// 				}
// 			}
// 			this.newOrder.totalprice = Number(this.totalprice.toFixed(2));

// 			this.newOrder.save((err, savedData) => {
// 				if (err) {
// 					console.log(err);
// 				}
// 				this.response.status(200).json(savedData);
// 			});
// 		} else if (this.negativeArr.length > 0) {
// 			this.negInfo = {};
// 			this.negativeArr.map((elem) => {
// 				this.negInfo[`message${this.negativeArr.indexOf(elem)}`] =
// 					elem["message"];
// 			});
// 			this.response.status(200).json(this.negInfo);
// 		}
// 		return this.negativeArr.length;
// 	}

// 	async restoreQuantities() {
// 		// this.productsToUpdate = this.data["users"].map((user) => {
// 		// 	console.log(user["products"]);
// 		// });

// 		for await (let user of this.data["users"]) {
// 			for await (let product of user["products"]) {
// 				this.oldQuantity = await this.productModel.findOne({
// 					name: product["productname"]
// 				});
// 				this.productUpdate = await this.productModel.findOneAndUpdate(
// 					{
// 						name: product["productname"]
// 					},
// 					{
// 						quantity: this.oldQuantity["quantity"] + product["quantity"]
// 					}
// 				);
// 			}
// 		}
// 	}
// }

// class UserUpdaterClass {
// 	constructor(data, UserModel, OrderModel, response) {
// 		this.data = data;
// 		this.userModel = UserModel;
// 		this.orderModel = OrderModel;
// 		this.response = response;
// 	}

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
// 		for (let elem of this.existArray) {
// 			if (elem["data"] == null) {
// 				this.message[
// 					`message${this.usersArr.indexOf(elem)}`
// 				] = `${elem["name"]} not exist.`;
// 			}
// 			// else {
// 			// 	return null;
// 			// }
// 		}
// 		return this.message;
// 	}

// 	async updateAccountsNewOrder() {
// 		this.users = this.data["users"].map((user) => {
// 			return user["username"];
// 		});
// 		this.users.map(async (elem) => {
// 			this.fieldToUpdate = await this.userModel.findOne({
// 				username: elem
// 			});
// 			this.updatedField = await this.fieldToUpdate["orders"].concat([
// 				{
// 					orderid: this.data["orderid"],
// 					url: `/api/v1/orders-archieve/${this.data["orderid"].slice(5)}`
// 				}
// 			]);
// 			this.result = await this.userModel.findOneAndUpdate(
// 				{
// 					username: elem
// 				},
// 				{
// 					orders: this.updatedField
// 				}
// 				// {
// 				// 	new: true
// 				// }
// 			);
// 		});
// 		// console.log("Update from updateAccountsNewOrder");
// 	}

// 	async updateAccountsDelOrder() {
// 		this.users = this.data["users"].map((user) => {
// 			return user["username"];
// 		});
// 		this.usersToUpdate = this.users.map(async (elem) => {
// 			return await this.userModel.findOne({
// 				username: elem
// 			});
// 		});
// 		this.resolvedUsers = await Promise.all(this.usersToUpdate);
// 		this.fieldsToUpdate = this.resolvedUsers.map((elem) => {
// 			return elem["orders"];
// 		});

// 		for await (let orders of this.fieldsToUpdate) {
// 			this.dataUpdated = await orders.filter((elem) => {
// 				return elem["orderid"] !== this.data["orderid"];
// 			});
// 			this.result = await this.userModel.findOneAndUpdate(
// 				{
// 					username:
// 						this.resolvedUsers[this.fieldsToUpdate.indexOf(orders)]["username"]
// 				},
// 				{
// 					orders: this.dataUpdated
// 				}
// 				// {
// 				// 	new: true
// 				// }
// 			);
// 		}
// 	}
// }

// module.exports = { OrderManagerClass, ProductUpdaterClass, UserUpdaterClass };

// new update incoming --->
// reorderIncr(a, b) {
// 	// testing - sostituire a.orderid sotto con --->
// 	// this.orderBy = "test";
// 	if (a[`${this.orderByQuery}`] > b[`${this.orderByQuery}`]) {
// 		return 1;
// 	} else if (a[`${this.orderByQuery}`] < b[`${this.orderByQuery}`]) {
// 		return -1;
// 	}
// testing

// if (a.orderid > b.orderid) {
// 	// per generalizzare bisogna comunque capire come includere orderId.slice(5)
// 	return 1;
// } else if (a.orderid < b.orderid) {
// 	return -1;
// 	// }
// }

// reorderDecr(a, b) {
// 	if (a.orderid > b.orderid) {
// 		return -1;
// 	} else if (a.orderid < b.orderid) {
// 		return 1;
// 	}
// }

// reorderIncr(a, b) {
// 	// testing
// 	// this.orderBy = "test";
// 	// if (a[this.orderBy] > b[this.orderBy]) {
// 	// 	return 1;
// 	// } else if (a[this.orderBy] < b[this.orderBy]) {
// 	// 	return -1;
// 	// }
// 	// testing

// 	if (a.orderid.slice(5) > b.orderid.slice(5)) {
// 		// per generalizzare bisogna comunque capire come includere orderId.slice(5)
// 		return 1;
// 	} else if (a.orderid.slice(5) < b.orderid.slice(5)) {
// 		return -1;
// 	}
// }

// reorderDecr(a, b) {
// 	if (a.orderid.slice(5) > b.orderid.slice(5)) {
// 		return -1;
// 	} else if (a.orderid.slice(5) < b.orderid.slice(5)) {
// 		return 1;
// 	}
// }

// mod with orderby and sort
// if (query.filter && query.value == undefined) {
// 	orderManager.missParam("&value=");
// } else if ((query.filter && query.value) || query.order) {
// 	const ordersArchived = await orderManager.determinate();
// 	// console.log(ordersArchived);
// 	if (ordersArchived < 1) {
// 		await orderManager.noProducts();
// 	} else {
// 		await orderManager.ordering(ordersArchived);
// 		await orderManager.createResponse(ordersArchived);
// 	}
// } else if (
// 	query.filter == undefined &&
// 	query.value == undefined &&
// 	query.order
// ) {
// 	await orderManager.ordering(savedOrders);
// 	await orderManager.createResponse(savedOrders);
// } else if (
// 	query.filter == undefined &&
// 	query.value == undefined &&
// 	query.order == undefined
// ) {
// 	orderManager.createResponse(savedOrders);
// }

// this.queryArr = [
// 	this.filterQuery,
// 	this.valueQuery,
// 	this.orderByQuery,
// 	this.sortQuery
// ];
// this.queryObjArr = [
// 	{
// 		name: "filter",
// 		value: this.filterQuery
// 	},
// 	{
// 		name: "value",
// 		value: this.valueQuery
// 	},
// 	{
// 		name: "orderby",
// 		value: this.orderByQuery
// 	},
// 	{
// 		name: "sort",
// 		value: this.sortQuery
// 	}
// ];
// this.queryObjArr.map((elem) => {
// 	if (
// 		elem["value"] == undefined &&
// 		elem["name"] == "value" &&
// 		elem["name"] == "filter" &&
// 		elem["value"] !== undefined
// 	) {
// 		this.missParam(`&${elem["name"]}= `);
// 	}
// 	// else if () {
// 	// 	this.ordersArchived = await this.determinate();
// 	// // console.log(ordersArchived);
// 	// if (this.ordersArchived < 1) {
// 	// 	await this.noProducts();
// 	// } else {
// 	// 	await this.ordering(this.ordersArchived);
// 	// 	await this.createResponse(this.ordersArchived);
// 	// }
// 	// }

// 	// else if (
// 	// 	elem["value"] == undefined &&
// 	// 	elem["name"] == "orderby" &&
// 	// 	elem["value"] == undefined &&
// 	// 	elem["name"] == "sort"
// 	// ) {
// 	// 	this.createResponse(this.data);
// 	// }
// 	else if (
// 		elem["value"] == undefined &&
// 		elem["name"] == "filter" &&
// 		elem["name"] == "value" &&
// 		elem["name"] == "orderby" &&
// 		elem["name"] == "sort"
// 	) {
// 		this.createResponse(this.data);
// 	}
// });
// // console.log(this.filterQuery);

// // this.queryArr.map(async (elem) => {
// // 	switch (elem) {
// // 		case true:
// // 			console.log(elem);
// // 			break;
// // 		case undefined:
// // 			console.log("false");
// // 	}
// // });
// console.log(this.queryObjArr);

// else if (
// 	this.filterQuery == undefined &&
// 	this.valueQuery == undefined &&
// 	this.orderByQuery &&
// 	this.sortQuery
// ) {
// 	await this.ordering(this.data);
// 	await this.createResponse(this.data);
// }

// da test/index.js
// const routerProduct = require("../src/api/routes/products");
// const routerOrder = require("../src/api/routes/orders");
// const routerUser = require("../src/api/routes/users");
// oppure -->

// .-------------------------.

// router.get("/", async (req, res, next) => {
// 	try {
// 		const query = req.query;
// 		let savedOrders = await Order.find({});

// 		const orderManager = new OrderManagerClass(
// 			res,
// 			savedOrders,
// 			query.filter,
// 			query.value,
// 			query.orderby,
// 			query.sort
// 		);

// 		orderManager.parametersHandling();
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.get("/:ordNum", async (req, res, next) => {
// 	try {
// 		const orderNumber = req.params.ordNum;
// 		const orderId = `order${String(orderNumber)}`;
// 		console.log(orderId);
// 		Order.findOne({ orderid: orderId }, (err, data) => {
// 			if (err) {
// 				res.status(200).json({
// 					message: `Error in searching ${orderId}`
// 				});
// 			} else if (data == null) {
// 				res.status(200).json({
// 					message: `${orderId} not exists`
// 				});
// 			} else {
// 				res.json(data);
// 			}
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.post(
// 	"/",
// 	celebrate({
// 		[Segments.BODY]: Joi.object({
// 			orderid: Joi.string().trim().required(),
// 			users: Joi.array()
// 				.items(
// 					Joi.object({
// 						username: Joi.string().trim().required(),
// 						products: Joi.array().items(
// 							Joi.object({
// 								productname: Joi.string().trim().required(),
// 								quantity: Joi.number().greater(0).integer().required()
// 							})
// 						),
// 						cost: Joi.number().greater(0)
// 					})
// 				)
// 				.required(),
// 			totalcost: Joi.number().greater(0),
// 			shipped: Joi.boolean(),
// 			date: Joi.date()
// 		})
// 	}),
// 	async (req, res, next) => {
// 		if (!req.body) {
// 			res.status(200).json({
// 				message: `For post an order please use this JSON structure in the request body: {
// 				"orderid": String,
// 				"users": [
// 					{
// 						"username": String,
// 						"products": [
// 							{
// 								"productname": String,
// 								"quantity": Number
// 							}
// 						],
// 						"cost": Number (Automatically added)
// 					}
// 				],
// 				"totalcost": Number (Automatically added),
// 				"shipped": Boolean,
// 				"date": (Automatically added)
// 			}`
// 			});
// 		}
// 		try {
// 			const data = await req.body;

// 			const prodUpdater = new ProductUpdaterClass(data, Product, Order, res);
// 			const userUpdater = new UserUpdaterClass(data, User, Order, res);

// 			const orderExists = await prodUpdater.orderExistsCheck();
// 			const existCheck = await userUpdater.usersExistCheck();

// 			if (Object.keys(existCheck).length > 0) {
// 				res.status(200).json(existCheck);
// 			} else if (orderExists !== null) {
// 				res.status(200).json({
// 					message: "OrderId already exists"
// 				});
// 			} else {
// 				await prodUpdater.searchProd();
// 				await prodUpdater.createResults();
// 				const numOfErrs = await prodUpdater.createNewOrder();
// 				if (numOfErrs == 0) {
// 					await userUpdater.updateAccountsNewOrder();
// 				} else if (numOfErrs > 0) {
// 					return;
// 				}
// 			}

// 			// Qui possibile Ric...
// 		} catch (error) {
// 			res.status(404).json({ message: "Problem occured" });
// 			next(error);
// 		}
// 	}
// );

// router.put(
// 	"/:ordNum",
// 	celebrate({
// 		[Segments.BODY]: Joi.object({
// 			orderId: Joi.string().trim(),
// 			users: Joi.array().items(
// 				Joi.object({
// 					username: Joi.string().trim(),
// 					products: Joi.array().items(
// 						Joi.object({
// 							productname: Joi.string().trim(),
// 							quantity: Joi.number().greater(0).integer()
// 						})
// 					)
// 				})
// 			),
// 			// createdAt: Joi.date().default(Date.now).required(),
// 			totalcost: Joi.number(),
// 			shipped: Joi.boolean(),
// 			date: Joi.date()
// 		})
// 	}),
// 	async (req, res, next) => {
// 		try {
// 			const data = await req.body;
// 			const orderNumber = await req.params.ordNum;
// 			const orderId = `order${String(orderNumber)}`;

// 			const orderChanged = await Order.findOneAndUpdate(
// 				{ orderId: orderId },
// 				data,
// 				{
// 					new: true
// 				}
// 			);

// 			res.status(200).json(orderChanged);
// 		} catch (error) {
// 			next(error);
// 		}
// 	}
// );

// router.delete(
// 	"/:ordNum",
// 	celebrate({
// 		[Segments.BODY]: Joi.object({
// 			orderId: Joi.string().trim(),
// 			users: Joi.array().items(
// 				Joi.object({
// 					username: Joi.string().trim(),
// 					products: Joi.array().items(
// 						Joi.object({
// 							productname: Joi.string().trim(),
// 							quantity: Joi.number().greater(0).integer()
// 						})
// 					)
// 				})
// 			),
// 			// createdAt: Joi.date().default(Date.now).required(),
// 			totalcost: Joi.number(),
// 			shipped: Joi.boolean(),
// 			date: Joi.date()
// 		})
// 	}),
// 	async (req, res, next) => {
// 		try {
// 			const orderNumber = await req.params.ordNum;
// 			const orderId = `order${String(orderNumber)}`;
// 			const orderRemoved = await Order.findOneAndDelete({ orderid: orderId });

// 			const userUpdater = new UserUpdaterClass(
// 				await orderRemoved,
// 				User,
// 				Order,
// 				res
// 			);
// 			const prodUpdater = new ProductUpdaterClass(
// 				await orderRemoved,
// 				Product,
// 				Order,
// 				res
// 			);
// 			const updates = await userUpdater.updateAccountsDelOrder();
// 			const restores = await prodUpdater.restoreQuantities();

// 			res.status(200).json(orderRemoved);
// 		} catch (error) {
// 			next(error);
// 		}
// 	}
// );

// router.get("/", async (req, res, next) => {
// 	try {
// 		const savedProducts = await Product.find({});
// 		res.json(savedProducts);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.get("/:prodId", async (req, res, next) => {
// 	try {
// 		const prodId = await req.params.prodId;
// 		const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(
// 			1
// 		)}`;
// 		Product.find({ name: label }, (err, data) => {
// 			// gestire error con 404 o altro
// 			res.json(data);
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.post(
// 	"/",
// 	celebrate({
// 		[Segments.BODY]: Joi.object({
// 			name: Joi.string().required(),
// 			quantity: Joi.number().integer().greater(0).required(),
// 			origin: Joi.string().required(),
// 			price: Joi.number().precision(2).required()
// 		})
// 	}),
// 	async (req, res, next) => {
// 		try {
// 			const data = await req.body;
// 			const productExists = await Product.findOne({
// 				name: data["name"]
// 			});
// 			if (productExists == null) {
// 				const newProduct = new Product(await data);
// 				newProduct.save((err, doc) => {
// 					if (err) {
// 						console.log(err);
// 					}
// 					console.log("Data entered");
// 				});
// 				res.json(newProduct);
// 			} else {
// 				res.json({
// 					message: `The product ${data["name"]} already exists.`
// 				});
// 			}
// 		} catch (error) {
// 			next(error);
// 		}
// 	}
// );

// router.put(
// 	"/:prodId",
// 	celebrate({
// 		[Segments.BODY]: Joi.object({
// 			name: Joi.string(),
// 			quantity: Joi.number().integer().greater(0),
// 			origin: Joi.string()
// 		})
// 	}),
// 	async (req, res, next) => {
// 		try {
// 			const data = await req.body;
// 			const prodId = await req.params.prodId;
// 			const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(
// 				1
// 			)}`;
// 			const productChanged = await Product.findOneAndUpdate(
// 				{ name: label },
// 				data,
// 				{
// 					new: true
// 				}
// 			);
// 			res.json(productChanged);
// 		} catch (error) {
// 			next(error);
// 		}
// 	}
// );

// router.get("/", async (req, res, next) => {
// 	try {
// 		const accounts = await User.find({});
// 		res.json(accounts);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.get("/:userid", async (req, res, next) => {
// 	try {
// 		const username = await req.params.userid;
// 		console.log(username);
// 		User.find({ username: username }, (err, data) => {
// 			// gestire error
// 			console.log(data);
// 			res.json(data);
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.post(
// 	"/",
// 	celebrate({
// 		[Segments.BODY]: Joi.object({
// 			firstname: Joi.string().required(),
// 			lastname: Joi.string().required(),
// 			username: Joi.string().required(),
// 			address: Joi.string().email().required(),
// 			// createdAt: Joi.date().default(Date.now).required(),
// 			orders: Joi.array()
// 				.items(
// 					Joi.object({
// 						orderid: Joi.string().required(),
// 						url: Joi.string().required()
// 					})
// 				)
// 				.required()
// 		})
// 	}),
// 	async (req, res, next) => {
// 		try {
// 			const data = await req.body;
// 			const userExists = await User.findOne({
// 				username: data["username"]
// 			});
// 			if (userExists == null) {
// 				const newUser = new User(await data);
// 				newUser.save((err, doc) => {
// 					if (err) {
// 						console.log(err);
// 					}
// 					res.json(newUser);
// 				});
// 			} else {
// 				res.json({
// 					message: `The user ${data["username"]} already exists.`
// 				});
// 			}
// 		} catch (error) {
// 			next(error);
// 		}
// 	}
// );

// router.put(
// 	"/:username",
// 	celebrate({
// 		[Segments.BODY]: Joi.object({
// 			firstname: Joi.string(),
// 			lastname: Joi.string(),
// 			username: Joi.string().required(),
// 			address: Joi.string().email(),
// 			// createdAt: Joi.date().default(Date.now).required(),
// 			orders: Joi.array().items(
// 				Joi.object({
// 					orderid: Joi.string(),
// 					url: Joi.string()
// 				})
// 			)
// 		})
// 	}),
// 	async (req, res, next) => {
// 		try {
// 			const username = await req.params.username;
// 			const data = await req.body;
// 			const userChanged = await User.findOneAndUpdate(
// 				{
// 					username: username
// 				},
// 				data,
// 				{
// 					new: true
// 				}
// 			);
// 			res.json(userChanged);
// 		} catch (error) {
// 			next(error);
// 		}
// 	}
// );

// router.delete(
// 	"/:username",
// 	celebrate({
// 		[Segments.BODY]: Joi.object({
// 			firstname: Joi.string(),
// 			lastname: Joi.string(),
// 			username: Joi.string().required(),
// 			address: Joi.string().email(),
// 			orders: Joi.array().items(
// 				Joi.object({
// 					orderid: Joi.string(),
// 					url: Joi.string()
// 				})
// 			)
// 		})
// 	}),
// 	async (req, res, next) => {
// 		try {
// 			const username = req.params.username;
// 			const userRemoved = await User.findOneAndDelete({
// 				username: username
// 			});
// 			res.json(userRemoved);
// 		} catch (error) {
// 			next(error);
// 		}
// 	}
// );

// -------- from test index.js -----------

// describe("61529619", () => {
// 	it("should pass", () => {
// 		const routerStub = {
// 			// route: sinon.stub().returnsThis(),
// 			post: sinon.stub(router, "post").returnsThis(),
// 			get: sinon.stub(router, "get").returnsThis(),
// 			put: sinon.stub(router, "put").returnsThis(),
// 			delete: sinon.stub(router, "delete").returnsThis()
// 		};
// 		sinon.stub(express, "Router").callsFake(() => routerStub);
// 		// require("./router");
// 		// sinon.assert.calledWith(routerStub.route, "/");
// 		// sinon.assert.calledWith(routerStub.route, "/:id");
// 		sinon.assert.calledWith(routerStub.get, "/orders-archieve/");
// 		sinon.assert.calledWith(routerStub.post, "/orders-archieve/");
// 		sinon.assert.calledWith(routerStub.put, "/orders-archieve/");
// 		sinon.assert.calledWith(routerStub.delete, "/orders-archieve/");
// 	});
// });

// <---- provare ad aggiungere per post get put delete .yields per...
// aggiungere arguments

// describe("test classes", async () => {
// 	const sandbox = sinon.createSandbox();
// 	before(() => {
// 		const stub = sinon
// 			.stub(router, "get")
// 			.yields(
// 				{ params: testProdGet },
// 				JSON.stringify({ name: "Strawberries", quantity: 23, price: 20.23 }),
// 				null
// 			);
// 	});
// before(() => {
// 	const stub = sinon.createStubInstance(OrderManagerClass);
// 	// console.log(stub);
// 	// stub.parametersHandling();

// 	// sandbox.spy(OrderManagerClass);
// 	// sandbox.spy(ProductUpdaterClass);
// 	// sandbox.spy(UserUpdaterClass);
// });
// it("Should test OrderManagerClass", () => {
// 	router.get("/orders-archieve/", (req, res, next) => {
// 		const orderManager = new OrderManagerClass(
// 			res,
// 			res,
// 			"productname",
// 			"strawberries",
// 			"orderid",
// 			"decreasing"
// 		);
// 		orderManager.parametersHandling();
// 	});
// });
// it('should respond with JSON data', function (done) {
// const testProdGet = "Strawberries";

// request(router)
//   .get(`/orders-archieve/${testProdGet}`)
//   .expect(200)
//   .end(function (err, response) {
//     assert.equal(response.header['content-type'], 'application/json; charset=utf-8');
//     assert.deepEqual(response.body, { name: "Strawberries", quantity: 23, price: 20.23 });
// 		done();

//   });
// });

// if (!req.body) {
// 	res.status(200).json({
// 		message: `For post an order please use this JSON structure in the request body: {
// 				"orderid": String,
// 				"users": [
// 					{
// 						"username": String,
// 						"products": [
// 							{
// 								"productname": String,
// 								"quantity": Number
// 							}
// 						],
// 						"cost": Number (Automatically added)
// 					}
// 				],
// 				"totalcost": Number (Automatically added),
// 				"shipped": Boolean,
// 				"date": (Automatically added)
// 			}`
// 	});
// }

// da getOnePRoduct

// Product.findOne({ name: label }, (err, data) => {
// 	console.log(data);
// 	// gestire error con 404 o altro
// 	if (err) {
// 		res.status(400).json({
// 			message: `Error in searching ${prodId}`
// 		});
// 	} else if (data == null) {
// 		res.status(200).json({
// 			message: `${prodId} not exists`
// 		});
// 	} else {
// 		res.status(200).json(data);
// 		// console.log(res);
// 	}
// 	// res.status(200).json(data);
// });

// if (Object.keys(existCheckStub).length > 0) {
// 	res.status(200).json(existCheckStub);
// } else if (orderExistStub !== null) {
// 	res.status(200).json({
// 		message: "OrderId already exists"
// 	});
// } else {
// const searchProdStub = sinon.stub(prodUpdater, "searchprod");
// console.log(searchProdStub());
// prodUpdater.searchProd();
// const createResultsStub = sinon.stub(prodUpdater, "createResults");
// prodUpdater.createResults();
// createResultsStub();
// console.log("Here");
// console.log(prodUpdater.negativeArr);
// const numOfErrsStub = sinon.stub(prodUpdater, "createNewOrder");
// 	// const numOfErrs = await prodUpdater.createNewOrder();
// 	if (numOfErrsStub == 0) {
// 		const updateAccStub = sinon.stub(
// 			userUpdater,
// 			"updateAccountsNewOrder"
// 		);
// 	} else if (numOfErrsStub > 0) {
// 		return;
// 	}
// }
// } catch {
// 	res.status(404).json({ message: "Problem occured" });
// }

// userCheck.then(() => {
// 	sinon.assert.match
// })
// console.log(existCheck);
// console.log("Testing");
// const stubThree = sinon.stub(prodUpdater, "searchProd").resolves();

// stubThree.callsFake(() => {
// 	return [
// 		{ productname: "Watermelon", response: "positive", quantity: 23 },
// 		{ productname: "Strawberries", response: "positive", quantity: 23 },
// 		{ productname: "Watermelon", response: "positive", quantity: 23 },
// 		{ productname: "Strawberries", response: "positive", quantity: 23 }
// 	];
// });

// prodUpdater.searchProd().then((result) => {
// 	sinon.assert.match(result, [
// 		{ productname: "Watermelon", response: "positive", quantity: 23 },
// 		{ productname: "Strawberries", response: "positive", quantity: 23 },
// 		{ productname: "Watermelon", response: "positive", quantity: 23 },
// 		{ productname: "Strawberries", response: "positive", quantity: 23 }
// 	]);
// });

// console.log(stubTest);

// const orderExistStub = sinon.stub(prodUpdater, "orderExistsCheck");

// userUpdater.usersExistCheck();

// DA QUI ----> Order findOneAndDelete

// it("Mock every method", () => {
// 	// sinon.mock(Product).expects("save").withArgs(err, docs).resolves({
// 	// 	name: "Strawberries",
// 	// 	quantity: 23000,
// 	// 	origin: "Italy",
// 	// 	price: 20.23
// 	// });
// 	// sinon.mock(Product).expects("findOne").withArgs({ name: label }).resolves({
// 	// 	name: "Strawberries",
// 	// 	quantity: 23000,
// 	// 	origin: "Italy",
// 	// 	price: 20.23
// 	// });
// });

// sinon
// 	.mock(Order)
// 	.expects("findOne")
// 	.withArgs({ orderid: "order000001" })
// 	.resolves({
// 		orderid: "order000001",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: false,
// 		date: "2022-09-06T21:55:50.076+00:00",
// 		totalcost: 2000
// 	});

// const stubvalue = {
// 	message: "OrderId already exists"
// };

// const mock = sinon.mock(res);
// mock.expects("send").withExactArgs(stubvalue);
// postOneOrder(req, res);

const prodUpStub = sinon.createStubInstance(ProductUpdaterClass);
await prodUpStub.withArgs(req.body, Product, Order, res);

// sinon
// 	.mock(prodUpStub.orderModel)
// 	.expects("findOne")
// 	.withArgs({
// 		orderid: "order000001"
// 	})
// 	.resolves({
// 		orderid: "order000001",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: false,
// 		date: "2022-09-06T21:55:50.076+00:00",
// 		totalcost: 2000
// 	});

// prodUpStub.orderExistsCheck.returns({
// 	orderid: "order000001",
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: false,
// 	date: "2022-09-06T21:55:50.076+00:00",
// 	totalcost: 2000
// });

// const stub = sinon.stub(Order, "findOne").callsFake(() => {
// 	return {
// 		orderid: "order000001",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: false,
// 		date: "2022-09-06T21:55:50.076+00:00",
// 		totalcost: 2000
// 	};
// });

// console.log(stub);

// expect(stub.calledOnce).to.be.true;
// mock.verify();
// stub.restore();

// prodUpStub.createNewOrder.returns({
// 	orderid: "order000001",
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: false,
// 	date: "2022-09-06T21:55:50.076+00:00",
// 	totalcost: 2000
// });

// ----------HERE------------
// const stubTest = sinon.stub(Order, "findOne").callsFake((callback) => {
// 	callback(null, stubvalue);
// });

// expect(stubTest.calledOnce).to.be.true;

// const mockOrderFindOne = sinon
// 	.mock(prodUpStub.orderModel)
// 	.expects("findOne")
// 	.withArgs({
// 		orderid: "order000001"
// 	})
// 	.resolves(null);

// // ----------HERE------------
// prodUpStub.orderModel.findOne({
// 	orderid: "order000001"
// });
// mockOrderFindOne.verify();
// stubTest.restore();

// stub(prodUpdater, "orderExistsCheck").callsFake();

// prodUpdater.orderExistsCheck();
// const userUpdater = new UserUpdaterClass(req.body, User, Order, res);

// const userClass = sinon.spy(UserUpdaterClass);
// userClass.withArgs(req.body, User, Order, res);

// const userUpdater = new userClass();

// const existCheckStub = sinon.stub(userUpdater, "usersExistCheck");

// const orderManager = sinon.createStubInstance(OrderManagerClass, {
// 	determinate: sinon.stub().returnsThis(),
// 	ordering: sinon.stub().returnsThis(),
// 	createResponse: sinon.stub().returnsThis(),
// 	noProducts: sinon.stub().returnsThis(),
// 	parametersHandling: sinon.stub().returnsThis()
// });
// const orderManager = sinon.createStubInstance(OrderManagerClass, {
// 	determinate: sinon.stub().returnsThis(),
// 	ordering: sinon.stub().returnsThis(),
// 	createResponse: sinon.stub().returnsThis(),
// 	noProducts: sinon.stub().returnsThis(),
// 	parametersHandling: sinon.stub().returnsThis()
// });

// const mock = sinon.mock(res);
// mock.expects("send").withExactArgs(stubvalue);

// prodUpStub.orderExistsCheck.returns(null);
// const results = prodUpStub.searchProd.returns(
// 	{ productname: "Watermelon", response: "positive", quantity: 23 },
// 	{ productname: "Strawberries", response: "positive", quantity: 23 },
// 	{ productname: "Watermelon", response: "positive", quantity: 23 },
// 	{ productname: "Strawberries", response: "positive", quantity: 23 }
// );

// prodUpStub.createResults.returns();
// prodUpStub.results = prodUpStub.permissions;

// const orderManager = sinon.createStubInstance(OrderManagerClass, {
// 	determinate: sinon.stub().returnsThis(),
// 	ordering: sinon.stub().returnsThis(),
// 	createResponse: sinon.stub().returnsThis(),
// 	noProducts: sinon.stub().returnsThis(),
// 	parametersHandling: sinon.stub().returnsThis()
// });
// const prodUpStub = sinon.createStubInstance(ProductUpdaterClass);

// const userUpdater = new userClass();
// ---- adattato a UserUpdaterClass sostituire con -> const prodUpStub = sinon.createStubInstance(ProductUpdaterClass);
// prodUpStub.withArgs(req.body, Product, Order, res);
// userUpdater.updateAccountsNewOrder();

// userUpdater.findData();
// const stubTwo = sinon.stub(userUpdater, "usersExistCheck").resolves();
// userUpdater.usersExistCheck();

// const resultsCreated = await prodUpdater.createResults();
// const numOfErrs = await prodUpdater.createNewOrder();
// const orderUpdater = await userUpdater.updateAccountsNewOrder();

// const mockProdExCh = sinon
// 	.mock(prodUpStub)
// 	.expects("updateAccountsDelOrder")
// 	.resolves(null);

// prodUpStub.orderExistsCheck();
// mockProdExCh.verify();

// const results = prodUpStub.searchProd.returns(
// 	{ productname: "Watermelon", response: "positive", quantity: 23 },
// 	{ productname: "Strawberries", response: "positive", quantity: 23 },
// 	{
// 		productname: "Watermelon",
// 		response: "negative",
// 		message: "Too little quantity of Strawberries"
// 	},
// 	{ productname: "Strawberries", response: "positive", quantity: 23 }
// );

// prodUpStub.negativeArr = [
// 	{ message: "Too little quantity of Strawberries" }
// ];

// for await (let elem of results) {
// 	prodUpStub.negativeArr.push({
// 		message: elem["message"]
// 	});
// 	// prodUpStub.totalprice = 1000;
// }

// prodUpStub.createNewOrder.returns({
// 	message1: `Too little quantity of Strawberries`
// });
// prodUpStub.createResults.returns();
// prodUpStub.results = prodUpStub.permissions;
// prodUpStub.negativeArr = [];
// prodUpStub.createNewOrder.returns({
// 	orderid: "order000001",
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: false,
// 	date: "2022-09-06T21:55:50.076+00:00",
// 	totalcost: 2000
// });

// ----------HERE------------
// const stubTest = sinon.stub(Order, "findOne").callsFake((callback) => {
// 	callback(null, stubvalue);
// });

// expect(stubTest.calledOnce).to.be.true;

// // ----------HERE------------

// // mock.verify();
// stubTest.restore();

// const existCheckStub = sinon.stub(userUpdater, "usersExistCheck");
// // stub(prodUpdater, "orderExistsCheck").callsFake();

// // prodUpdater.orderExistsCheck();
// const userUpdater = new UserUpdaterClass(req.body, User, Order, res);
// // ---- adattato a UserUpdaterClass sostituire con -> const prodUpStub = sinon.createStubInstance(ProductUpdaterClass);
// // prodUpStub.withArgs(req.body, Product, Order, res);
// userUpdater.updateAccountsNewOrder();

// userUpdater.findData();
// // const stubTwo = sinon.stub(userUpdater, "usersExistCheck").resolves();
// userUpdater.usersExistCheck();

// const results = await prodUpdater.createResults();
// const numOfErrs = await prodUpdater.createNewOrder();
// const orderUpdater = await userUpdater.updateAccountsNewOrder();

// const mock = sinon.mock(res);
// mock.expects("send").withExactArgs(stubvalue);
// prodUpStub.orderExistsCheck.returns(null);

// const prodUpdater = new ProductUpdaterClass(
// 	req.body,
// 	Product,
// 	Order,
// 	res
// );

// const prodUpStub = sinon.stub(ProductUpdaterClass).callsFake(() => {
// 	return new ProductUpdaterClass(req.body, Product, Order, res);
// });

// const req = mockRequest(
// 	JSON.stringify({
// 		orderid: "order000001",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: false,
// 		date: "2022-09-06T21:55:50.076+00:00",
// 		totalcost: 2000
// 	})
// );
// const res = mockResponse();

// orderManager.response = res;
// 			orderManager.data = res;
// 			orderManager.filterQuery = "productname";
// 			orderManager.valueQuery = "strawberries";
// 			orderManager.orderByQuery = "orderid";
// 			orderManager.sortQuery = undefined;
// 			// 	res,
// 			// 	res,
// 			// 	"productname",
// 			// 	"strawberries",
// 			// 	"orderid",
// 			// 	undefined

// 			orderManager.determinate();
// 			orderManager.ordering();
// 			orderManager.createResponse();
// 			orderManager.noProducts();
// 			orderManager.parametersHandling();

// 			// orderManager.resolves();

// 			const secondOrderManager = sinon.createStubInstance(OrderManagerClass, {
// 				determinate: sinon.stub().returnsThis(),
// 				ordering: sinon.stub().returnsThis(),
// 				createResponse: sinon.stub().returnsThis(),
// 				noProducts: sinon.stub().returnsThis(),
// 				parametersHandling: sinon.stub().returnsThis()
// 			});

// 			secondOrderManager.response = res;
// 			secondOrderManager.data = res;
// 			secondOrderManager.filterQuery = "productname";
// 			secondOrderManager.valueQuery = "strawberries";
// 			secondOrderManager.orderByQuery = "orderid";
// 			secondOrderManager.sortQuery = "decreasing";

// 			secondOrderManager.determinate();
// 			secondOrderManager.ordering();
// 			secondOrderManager.createResponse();
// 			secondOrderManager.noProducts();
// 			secondOrderManager.parametersHandling();

// 			const thirdOrderManager = sinon.createStubInstance(OrderManagerClass, {
// 				determinate: sinon.stub().returnsThis(),
// 				ordering: sinon.stub().returnsThis(),
// 				createResponse: sinon.stub().returnsThis(),
// 				noProducts: sinon.stub().returnsThis(),
// 				parametersHandling: sinon.stub().returnsThis()
// 			});

// 			thirdOrderManager.response = res;
// 			thirdOrderManager.data = res;
// 			thirdOrderManager.filterQuery = undefined;
// 			thirdOrderManager.valueQuery = undefined;
// 			thirdOrderManager.orderByQuery = undefined;
// 			thirdOrderManager.sortQuery = undefined;

// 			thirdOrderManager.determinate();
// 			thirdOrderManager.ordering();
// 			thirdOrderManager.createResponse();
// 			thirdOrderManager.noProducts();
// 			thirdOrderManager.parametersHandling();

// 			const fourthOrderManager = sinon.createStubInstance(OrderManagerClass, {
// 				determinate: sinon.stub().returnsThis(),
// 				ordering: sinon.stub().returnsThis(),
// 				createResponse: sinon.stub().returnsThis(),
// 				noProducts: sinon.stub().returnsThis(),
// 				parametersHandling: sinon.stub().returnsThis()
// 			});

// 			fourthOrderManager.response = res;
// 			fourthOrderManager.data = res;
// 			fourthOrderManager.filterQuery = "date";
// 			fourthOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
// 			fourthOrderManager.orderByQuery = "orderid";
// 			fourthOrderManager.sortQuery = "increasing";

// 			fourthOrderManager.determinate();
// 			fourthOrderManager.ordering();
// 			fourthOrderManager.createResponse();
// 			fourthOrderManager.noProducts();
// 			fourthOrderManager.parametersHandling();

// 			const fifthOrderManager = sinon.createStubInstance(OrderManagerClass, {
// 				determinate: sinon.stub().returnsThis(),
// 				ordering: sinon.stub().returnsThis(),
// 				createResponse: sinon.stub().returnsThis(),
// 				noProducts: sinon.stub().returnsThis(),
// 				parametersHandling: sinon.stub().returnsThis()
// 			});

// 			fifthOrderManager.response = res;
// 			fifthOrderManager.data = res;
// 			fifthOrderManager.filterQuery = "shipped";
// 			fifthOrderManager.valueQuery = true;
// 			fifthOrderManager.orderByQuery = "orderid";
// 			fifthOrderManager.sortQuery = "increasing";

// 			fifthOrderManager.determinate();
// 			fifthOrderManager.ordering();
// 			fifthOrderManager.createResponse();
// 			fifthOrderManager.noProducts();
// 			fifthOrderManager.parametersHandling();

// 			const sixthOrderManager = sinon.createStubInstance(OrderManagerClass, {
// 				determinate: sinon.stub().returnsThis(),
// 				ordering: sinon.stub().returnsThis(),
// 				createResponse: sinon.stub().returnsThis(),
// 				noProducts: sinon.stub().returnsThis(),
// 				parametersHandling: sinon.stub().returnsThis()
// 			});

// 			sixthOrderManager.response = res;
// 			sixthOrderManager.data = res;
// 			sixthOrderManager.filterQuery = "orderid";
// 			sixthOrderManager.valueQuery = "order00001";
// 			sixthOrderManager.orderByQuery = "orderid";
// 			sixthOrderManager.sortQuery = "increasing";

// 			sixthOrderManager.determinate();
// 			sixthOrderManager.ordering();
// 			sixthOrderManager.createResponse();
// 			sixthOrderManager.noProducts();
// 			sixthOrderManager.parametersHandling();

// 			// const seventhOrderManager = sinon.createStubInstance(OrderManagerClass, {
// 			// 	determinate: sinon.stub().returnsThis(),
// 			// 	ordering: sinon.stub().returnsThis(),
// 			// 	createResponse: sinon.stub().returnsThis(),
// 			// 	noProducts: sinon.stub().returnsThis(),
// 			// 	parametersHandling: sinon.stub().returnsThis()
// 			// });

// 			// seventhOrderManager.response = res;
// 			// seventhOrderManager.data = res;
// 			// seventhOrderManager.filterQuery = "orderid";
// 			// seventhOrderManager.valueQuery = "order00001";
// 			// seventhOrderManager.orderByQuery = undefined;
// 			// seventhOrderManager.sortQuery = undefined;

// 			// seventhOrderManager.determinate();
// 			// seventhOrderManager.ordering();
// 			// seventhOrderManager.createResponse();
// 			// seventhOrderManager.noProducts();
// 			// seventhOrderManager.parametersHandling();

// 			// const eightOrderManager = sinon.createStubInstance(OrderManagerClass, {
// 			// 	determinate: sinon.stub().returnsThis(),
// 			// 	ordering: sinon.stub().returnsThis(),
// 			// 	createResponse: sinon.stub().returnsThis(),
// 			// 	noProducts: sinon.stub().returnsThis(),
// 			// 	parametersHandling: sinon.stub().returnsThis()
// 			// });

// 			// eightOrderManager.response = res;
// 			// eightOrderManager.data = res;
// 			// eightOrderManager.filterQuery = "date";
// 			// eightOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
// 			// eightOrderManager.orderByQuery = undefined;
// 			// eightOrderManager.sortQuery = undefined;

// 			// eightOrderManager.determinate();
// 			// eightOrderManager.ordering();
// 			// eightOrderManager.createResponse();
// 			// eightOrderManager.noProducts();
// 			// eightOrderManager.parametersHandling();

// const mockMongoose = sinon
// 	.mock(Order)
// 	.expects("find")
// 	.withArgs({})
// 	.resolves([
// 		{
// 			orderid: "order000001",
// 			users: [
// 				{
// 					username: "UserOne",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		},
// 		{
// 			orderid: "order000002",
// 			users: [
// 				{
// 					username: "UserTwo",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		}
// 	]);

// describe("Test Testing Class", async () => {
// 	function testClass() {
// 		new ProductUpdaterClass(
// 			JSON.parse({
// 				orderid: "order000002",
// 				users: [
// 					{
// 						username: "UserOne",
// 						products: [
// 							{
// 								productname: "Watermelon",
// 								quantity: 23
// 							},
// 							{
// 								productname: "Strawberries",
// 								quantity: 23
// 							}
// 						]
// 					}
// 				],
// 				shipped: false
// 			}),
// 			Product,
// 			Order,
// 			null
// 		);
// 	}
// });

// describe("Stub router Get /", async () => {
// 	const req = mockRequest();
// 	const res = mockResponse();
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			null,
// 			JSON.stringify({
// 				message: "Welcome to Planty of Food API."
// 			})
// 		);
// 	});
// 	it("Stub for router get /", async () => {
// 		router.get("/", () => {
// 			//  req = sinon.mock
// 			expect("Content-Type", /json/);
// 			expect(200);

// 			// const resStub = sinon.stub(router.get, "res");
// 			// resStub.status(200).json({ message: "Welcome to Planty of Food API." });

// 			// importante
// 			sinon.assert.calledWith(router.get, "/");
// 			// importante
// 			assert.match(
// 				res,
// 				JSON.stringify({
// 					message: "Welcome to Planty of Food API."
// 				})
// 			);
// 			expect(res.status.calledWith(200));
// 		});
// 	});
// 	after(() => {
// 		router.get.restore();
// 	});
// });

// describe("Testing mongoose Model methods", () => {
// 	it("Mock Product Model find({}) method", () => {
// 		const mockProdFind = sinon
// 			.mock(Product)
// 			.expects("find")
// 			.withArgs({})
// 			.resolves([
// 				{
// 					name: "Strawberries",
// 					quantity: 23000,
// 					origin: "Italy",
// 					price: 20.23
// 				},
// 				{
// 					name: "Pineapples",
// 					quantity: 10000,
// 					price: 23.23
// 				},
// 				{
// 					name: "Apples",
// 					quantity: 10000,
// 					price: 23.32
// 				}
// 			]);
// 		// mockProductFind.resolves();
// 		Product.find({});
// 		mockProdFind.verify();
// 		// mockProdFind.restore();
// 	});

// 	it("Mock Product Model findOne( { name: } ) method", () => {
// 		const mockProdFindOne = sinon
// 			.mock(Product)
// 			.expects("findOne")
// 			.withArgs({ name: "Strawberries" })
// 			.resolves({
// 				name: "Strawberries",
// 				quantity: 23000,
// 				origin: "Italy",
// 				price: 20.23
// 			});
// 		Product.findOne({ name: "Strawberries" });
// 		mockProdFindOne.verify();
// 	});

// 	it("Mock Product Model findOneAndUpdate( { name: }, {field: newValue} ) method", () => {
// 		const mockUserFindUpdate = sinon
// 			.mock(Product)
// 			.expects("findOneAndUpdate")
// 			.withArgs({ name: "Strawberries" }, { quantity: 23 })
// 			.resolves({
// 				name: "Strawberries",
// 				quantity: 23,
// 				origin: "Italy",
// 				price: 20.23
// 			});
// 		mockUserFindUpdate.resolves();
// 	});

// 	it("Mock Product Model findOneAndDelete( { name: value } ) method", () => {
// 		const mockProductFindDelete = sinon
// 			.mock(Product)
// 			.expects("findOneAndDelete")
// 			.withArgs({ name: "Strawberries" })
// 			.resolves({
// 				name: "Strawberries",
// 				quantity: 23000,
// 				origin: "Italy",
// 				price: 20.23
// 			});
// 		mockProductFindDelete.resolves();
// 	});

// 	it("Mock User Model find({}) method", () => {
// 		const mockUserFind = sinon
// 			.mock(User)
// 			.expects("find")
// 			.withArgs({})
// 			.resolves([
// 				{
// 					firstname: "userTestOne",
// 					lastname: "for Sinon Testing",
// 					username: "User1",
// 					address: "test@sinon.com",
// 					orders: [
// 						{
// 							orderid: "00001",
// 							url: "none"
// 						}
// 					]
// 				},
// 				{
// 					firstname: "userTestTwo",
// 					lastname: "for Sinon Testing",
// 					username: "User2",
// 					address: "test@sinon.com",
// 					orders: [
// 						{
// 							orderid: "00002",
// 							url: "none"
// 						}
// 					]
// 				},
// 				{
// 					firstname: "UserFromInsomnia",
// 					lastname: "for Sinon Testing",
// 					username: "User3",
// 					address: "test@sinon.com",
// 					orders: [
// 						{
// 							orderid: "00003",
// 							url: "none"
// 						}
// 					]
// 				}
// 			]);
// 		mockUserFind.resolves();
// 	});

// 	// it("Mock User Model findOne( { username: value } ) method", () => {
// 	// 	const mockUserFindOne = sinon
// 	// 		.mock(User)
// 	// 		.expects("findOne")
// 	// 		.withArgs({ username: "UserOne" })
// 	// 		.resolves({
// 	// 			firstname: "userTestOne",
// 	// 			lastname: "for Sinon Testing",
// 	// 			username: "User1",
// 	// 			address: "test@sinon.com",
// 	// 			orders: [
// 	// 				{
// 	// 					orderid: "00001",
// 	// 					url: "none"
// 	// 				}
// 	// 			]
// 	// 		});
// 	// 	mockUserFindOne.resolves();
// 	// 	mockUserFindOne.restore();
// 	// });

// 	// it("Mock User Model findOneAndUpdate ( { username: value } , {value: newValue} ) method", () => {
// 	// 	sinon
// 	// 		.mock(User)
// 	// 		.expects("findOneAndUpdate")
// 	// 		.withArgs({ username: "UserOne" }, { orders: [] })
// 	// 		.resolves({
// 	// 			firstname: "userTestOne",
// 	// 			lastname: "for Sinon Testing",
// 	// 			username: "User1",
// 	// 			address: "test@sinon.com",
// 	// 			orders: []
// 	// 		});
// 	// });

// 	it("Mock User Model findOneAndDelete ( { username: value } ) method", () => {
// 		const mockUserFindDelete = sinon
// 			.mock(User)
// 			.expects("findOneAndDelete")
// 			.withArgs({ username: "UserOne" })
// 			.resolves({
// 				firstname: "userTestOne",
// 				lastname: "for Sinon Testing",
// 				username: "User1",
// 				address: "test@sinon.com",
// 				orders: []
// 			});
// 		mockUserFindDelete.resolves();
// 	});

// 	it("Mock Order Model find({})", () => {
// 		sinon
// 			.mock(Order)
// 			.expects("find")
// 			.withArgs({})
// 			.resolves([
// 				{
// 					orderid: "order000001",
// 					users: [
// 						{
// 							username: "UserOne",
// 							products: [
// 								{
// 									productname: "Watermelon",
// 									quantity: 23
// 								},
// 								{
// 									productname: "Strawberries",
// 									quantity: 23
// 								}
// 							]
// 						}
// 					],
// 					shipped: false,
// 					date: "2022-09-06T21:55:50.076+00:00",
// 					totalcost: 2000
// 				},
// 				{
// 					orderid: "order000002",
// 					users: [
// 						{
// 							username: "UserTwo",
// 							products: [
// 								{
// 									productname: "Watermelon",
// 									quantity: 23
// 								},
// 								{
// 									productname: "Strawberries",
// 									quantity: 23
// 								}
// 							]
// 						}
// 					],
// 					shipped: false,
// 					date: "2022-09-06T21:55:50.076+00:00",
// 					totalcost: 2000
// 				}
// 			]);
// 	});

// 	// it("Mock Order Model findOne( { orderid: value } )", () => {
// 	// 	sinon
// 	// 		.mock(Order)
// 	// 		.expects("findOne")
// 	// 		.withArgs({ orderid: "order000001" })
// 	// 		.resolves({
// 	// 			orderid: "order000001",
// 	// 			users: [
// 	// 				{
// 	// 					username: "UserOne",
// 	// 					products: [
// 	// 						{
// 	// 							productname: "Watermelon",
// 	// 							quantity: 23
// 	// 						},
// 	// 						{
// 	// 							productname: "Strawberries",
// 	// 							quantity: 23
// 	// 						}
// 	// 					]
// 	// 				}
// 	// 			],
// 	// 			shipped: false,
// 	// 			date: "2022-09-06T21:55:50.076+00:00",
// 	// 			totalcost: 2000
// 	// 		});
// 	// });

// 	// it("Mock Order Model findOneAndUpdate( { orderid: value }, { value: newValue} )", () => {
// 	// 	sinon
// 	// 		.mock(Order)
// 	// 		.expects("findOneAndUpdate")
// 	// 		.withArgs(
// 	// 			{
// 	// 				orderid: "order000001"
// 	// 			},
// 	// 			{
// 	// 				orderid: "order000001",
// 	// 				users: [
// 	// 					{
// 	// 						username: "UserOne",
// 	// 						products: [
// 	// 							{
// 	// 								productname: "Watermelon",
// 	// 								quantity: 23
// 	// 							},
// 	// 							{
// 	// 								productname: "Strawberries",
// 	// 								quantity: 23
// 	// 							}
// 	// 						]
// 	// 					}
// 	// 				],
// 	// 				shipped: true,
// 	// 				date: "2022-09-06T21:55:50.076+00:00",
// 	// 				totalcost: 2000
// 	// 			}
// 	// 		)
// 	// 		.resolves({
// 	// 			orderid: "order000001",
// 	// 			users: [
// 	// 				{
// 	// 					username: "UserOne",
// 	// 					products: [
// 	// 						{
// 	// 							productname: "Watermelon",
// 	// 							quantity: 23
// 	// 						},
// 	// 						{
// 	// 							productname: "Strawberries",
// 	// 							quantity: 23
// 	// 						}
// 	// 					]
// 	// 				}
// 	// 			],
// 	// 			shipped: true,
// 	// 			date: "2022-09-06T21:55:50.076+00:00",
// 	// 			totalcost: 2000
// 	// 		});
// 	// });

// 	// it("Mock Order Model findOneAndDelete( { orderid: value }, { value: newValue} )", () => {
// 	// 	sinon
// 	// 		.mock(Order)
// 	// 		.expects("findOneAndDelete")
// 	// 		.withArgs({
// 	// 			orderid: "order000001"
// 	// 		})
// 	// 		.resolves({
// 	// 			orderid: "order000001",
// 	// 			users: [
// 	// 				{
// 	// 					username: "UserOne",
// 	// 					products: [
// 	// 						{
// 	// 							productname: "Watermelon",
// 	// 							quantity: 23
// 	// 						},
// 	// 						{
// 	// 							productname: "Strawberries",
// 	// 							quantity: 23
// 	// 						}
// 	// 					]
// 	// 				}
// 	// 			],
// 	// 			shipped: true,
// 	// 			date: "2022-09-06T21:55:50.076+00:00",
// 	// 			totalcost: 2000
// 	// 		});
// 	// });
// });

// userUpdater.usersUp = ["UserOne", "UserTwo"];
// userUpdater.usersUp.map((elem) => {
// 	elem.fieldToUpdate = {
// 		firstname: "UserFromInsomnia",
// 		lastname: "from req.body",
// 		username: "UserOne",
// 		address: "test@request.com",
// 		orders: []
// 	};
// 	elem.updatedField = {
// 		orderid: "000002",
// 		url: `/api/v1/orders-archieve/000002`
// 	};
// 	elem.resultUpdate = {
// 		firstname: "UserFromInsomnia",
// 		lastname: "from req.body",
// 		username: "UserOne",
// 		address: "test@request.com",
// 		orders: [
// 			{
// 				orderid: "000002",
// 				url: `/api/v1/orders-archieve/000002`
// 			}
// 		]
// 	};
// });

// ---------------

// const mockUserFindUpdate = sinon
// 	.mock(userUpdater.userModel)
// 	.expects("findOneAndUpdate")
// 	.withArgs(
// 		{
// 			username: "UserOne"
// 		},
// 		{
// 			orders: []
// 		}
// 	)
// 	.resolves({
// 		firstname: "UserFromInsomnia",
// 		lastname: "from req.body",
// 		username: "UserOne",
// 		address: "test@request.com",
// 		orders: []
// 	});

// userUpdater.userModel.findOneAndUpdate(
// 	{
// 		username: "UserOne"
// 	},
// 	{
// 		orders: []
// 	}
// );
// mockUserFindUpdate.verify();

// userUpdater.updateAccountsDelOrder();
// const mockTestingTwo = sinon
// 	.mock(userUpdater)
// 	.expects("updateAccountsDelOrder")
// 	.resolves();

// userUpdater.updateAccountsDelOrder();
// mockTestingTwo.verify();

// userUpdater.users = "UserOne";
// userUpdater.usersToUpdate = [
// 	{
// 		firstname: "UserFromInsomnia",
// 		lastname: "from req.body",
// 		username: "UserOne",
// 		address: "test@request.com",
// 		orders: []
// 	}
// ];

// userUpdater.resolvedUsers = [
// 	{
// 		firstname: "UserFromInsomnia",
// 		lastname: "from req.body",
// 		username: "UserOne",
// 		address: "test@request.com",
// 		orders: []
// 	}
// ];

// userUpdater.fieldsToUpdate = [];
// userUpdater.result = sinon.mock

// const mockUserFindOne = sinon
// 	.mock(userUpdater.userModel)
// 	.expects("findOne")
// 	.withArgs({
// 		username: userUpdater.users
// 	})
// 	.resolves({
// 		firstname: "UserFromInsomnia",
// 		lastname: "from req.body",
// 		username: "UserOne",
// 		address: "test@request.com",
// 		orders: [
// 			{
// 				orderid: "000001",
// 				url: "none"
// 			}
// 		]
// 	});
// userUpdater.userModel.findOne({
// 	username: userUpdater.users
// });
// mockUserFindOne.verify();

// userUpdater.fieldsToUpdate = [];

// const mockProdFindOne = sinon
// 	.mock(prodUpdater.productModel)
// 	.expects("findOne")
// 	.withArgs({
// 		productname: "Strawberries"
// 	})
// 	.resolves({
// 		name: "Strawberries",
// 		quantity: 23,
// 		origin: "Italy",
// 		price: 23.23
// 	});
// prodUpdater.productModel.findOne({
// 	productname: "Strawberries"
// });
// mockProdFindOne.verify();

// sinon
// 	.mock(prodUpdater.productModel)
// 	.expects("findOneAndUpdate")
// 	.withArgs(
// 		{
// 			productname: "Strawberries"
// 		},
// 		{
// 			quantity: 32
// 		}
// 	)
// 	.resolves({
// 		name: "Strawberries",
// 		quantity: 32,
// 		origin: "Italy",
// 		price: 23.23
// 	});

// prodUpdater.restoreQuantities();

// const mockTesting = sinon
// 	.mock(prodUpdater)
// 	.expects("restoreQuantities")
// 	.resolves();

// prodUpdater.restoreQuantities();
// mockTesting.verify();

// const mockOrderFindDelete = sinon
// 	.mock(Order)
// 	.expects("findOneAndDelete")
// 	.withArgs({
// 		orderid: "order000001"
// 	})
// 	.resolves({
// 		orderid: "order00001",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: true,
// 		date: "2022-09-06T21:55:50.076+00:00",
// 		totalcost: 2000
// 	});
// Order.findOneAndDelete({
// 	orderid: "order000001"
// });
// mockOrderFindDelete.verify();

// prodUpStub.restore();
// prodUpdater.withArgs(req.body, Product, Order, res);

// const mockTesting = sinon
// 	.mock(prodUpdater)
// 	.expects("restoreQuantities")
// 	.resolves();

// prodUpdater.restoreQuantities();
// mockTesting.verify();
// const stub = sinon.stub(prodUpdater, restoreQuantities);
// stub.restore();
// const prodUpdater = sinon.createStubInstance(ProductUpdaterClass);

// const prodUpdater = sinon.createStubInstance(ProductUpdaterClass);
// prodUpdater.withArgs(req.body, Product, Order, res);
// deleteOneOrder(req, res, next);

// const userUpdater = new UserUpdaterClass(req.body, User, Order, res);

// assert.match(JSON.parse(res), {
// 	firstname: "userTestOne",
// 	lastname: "for Sinon Testing",
// 	username: "User1",
// 	address: "test@sinon.com",
// 	orders: [
// 		{
// 			orderid: "00001",
// 			url: "none"
// 		}
// 	]
// });

// sinon.assert.match(JSON.parse(res), {
// 	firstname: "userTestOne",
// 	lastname: "for Sinon Testing",
// 	username: "User1",
// 	address: "test@sinon.com",
// 	orders: [
// 		{
// 			orderid: "00001",
// 			url: "none"
// 		}
// 	]
// });
// expect(JSON.parse(res)).to.have.property("firstname");
// expect(JSON.parse(res)).to.have.property("lastname");
// expect(JSON.parse(res)).to.have.property("username");
// expect(JSON.parse(res)).to.have.property("address");
// expect(JSON.parse(res)).to.have.property("orders");

// const mockTesting = sinon
// 	.mock(fakeSave)
// 	.expects("save")
// 	.withArgs(req.body)
// 	.resolves({
// 		firstname: "userTestOne",
// 		lastname: "for Sinon Testing",
// 		username: "User1",
// 		address: "test@sinon.com",
// 		orders: [
// 			{
// 				orderid: "00001",
// 				url: "none"
// 			}
// 		]
// 	});
// User.save();
// mockTesting.verify();

// const fakeSave = new User({
// 	firstname: "userTestOne",
// 	lastname: "for Sinon Testing",
// 	username: "User1",
// 	address: "test@sinon.com",
// 	orders: [
// 		{
// 			orderid: "00001",
// 			url: "none"
// 		}
// 	]
// });
// // console.log(fakeSave);
// const mockSave = sinon.stub(fakeSave, "save").callsFake((err, doc) => {
// 	if (err) {
// 		// resMock.status(500).json({ message: `Error in saving - ${err}` });
// 		console.log(err);
// 	}

// });
// const result = fakeSave.save();
// console.log(result);
// fakeSave.save((err, doc) => {
// 	if (err) {
// 		resMock.status(500).json({ message: `Error in saving - ${err}` });
// 	}

// });

// ---- MOCKS ----

// describe("Testing mongoose Model methods", () => {
// 	// it("Mock User Model save()")
// 	it("Mock Product Model find({}) method", () => {
// 		const mockProdFind = sinon
// 			.mock(Product)
// 			.expects("find")
// 			.withArgs({})
// 			.resolves([
// 				{
// 					name: "Strawberries",
// 					quantity: 23000,
// 					origin: "Italy",
// 					price: 20.23
// 				},
// 				{
// 					name: "Pineapples",
// 					quantity: 10000,
// 					price: 23.23
// 				},
// 				{
// 					name: "Apples",
// 					quantity: 10000,
// 					price: 23.32
// 				}
// 			]);
// 		Product.find({});
// 		mockProdFind.verify();
// 	});

// it("Mock Product Model findOne( { name: } ) method", () => {
// 	const mockProdFindOne = sinon
// 		.mock(Product)
// 		.expects("findOne")
// 		.withArgs({ name: "Strawberries" })
// 		.resolves({
// 			name: "Strawberries",
// 			quantity: 23000,
// 			origin: "Italy",
// 			price: 20.23
// 		});
// 	Product.findOne({ name: "Strawberries" });
// 	mockProdFindOne.verify();
// });

// 	// it("Mock Product Model findOneAndUpdate( { name: }, {field: newValue} ) method", () => {
// 	// 	const mockProdFindUpdate = sinon
// 	// 		.mock(Product)
// 	// 		.expects("findOneAndUpdate")
// 	// 		.withArgs({ name: "Strawberries" }, { quantity: 23 })
// 	// 		.resolves({
// 	// 			name: "Strawberries",
// 	// 			quantity: 23,
// 	// 			origin: "Italy",
// 	// 			price: 20.23
// 	// 		});
// 	// 	Product.findOneAndUpdate({ name: "Strawberries" }, { quantity: 23 });
// 	// 	mockProdFindUpdate.verify();
// 	// });

// 	// it("Mock Product Model findOneAndDelete( { name: value } ) method", () => {
// 	// 	const mockProductFindDelete = sinon
// 	// 		.mock(Product)
// 	// 		.expects("findOneAndDelete")
// 	// 		.withArgs({ name: "Strawberries" })
// 	// 		.resolves({
// 	// 			name: "Strawberries",
// 	// 			quantity: 23000,
// 	// 			origin: "Italy",
// 	// 			price: 20.23
// 	// 		});
// 	// 	Product.findOneAndDelete({ name: "Strawberries" });
// 	// 	mockProductFindDelete.verify();
// 	// });

// 	// it("Mock User Model find({}) method", () => {
// 	// 	const mockUserFind = sinon
// 	// 		.mock(User)
// 	// 		.expects("find")
// 	// 		.withArgs({})
// 	// 		.resolves([
// 	// 			{
// 	// 				firstname: "userTestOne",
// 	// 				lastname: "for Sinon Testing",
// 	// 				username: "User1",
// 	// 				address: "test@sinon.com",
// 	// 				orders: [
// 	// 					{
// 	// 						orderid: "00001",
// 	// 						url: "none"
// 	// 					}
// 	// 				]
// 	// 			},
// 	// 			{
// 	// 				firstname: "userTestTwo",
// 	// 				lastname: "for Sinon Testing",
// 	// 				username: "User2",
// 	// 				address: "test@sinon.com",
// 	// 				orders: [
// 	// 					{
// 	// 						orderid: "00002",
// 	// 						url: "none"
// 	// 					}
// 	// 				]
// 	// 			},
// 	// 			{
// 	// 				firstname: "UserFromInsomnia",
// 	// 				lastname: "for Sinon Testing",
// 	// 				username: "User3",
// 	// 				address: "test@sinon.com",
// 	// 				orders: [
// 	// 					{
// 	// 						orderid: "00003",
// 	// 						url: "none"
// 	// 					}
// 	// 				]
// 	// 			}
// 	// 		]);
// 	// 	User.find({});
// 	// 	mockUserFind.verify();
// 	// });

// 	// it("Mock User Model findOne( { username: value } ) method", () => {
// 	// 	const mockUserFindOne = sinon
// 	// 		.mock(User)
// 	// 		.expects("findOne")
// 	// 		.withArgs({ username: "UserOne" })
// 	// 		.resolves({
// 	// 			firstname: "userTestOne",
// 	// 			lastname: "for Sinon Testing",
// 	// 			username: "User1",
// 	// 			address: "test@sinon.com",
// 	// 			orders: [
// 	// 				{
// 	// 					orderid: "00001",
// 	// 					url: "none"
// 	// 				}
// 	// 			]
// 	// 		});
// 	// 	User.findOne({ username: "UserOne" });
// 	// 	mockUserFindOne.verify();
// 	// });

// 	// it("Mock User Model findOneAndUpdate ( { username: value } , {value: newValue} ) method", () => {
// 	// 	const mockUserFindUp = sinon
// 	// 		.mock(User)
// 	// 		.expects("findOneAndUpdate")
// 	// 		.withArgs({ username: "UserOne" }, { orders: [] })
// 	// 		.resolves({
// 	// 			firstname: "userTestOne",
// 	// 			lastname: "for Sinon Testing",
// 	// 			username: "User1",
// 	// 			address: "test@sinon.com",
// 	// 			orders: []
// 	// 		});
// 	// 	User.findOneAndUpdate({ username: "UserOne" }, { orders: [] });
// 	// 	mockUserFindUp.verify();
// 	// });

// 	// it("Mock User Model findOneAndDelete ( { username: value } ) method", () => {
// 	// 	const mockUserFindDelete = sinon
// 	// 		.mock(User)
// 	// 		.expects("findOneAndDelete")
// 	// 		.withArgs({ username: "UserOne" })
// 	// 		.resolves({
// 	// 			firstname: "userTestOne",
// 	// 			lastname: "for Sinon Testing",
// 	// 			username: "User1",
// 	// 			address: "test@sinon.com",
// 	// 			orders: []
// 	// 		});
// 	// 	User.findOneAndDelete({ username: "UserOne" });
// 	// 	mockUserFindDelete.verify();
// 	// });

// 	// it("Mock Order Model find({})", () => {
// 	// 	const mockOrderFind = sinon
// 	// 		.mock(Order)
// 	// 		.expects("find")
// 	// 		.withArgs({})
// 	// 		.resolves([
// 	// 			{
// 	// 				orderid: "order000001",
// 	// 				users: [
// 	// 					{
// 	// 						username: "UserOne",
// 	// 						products: [
// 	// 							{
// 	// 								productname: "Watermelon",
// 	// 								quantity: 23
// 	// 							},
// 	// 							{
// 	// 								productname: "Strawberries",
// 	// 								quantity: 23
// 	// 							}
// 	// 						]
// 	// 					}
// 	// 				],
// 	// 				shipped: false,
// 	// 				date: "2022-09-06T21:55:50.076+00:00",
// 	// 				totalcost: 2000
// 	// 			},
// 	// 			{
// 	// 				orderid: "order000002",
// 	// 				users: [
// 	// 					{
// 	// 						username: "UserTwo",
// 	// 						products: [
// 	// 							{
// 	// 								productname: "Watermelon",
// 	// 								quantity: 23
// 	// 							},
// 	// 							{
// 	// 								productname: "Strawberries",
// 	// 								quantity: 23
// 	// 							}
// 	// 						]
// 	// 					}
// 	// 				],
// 	// 				shipped: false,
// 	// 				date: "2022-09-06T21:55:50.076+00:00",
// 	// 				totalcost: 2000
// 	// 			}
// 	// 		]);
// 	// 	Order.find({});
// 	// 	mockOrderFind.verify();
// 	// });

// 	// it("Mock Order Model findOne( { orderid: value } )", () => {
// 	// 	const mockOrderFindOne = sinon
// 	// 		.mock(Order)
// 	// 		.expects("findOne")
// 	// 		.withArgs({ orderid: "order000001" })
// 	// 		.resolves({
// 	// 			orderid: "order000001",
// 	// 			users: [
// 	// 				{
// 	// 					username: "UserOne",
// 	// 					products: [
// 	// 						{
// 	// 							productname: "Watermelon",
// 	// 							quantity: 23
// 	// 						},
// 	// 						{
// 	// 							productname: "Strawberries",
// 	// 							quantity: 23
// 	// 						}
// 	// 					]
// 	// 				}
// 	// 			],
// 	// 			shipped: false,
// 	// 			date: "2022-09-06T21:55:50.076+00:00",
// 	// 			totalcost: 2000
// 	// 		});
// 	// 	Order.findOne({ orderid: "order000001" });
// 	// 	mockOrderFindOne.verify();
// 	// });

// 	// it("Mock Order Model findOneAndUpdate( { orderid: value }, { value: newValue} )", () => {
// 	// 	const mockOrderFindUp = sinon
// 	// 		.mock(Order)
// 	// 		.expects("findOneAndUpdate")
// 	// 		.withArgs(
// 	// 			{
// 	// 				orderid: "order000001"
// 	// 			},
// 	// 			{
// 	// 				orderid: "order000001",
// 	// 				users: [
// 	// 					{
// 	// 						username: "UserOne",
// 	// 						products: [
// 	// 							{
// 	// 								productname: "Watermelon",
// 	// 								quantity: 23
// 	// 							},
// 	// 							{
// 	// 								productname: "Strawberries",
// 	// 								quantity: 23
// 	// 							}
// 	// 						]
// 	// 					}
// 	// 				],
// 	// 				shipped: true,
// 	// 				date: "2022-09-06T21:55:50.076+00:00",
// 	// 				totalcost: 2000
// 	// 			}
// 	// 		)
// 	// 		.resolves({
// 	// 			orderid: "order000001",
// 	// 			users: [
// 	// 				{
// 	// 					username: "UserOne",
// 	// 					products: [
// 	// 						{
// 	// 							productname: "Watermelon",
// 	// 							quantity: 23
// 	// 						},
// 	// 						{
// 	// 							productname: "Strawberries",
// 	// 							quantity: 23
// 	// 						}
// 	// 					]
// 	// 				}
// 	// 			],
// 	// 			shipped: true,
// 	// 			date: "2022-09-06T21:55:50.076+00:00",
// 	// 			totalcost: 2000
// 	// 		});
// 	// 	Order.findOneAndUpdate(
// 	// 		{
// 	// 			orderid: "order000001"
// 	// 		},
// 	// 		{
// 	// 			orderid: "order000001",
// 	// 			users: [
// 	// 				{
// 	// 					username: "UserOne",
// 	// 					products: [
// 	// 						{
// 	// 							productname: "Watermelon",
// 	// 							quantity: 23
// 	// 						},
// 	// 						{
// 	// 							productname: "Strawberries",
// 	// 							quantity: 23
// 	// 						}
// 	// 					]
// 	// 				}
// 	// 			],
// 	// 			shipped: true,
// 	// 			date: "2022-09-06T21:55:50.076+00:00",
// 	// 			totalcost: 2000
// 	// 		}
// 	// 	);
// 	// 	mockOrderFindUp.verify();
// 	// });

// 	// it("Mock Order Model findOneAndDelete( { orderid: value }, { value: newValue} )", () => {
// 	// 	const mockOrderFindDel = sinon
// 	// 		.mock(Order)
// 	// 		.expects("findOneAndDelete")
// 	// 		.withArgs({
// 	// 			orderid: "order000001"
// 	// 		})
// 	// 		.resolves({
// 	// 			orderid: "order000001",
// 	// 			users: [
// 	// 				{
// 	// 					username: "UserOne",
// 	// 					products: [
// 	// 						{
// 	// 							productname: "Watermelon",
// 	// 							quantity: 23
// 	// 						},
// 	// 						{
// 	// 							productname: "Strawberries",
// 	// 							quantity: 23
// 	// 						}
// 	// 					]
// 	// 				}
// 	// 			],
// 	// 			shipped: true,
// 	// 			date: "2022-09-06T21:55:50.076+00:00",
// 	// 			totalcost: 2000
// 	// 		});
// 	// 	Order.findOneAndDelete({
// 	// 		orderid: "order000001"
// 	// 	});
// 	// 	mockOrderFindDel.verify();
// 	// });
// });

// const mockUserFindOne = sinon
// 	.mock(User)
// 	.expects("findOne")
// 	.withArgs({ username: "User1" })
// 	.resolves({
// 		firstname: "userTestOne",
// 		lastname: "for Sinon Testing",
// 		username: "User1",
// 		address: "test@sinon.com",
// 		orders: [
// 			{
// 				orderid: "00001",
// 				url: "none"
// 			}
// 		]
// 	});
// User.findOne({ username: "User1" });
// mockUserFindOne.verify();

// const stubProductFindOne = sinon
// 	.stub(User, "findOne")
// 	.withArgs({ username: testUserGet })
// 	.returns({
// 		firstname: "userTestOne",
// 		lastname: "for Sinon Testing",
// 		username: testUserGet,
// 		address: "test@sinon.com",
// 		orders: [
// 			{
// 				orderid: "00001",
// 				url: "none"
// 			}
// 		]
// 	});
// const result = User.findOne({ username: testUserGet });

// const stubProductFindOne = sinon
// 	.stub(User, "findOne")
// 	.withArgs({ username: "User1" })
// 	.returns({
// 		firstname: "userTestOne",
// 		lastname: "for Sinon Testing",
// 		username: "User1",
// 		address: "test@sinon.com",
// 		orders: [
// 			{
// 				orderid: "00001",
// 				url: "none"
// 			}
// 		]
// 	});
// const existence = User.findOne({ username: "User1" });

// resMock.status(200).json(existence);

// const stubUserFindOne = sinon.stub(Product, "findOneAndDelete").returns({
// 	name: "Strawberries",
// 	quantity: 23000,
// 	origin: "Italy",
// 	price: 20.23
// });
// Product.findOneAndDelete({ name: "Strawberries" });

// it("Stub for user router post - Exist in DB - Not Saved ", async () => {
// 	router.post("/users/", async (req, res, next) => {
// 		try {
// 			expect("Content-Type", /json/);
// 			expect(200);
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);

// 			// const stubMethod = sinon.stub(postOneUser);
// 			postOneUser(reqMock, resMock, next);
// 			// postOneUser.restore();

// 			const stubProductFindOne = sinon
// 				.stub(User, "findOne")
// 				.withArgs({ username: "User1" })
// 				.returns({
// 					firstname: "userTestOne",
// 					lastname: "for Sinon Testing",
// 					username: "User1",
// 					address: "test@sinon.com",
// 					orders: [
// 						{
// 							orderid: "00001",
// 							url: "none"
// 						}
// 					]
// 				});
// 			const existence = User.findOne({ username: "User1" });

// 			// stubProductFindOne.restore();

// 			resMock.status(200).json({ message: `The user User1 already exists.` });
// 		} catch (err) {
// 			assert.isFalse(next(err));
// 		}

// 		// const mockUserFindOne = sinon
// 		// 	.mock(User)
// 		// 	.expects("findOne")
// 		// 	.withArgs({ username: "UserOne" })
// 		// 	.resolves(null);
// 		// User.findOne({ username: "UserOne" });
// 		// mockUserFindOne.verify();

// 		// const saveStub = sinon.stub(User.prototype, "save").returnsThis();

// 		// const newUser = new User(req.body);
// 		// console.log(newUser);
// 		// const result = newUser.save();
// 		// console.log(result);
// 		// expect(saveStub.calledOnce).to.be.true;

// 		// assert.strictEqual(JSON.stringify(result), JSON.stringify(newUser));
// 		// assert.isFalse(
// 		// 	resMock.status(200).json({ message: `The user User1 already exists.` })
// 		// );
// 		// User.save();
// 		// saveStub.restore();
// 	});
// });

// describe("Stub router order Get All", async () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{
// 				params: {
// 					filter: "productname",
// 					value: "strawberries",
// 					orderBy: "orderid",
// 					sort: undefined
// 				}
// 			},
// 			JSON.stringify({
// 				body: [
// 					{
// 						orderid: "order000001",
// 						users: [
// 							{
// 								username: "UserOne",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						date: "2022-09-06T21:55:50.076+00:00",
// 						totalcost: 2000
// 					},
// 					{
// 						orderid: "order000002",
// 						users: [
// 							{
// 								username: "UserTwo",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						date: "2022-09-06T21:55:50.076+00:00",
// 						totalcost: 2000
// 					}
// 				]
// 			}),
// 			null
// 		);
// 	});

// 	after(() => {
// 		router.get.restore();
// 	});
// });

// expect(JSON.parse(resMock)).to.equal(
// 	JSON.parse({
// 		orderid: "order00001",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: true,
// 		date: "2022-09-06T21:55:50.076+00:00",
// 		totalcost: 2000
// 	})
// );

// const mockOrderFindUp = sinon
// 	.mock(Order)
// 	.expects("findOneAndUpdate")
// 	.withArgs(
// 		{
// 			orderid: "order00001"
// 		},
// 		{
// 			orderid: "order00001",
// 			users: [
// 				{
// 					username: "UserOne",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: true,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		}
// 	)
// 	.resolves({
// 		orderid: "order00001",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: true,
// 		date: "2022-09-06T21:55:50.076+00:00",
// 		totalcost: 2000
// 	});
// Order.findOneAndUpdate(
// 	{
// 		orderid: "order00001"
// 	},
// 	{
// 		orderid: "order00001",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: true,
// 		date: "2022-09-06T21:55:50.076+00:00",
// 		totalcost: 2000
// 	}
// );
// mockOrderFindUp.verify();

// Order.findOne({ orderid: "order000002" });
// const existence = Product.findOne({ name: "Strawberries" });

// const mockOrderFindOne = sinon
// 	.mock(Order)
// 	.expects("findOne")
// 	.withArgs({ orderid: "order000002" })
// 	.resolves({
// 		orderid: "order000002",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: false,
// 		totalcost: 2000
// 	});

// const mockOrderFindOne = sinon
// 	.mock(Order)
// 	.expects("findOne")
// 	.withArgs({ orderid: "order000001" })
// 	.resolves({
// 		orderid: "order000001",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: false,
// 		date: "2022-09-06T21:55:50.076+00:00",
// 		totalcost: 2000
// 	});
// Order.findOne({ orderid: "order000001" });
// mockOrderFindOne.verify();

// sinon.assert.calledWith(prodUpManager, "orderExistsCheck");

// userUpdaterStub.resultUpdate = sinon
// 	.mock(User)
// 	.expects("findOneAndUpdate")
// 	.withArgs(
// 		{ username: "User1" },
// 		{
// 			orders: [
// 				{
// 					orderid: "00001",
// 					url: "none"
// 				}
// 			]
// 		}
// 	)
// 	.resolves({
// 		firstname: "UserFromInsomnia",
// 		lastname: "from req.body",
// 		username: "UserOne",
// 		address: "test@request.com",
// 		orders: [
// 			{
// 				orderid: "00001",
// 				url: "none"
// 			}
// 		]
// 	});

// this.resultUpdate = await this.userModel.findOneAndUpdate(
// 	{
// 		username: elem
// 	},
// 	{
// 		orders: this.updatedField
// 	}
// );

// sinon.stub(Order.prototype, "save").returns({
// 	orderid: "order000001",
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: false,
// 	date: "2022-09-06T21:55:50.076+00:00",
// 	totalcost: 2000
// });

// prodUpStub.newOrder = new Order(req.body);
// // console.log(newUser);
// prodUpStub.newOrder.save();

// console.log(prodUpStub.createNewOrder());

// prodUpStub.negativeArr = [];
// for await (let elem of results) {
// 	prodUpStub.updatingProduct = {
// 		productname: elem["productname"]
// 	};
// 	// prodUpStub.updatingProduct.returns({ productname: "Watermelon" });
// 	// prodUpStub.totalprice = 1000;
// }

// const mockOrderFindOneOrder = sinon
// 	.mock(Order)
// 	.expects("findOne")
// 	.withArgs({ orderid: "order000001" })
// 	.resolves({
// 		orderid: "order000001",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: false,
// 		date: "2022-09-06T21:55:50.076+00:00",
// 		totalcost: 2000
// 	});
// Order.findOne({ orderid: "order000001" });
// mockOrderFindOneOrder.verify();

// const stubOrderFindOne = sinon
// 	.stub(Order, "findOne")
// 	.withArgs({ orderid: "order000002" })
// 	.returns(null)

// userUpdaterStub.resultUpdate.verify();

// console.log(userUpdaterStub.findData());

// const stubMethod = sinon.stub(postOneOrder);
// stubMethod(req, res, next);

// console.log(putOneOrder);
// console.log(putOneOrder);
// .resolves({
// 	orderid: "order00001",
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: true,
// 	date: "2022-09-06T21:55:50.076+00:00",
// 	totalcost: 2000
// });

// stubMethod.resolves({
// 	orderid: "order00001",
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: true,
// 	date: "2022-09-06T21:55:50.076+00:00",
// 	totalcost: 2000
// });

// console.log(putOneOrder);

// assert.match(JSON.parse(res), {
// 	orderid: "order00001",
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: true,
// 	date: "2022-09-06T21:55:50.076+00:00",
// 	totalcost: 2000
// });

// const existence = Order.findOneAndDelete({
// 	orderid: "order000002"
// });

// const mockOrderFindDel = sinon
// 	.mock(Order)
// 	.expects("findOneAndDelete")
// 	.withArgs({
// 		orderid: "order000002"
// 	})
// 	.resolves({
// 		orderid: "order000002",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: false,
// 		totalcost: 2000
// 	});
// const stubOrderFindDel = sinon.stub(
// 	Order.prototype,
// 	"findOneAndDelete"
// );

// console.log(stubMethod);

// console.log(mockOrderFindDel);

// console.log(prodUdManager.orderExistsCheck());

// async () => {
// 	this.users = this.data["users"].map((user) => {
// 		return user["username"];
// 	});
// 	this.usersToUpdate = this.users.map(async (elem) => {
// 		return await this.userModel.findOne({
// 			username: elem
// 		});
// 	});
// 	this.fieldsToUpdate = this.resolvedUsers.map((elem) => {
// 		return elem["orders"];
// 	});
// };

// {
// 		firstname: "UserFromInsomnia",
// 		lastname: "from req.body",
// 		username: "UserOne",
// 		address: "test@request.com",
// 		orders: [
// 			{
// 				orderid: "00001",
// 				url: "none"
// 			}
// 		]
// 	}

// this.resolvedUsers = await Promise.all(this.usersToUpdate);
// this.fieldsToUpdate = this.resolvedUsers.map((elem) => {
// 	return elem["orders"];

// mockOrderFindDel.verify();

// userUpdater.usersToUpdate = {
// 	firstname: "UserFromInsomnia",
// 	lastname: "from req.body",
// 	username: "UserOne",
// 	address: "test@request.com",
// 	orders: [
// 		{
// 			orderid: "00001",
// 			url: "none"
// 		}
// 	]
// };
// userUpdater.resolvedUsers = {
// 	firstname: "UserFromInsomnia",
// 	lastname: "from req.body",
// 	username: "UserOne",
// 	address: "test@request.com",
// 	orders: [
// 		{
// 			orderid: "00001",
// 			url: "none"
// 		}
// 	]
// };
// userUpdater.fieldsToUpdate = {
// 	orders: [
// 		{
// 			orderid: "00001",
// 			url: "none"
// 		}
// 	]
// };

// console.log(userUpdater.fieldsToUpdate)

// assert.match(JSON.parse(res), {
// 	orderid: "order000002",
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: false,
// 	totalcost: 2000
// });

// expect(JSON.parse(res)).to.have.property("users");
// expect(JSON.parse(res)).to.have.property("shipped");
// expect(JSON.parse(res)).to.have.property("totalcost");

// expect(res).to.be.equal(
// assert.match(JSON.parse(res), {
// 	message: "Order delete."
// });
// expect(JSON.parse(res)).to.have.property("message");

// stubMethod.restore();

// const mockProdFindOne = sinon
// 	.mock(Product)
// 	.expects("findOne")
// 	.withArgs({ name: "Strawberries" })
// 	.resolves({
// 		name: "Strawberries",
// 		quantity: 23000,
// 		origin: "Italy",
// 		price: 20.23
// 	});
// const prodFound = Product.findOne({ name: "Strawberries" });
// mockProdFindOne.verify();

// // const prodFound = Product.findOne({ name: label });
// console.log(prodFound);

// const stubProductFindDelete = sinon
// 	.stub(Product, "findOne")
// 	.withArgs({ name: "Strawberries" })
// 	.returns(res);
// const result = Product.findOne({ name: "Strawberries" });

// resMock.status(200).json({
// 	name: label,
// 	quantity: 23,
// 	origin: "Italy",
// 	price: 20.23
// });

// <-------- problem here

// expect(result).to.have.property("name");

// const stubProductModel = sinon.stub(Product);
// const newProdStub = new stubProductModel(req.body);
// newProdStub.save();

// const mockProdSave = sinon
// 	.mock(Product)
// 	.expects("save")
// 	.withArgs(err, doc)
// 	.resolves(() => {
// 		return doc;
// 	});
// Product.save({
// 	name: "Strawberries",
// 	quantity: 23,
// 	origin: "Italy",
// 	price: 10.23
// });
// mockProdSave.verify();

// resMock.status(200).json({
// 	name: testProdPut,
// 	quantity: newQuantity,
// 	origin: "Italy",
// 	price: 10.23
// });

// assert.match(JSON.parse(res), {
// 	name: "Strawberries",
// 	quantity: 23,
// 	origin: "Italy",
// 	price: 10.23
// });
// expect(res).to.have.property("name");
// expect(res).to.have.property("quantity");
// expect(res).to.have.property("origin");
// expect(res).to.have.property("price");

// describe("Stub router product Post - Not Exist in DB - Error during saving", async () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "post").yields(
// 			{
// 				body: {
// 					name: "Strawberries",
// 					quantity: 23,
// 					origin: "Italy",
// 					price: 10.23
// 				}
// 			},
// 			{
// 				name: "Strawberries",
// 				quantity: 23,
// 				origin: "Italy",
// 				price: 10.23
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for product router post - Not Exist in DB - Saved", async () => {
// 		router.post("/products-storage/", async (req, res, next) => {
// 			try {
// 				sinon.assert.calledWith(router.post, "/products-storage/");

// 				const reqMock = mockReq(req);
// 				const resMock = mockRes(res);
// 				// const stubMethod = sinon.stub(postOneProduct);
// 				postOneProduct(reqMock, resMock, next);

// 				// PERFEZIONARE QUESTO.

// 				// const stubProductFindOne = sinon
// 				// 	.stub(Product, "findOne")
// 				// 	.withArgs({ name: "Strawberries" })
// 				// 	.returns(null);
// 				// const existence = Product.findOne({ name: "Strawberries" });

// 				const saveStub = sinon.stub(Product.prototype, "save").throws();

// 				const newProduct = new Product(reqMock.body);
// 				newProduct.save((err, docs) => {
// 					if (err) {
// 						throw new Error(err);
// 					}
// 				});
// 				// expect(saveStub.calledOnce).to.be.true;

// 				// assert.strictEqual(JSON.stringify(result), JSON.stringify(newProduct));
// 			} catch (err) {
// 				// expect("Content-Type", /json/);
// 				// expect(500);
// 				resMock.status(500).json({ message: "Error during Product saving..." });
// 				assert.isFalse(next(err));
// 				// sinon.assert.failException;
// 			}
// 		});
// 	});
// 	it("Stub for product router post - Handle Error", async () => {
// 		router.post(`/products-storage/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			postOneProduct(reqMock, resMock, next);
// 		});
// 	});
// 	after(() => {
// 		router.post.restore();
// 	});
// });

// const mockProductFindDelete = sinon
// 	.mock(Product)
// 	.expects("findOneAndDelete")
// 	.withArgs({ name: "Strawberries" })
// 	.resolves({
// 		name: "Strawberries",
// 		quantity: 23000,
// 		origin: "Italy",
// 		price: 20.23
// 	});
// Product.findOneAndDelete({ name: "Strawberries" });
// mockProductFindDelete.verify();

// const stubUserFind = sinon.stub(User, "find").withArgs({}).returns(body);
// const result = User.find({});

// const stubUserFindOne = sinon
// 	.stub(User, "findOne")
// 	.withArgs({ username: "User1" })
// 	.returns(null);
// const existence = User.findOne({ username: "User1" });

// ----

// const stubProductFindDelete = sinon.stub(User, "find").returns(body);
// const result = User.find({});

// const mockUserFindUp = sinon
// 	.mock(User)
// 	.expects("findOneAndUpdate")
// 	.withArgs({ username: "User1" }, { address: newAddress })
// 	.resolves({
// 		firstname: "userTestOne",
// 		lastname: "for Sinon Testing",
// 		username: "User1",
// 		address: newAddress,
// 		orders: [
// 			{
// 				orderid: "00001",
// 				url: "none"
// 			}
// 		]
// 	});
// User.findOneAndUpdate(
// 	{ username: "User1" },
// 	{
// 		address: newAddress
// 	}
// );
// mockUserFindUp.verify();

// const stubOrderFindOne = sinon
// 	.stub(Order, "findOne")
// 	.withArgs({ orderid: testOrderGet })
// 	.returns({
// 		orderid: "order000001",
// 		users: [
// 			{
// 				username: "UserOne",
// 				products: [
// 					{
// 						productname: "Watermelon",
// 						quantity: 23
// 					},
// 					{
// 						productname: "Strawberries",
// 						quantity: 23
// 					}
// 				]
// 			}
// 		],
// 		shipped: false,
// 		date: "2022-09-06T21:55:50.076+00:00",
// 		totalcost: 2000
// 	});
// const result = Order.findOne({ orderid: "order000001" });

// resMock.status(200).json(result);

// resMock.status(200).json({
// 	orderid: testOrderGet,
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: false,
// 	date: "2022-09-06T21:55:50.076+00:00",
// 	totalcost: 2000
// });

// resMock.statusCode(200).json({
// 	orderid: "order00001",
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: false,
// 	date: "2022-09-06T21:55:50.076+00:00",
// 	totalcost: 2000
// });

// resMock.status(200).json({
// 	orderid: testOrderGet,
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: false,
// 	date: "2022-09-06T21:55:50.076+00:00",
// 	totalcost: 2000
// });

// cambiare questo --->>>

// const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// 	findData: sinon.stub().returnsThis(),
// 	usersExistCheck: sinon.stub().returnsThis(),
// 	updateAccountsNewOrder: sinon.stub().returnsThis(),
// 	updateAccountsDelOrder: sinon.stub().returnsThis()
// });

// const stubUserFindOneUp = sinon.stub(User, )

// const mockOrderFind = sinon
// 	.mock(Order)
// 	.expects("find")
// 	.withArgs({})
// 	.resolves([
// 		{
// 			orderid: "order000001",
// 			users: [
// 				{
// 					username: "UserOne",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		},
// 		{
// 			orderid: "order000002",
// 			users: [
// 				{
// 					username: "UserTwo",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		}
// 	]);
// const result = await Order.find({});
// mockOrderFind.verify();

// const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// 	findData: sinon.stub().callsFake(async () => {
// 		userUpdaterStub.usersArr = [];

// 		for (let user of userUpdaterStub.data["users"]) {
// 			try {
// 				userUpdaterStub.usersArr.push({
// 					name: user["username"],
// 					data: await User.findOne({
// 						username: user["username"]
// 					})
// 				});
// 			} catch (error) {
// 				userUpdaterStub.usersArr.push({
// 					name: user["username"],
// 					data: null
// 				});
// 			}
// 		}
// 		return userUpdaterStub.usersArr;
// 	}),
// 	usersExistCheck: sinon.stub().callsFake(async () => {
// 		userUpdaterStub.existArray = await userUpdaterStub.findData();
// 		userUpdaterStub.message = {};
// 		for (let elem of userUpdaterStub.existArray) {
// 			if (elem["data"] == null) {
// 				userUpdaterStub.message[
// 					`message${userUpdaterStub.usersArr.indexOf(elem)}`
// 				] = `${elem["name"]} not exist.`;
// 			}
// 		}
// 		return userUpdaterStub.message;
// 	}),
// 	updateAccountsNewOrder: sinon.stub().returns(null),
// 	updateAccountsDelOrder: sinon.stub().callsFake(async () => {
// 		userUpdaterStub.users = userUpdaterStub.data["users"].map(
// 			(user) => {
// 				return user["username"];
// 			}
// 		);
// 		userUpdaterStub.usersToUpdate = userUpdaterStub.users.map(
// 			async (elem) => {
// 				return await User.findOne({
// 					username: elem
// 				});
// 			}
// 		);
// 		userUpdaterStub.resolvedUsers = await Promise.all(
// 			userUpdaterStub.usersToUpdate
// 		);
// 		userUpdaterStub.fieldsToUpdate = userUpdaterStub.resolvedUsers.map(
// 			(elem) => {
// 				return elem["orders"];
// 			}
// 		);

// 		for await (let orders of userUpdaterStub.fieldsToUpdate) {
// 			userUpdaterStub.dataUpdated = await orders.filter((elem) => {
// 				return elem["orderid"] !== userUpdaterStub.data["orderid"];
// 			});
// 			userUpdaterStub.result = await User.findOneAndUpdate(
// 				{
// 					username:
// 						userUpdaterStub.resolvedUsers[
// 							userUpdaterStub.fieldsToUpdate.indexOf(orders)
// 						]["username"]
// 				},
// 				{
// 					orders: userUpdaterStub.dataUpdated
// 				}
// 			);
// 		}
// 	})
// 	// async () => {
// 	// userUpdater.users = orderRemoved["users"].map((user) => {
// 	// 	return user["username"];
// 	// });
// 	// userUpdater.usersToUpdate = userUpdater.users.map(async (elem) => {
// 	// 	return await User.findOne({
// 	// 		username: elem
// 	// 	});
// 	// });
// 	// userUpdater.resolvedUsers = await Promise.all(
// 	// 	userUpdater.usersToUpdate
// 	// );
// 	// userUpdater.fieldsToUpdate = userUpdater.resolvedUsers.map(
// 	// 	(elem) => {
// 	// 		return elem["orders"];
// 	// 	}
// 	// );
// 	// for await (let orders of userUpdater.fieldsToUpdate) {
// 	// 	userUpdater.dataUpdated = await orders.filter((elem) => {
// 	// 		return elem["orderid"] !== orderRemoved["orderid"];
// 	// 	});
// 	// 	userUpdater.result = await User.findOneAndUpdate(
// 	// 		{
// 	// 			username:
// 	// 				userUpdater.resolvedUsers[
// 	// 					userUpdater.fieldsToUpdate.indexOf(orders)
// 	// 				]["username"]
// 	// 		},
// 	// 		{
// 	// 			orders: userUpdater.dataUpdated
// 	// 		}
// 	// 	);
// 	// }
// 	// }
// });

// Da ordercontroller

// Order.findOne({ orderid: orderId }, (err, data) => {
// 	// console.log(data);
// 	// Modifica - test
// 	if (err) {
// 		res.status(200).json({
// 			message: `Error in searching ${orderId}`
// 		});
// 	} else if (data == null) {
// 		res.status(200).json({
// 			message: `${orderId} not exists`
// 		});
// 	} else {
// 		res.status(200).json(data);
// 	}
// });

// --------------
// async () => {
// userUpdater.users = orderRemoved["users"].map((user) => {
// 	return user["username"];
// });
// userUpdater.usersToUpdate = userUpdater.users.map(async (elem) => {
// 	return await User.findOne({
// 		username: elem
// 	});
// });
// userUpdater.resolvedUsers = await Promise.all(
// 	userUpdater.usersToUpdate
// );
// userUpdater.fieldsToUpdate = userUpdater.resolvedUsers.map(
// 	(elem) => {
// 		return elem["orders"];
// 	}
// );
// for await (let orders of userUpdater.fieldsToUpdate) {
// 	userUpdater.dataUpdated = await orders.filter((elem) => {
// 		return elem["orderid"] !== orderRemoved["orderid"];
// 	});
// 	userUpdater.result = await User.findOneAndUpdate(
// 		{
// 			username:
// 				userUpdater.resolvedUsers[
// 					userUpdater.fieldsToUpdate.indexOf(orders)
// 				]["username"]
// 		},
// 		{
// 			orders: userUpdater.dataUpdated
// 		}
// 	);
// }
// }

// testing RES sperimental
// describe("Stub router product Get All", async () => {
// 	const resBody = [
// 		{
// 			name: "Strawberries",
// 			quantity: 23000,
// 			origin: "Italy",
// 			price: 20.23
// 		},
// 		{
// 			name: "Pineapples",
// 			quantity: 10000,
// 			origin: "Italy",
// 			price: 23.23
// 		},
// 		{
// 			name: "Apples",
// 			quantity: 10000,
// 			origin: "Italy",
// 			price: 23.32
// 		}
// 	];
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(null, {
// 			status: sinon.stub().callsFake(function (code) {
// 				this.status = code;
// 				return this;
// 			}),
// 			json: sinon.stub().callsFake(function (json) {
// 				// this.body = json;
// 				this.body = JSON.stringify(json);
// 				return this;
// 			})
// 		});
// 	});
// 	it("Stub for product router get (all)", async () => {
// 		router.get("/products-storage/", (req, res, next) => {
// 			expect("Content-Type", /json/);
// 			expect(200);
// 			// importante
// 			sinon.assert.calledWith(router.get, "/products-storage/");
// 			// importante
// 			// const reqMock = mockReq(req);
// 			// const resMock = mockRes(res);
// 			stubGetAllProducts(req, res, next);

// 			// const stubProductFind = sinon
// 			// 	.stub(Product, "find")
// 			// 	.withArgs({})
// 			// 	.returns(res.body);
// 			// const result = Product.find({});

// 			// // console.log(result);
// 			// console.log(res.body);

// 			res.status(200).json(resBody);

// 			sinon.assert.match(res.status, 200);
// 			// sinon.assert.calledWith(res.json, res.body);
// 			expect(res.status).to.equal(200);
// 			// expect(JSON.parse(res.body)).to.equal(resBody);

// 			// res.calledWith(200).should.be.ok;

// 			// aggiungere resMock.status(200).json...

// 			assert.isArray(JSON.parse(res.body));
// 			// assert.match(res.body, result);
// 			const elements = JSON.parse(res.body);
// 			elements.map((elem) => {
// 				expect(elem).to.have.property("name");
// 				expect(elem).to.have.property("quantity");
// 				expect(elem).to.have.property("origin");
// 				expect(elem).to.have.property("price");
// 			});
// 		});
// 	});
// 	it("Stub for product router get (all) - Handle Error", async () => {
// 		router.get(`/products-storage/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetAllProducts(reqMock, resMock, next);
// 			assert.isFalse(next(new Error()));
// 		});
// 	});

// 	after(() => {
// 		router.get.restore();
// 	});
// });

// describe("Stub router Base", () => {
// 	const msg = {
// 		message: "Welcome to Planty of Food API."
// 	};
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(null, {
// 			status: sinon.stub().returnsThis(),
// 			json: sinon.stub().withArgs(msg).resolves(JSON.stringify(msg))
// 		});
// 	});

// 	// let status, json, res;
// 	// before(() => {
// 	// 	status = sinon.stub().returnsThis();
// 	// 	json = sinon.spy();
// 	// 	res = { json, status };
// 	// const stubBaseRouter = sinon.stub(router, "get");
// 	// status.returns(res);
// 	// const fakeGet = sinon.fake;
// 	// const fake = sinon.fake.returns(
// 	// 	res.status(200).json({ message: "Welcome to Planty of Food API." })
// 	// );
// 	// sinon.replace(router, "get", fake);
// 	// assert.equals(fake.callCount, 1);
// 	// const stubRouterGet = sinon.stub(router, "get").yields(null, {
// 	// body: { message: "Welcome to Planty of Food API." },
// 	// status: sinon.stub().callsFake(function (code) {
// 	// 	this.status = code;
// 	// 	return this;
// 	// }),
// 	// json: sinon.stub().callsFake(function (json) {
// 	// 	// this.body = json;
// 	// 	this.body = json;
// 	// 	return this;
// 	// })
// 	// });
// 	// }); // stringify

// 	// beforeEach(() => get({ query: { example: true } }, res));
// 	// it("calls status with code 200", () => status.calledWith(200).should.be.ok);
// 	// it("calls json with success: true", () =>
// 	// json.calledWith({ success: true }).should.be.ok);
// 	it("Stub for router get /", () => {
// 		// router.get("/", (req, res) => {
// 		// 	const resMock = mockRes(res);

// 		// 	// const fake = sinon.replace(res, "status", sinon.fake(res.status));
// 		// 	// 	.set(() => {
// 		// 	// 	// resMock.status = 200;
// 		// 	// resMock.body = {
// 		// 	// 	message: "Welcome to Planty of Food API."
// 		// 	// };
// 		// 	// });
// 		// 	sinon.assert.match(res.body, resMock.body);

// 		// 	resMock.status(200).json(res.body);

// 		// 	// sinon.assert.calledWith(resMock.status, 200);
// 		// 	console.log(res.status(200));

// 		// 	// expect(resMock.status).to.equal(200);
// 		// 	// expect(resMock.body).to.equal(
// 		// 	// 	JSON.stringify({
// 		// 	// 		message: "Welcome to Planty of Food API."
// 		// 	// 	})
// 		// 	// );

// 		// 	// console.log(res);

// 		// 	// sinon.assert.match(res.status, 200);

// 		// 	// sinon.assert.calledWith(res.json, {
// 		// 	// 	message: "Welcome to Planty of Food API."
// 		// 	// });
// 		// });

// 		// expect(router.get)

// 		// const request = null;
// 		// const response = {
// 		// 	status: sinon.stub().returnsThis(),
// 		// 	json: sinon.spy()
// 		// };

// 		// const req = null;
// 		// router.get("/", (request, response) => {
// 		// 	request = req;
// 		// 	response = res;
// 		// 	console.log(response);
// 		// 	response.status(200).json({
// 		// 		message: "Welcome to Planty of Food API."
// 		// 	});
// 		// });
// 		router.get("/", (req, res) => {
// 			console.log(res.status(200));
// 			// req = request;
// 			// res = response;
// 			res.status(200).json({ message: "Welcome to Planty of Food API." });
// 			expect(res.status.calledWith(200)).to.be.ok;
// 			expect(res.json.calledWith({ message: "Welcome to Planty of Food API." }))
// 				.to.be.ok;
// 		});
// 		// expect(
// 		// 	res.json.calledWith({
// 		// 		message: "Welcome to Planty of Food API."
// 		// 	})
// 		// ).to.be.ok;
// 	});
// 	after(() => {
// 		router.get.restore();
// 	});
// });

// describe("Stub router Base", () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(null, {
// 			message: "Welcome to Planty of Food API."
// 		});
// 	});
// 	it("Stub for router get /", () => {
// 		router.get("/", (req, res) => {
// 			// importante
// 			// res.status(200).json({
// 			// 	message: "Welcome to Planty of Food API."
// 			// });
// 			// const reqMock = mockReq(req);
// 			// sinon.stub(res, "status");
// 			// sinon.stub(res, "json");
// 			const resMock = mockRes(res);
// 			// req.setStatus(200);
// 			// console.log(resMock);
// 			resMock.status(200).json({
// 				message: "Welcome to Planty of Food API."
// 			});

// 			// expect(resMock).to.be.calledOnce;
// 			// sinon.assert.calledOnce(resMock.status);
// 			// sinon.assert.calledOnce(resMock.json);

// 			sinon.assert.calledWith(resMock.status, 200);
// 			sinon.assert.calledWith(resMock.json, {
// 				message: "Welcome to Planty of Food API."
// 			});

// 			// resMock.verify();

// 			// expect(resMock.status).toHaveBeenCalled;
// 			// done();
// 			// done();
// 			// expect("Content-Type", /json/);
// 			// expect(resMock.json).to.be.calledWith({
// 			// 	message: "Welcome to Planty of Food API."
// 			// });
// 			// expect(200);
// 			// expect({
// 			// 	message: "Welcome to Planty of Food API."
// 			// });
// 			// chai
// 			// 	.request(router)
// 			// 	.get("/")
// 			// 	.set("Accept", "application/json")
// 			// 	.expect("Content-Type", /json/)
// 			// 	.expect(
// 			// 		200,
// 			// 		{
// 			// 			message: "Welcome to Planty of Food API."
// 			// 		},
// 			// 		done
// 			// 	);
// 			// expect(done);
// 			// sinon.assert.calledWith(router.get, "/");
// 			// importante
// 			// sinon.assert.match(res, {
// 			// 	message: "Welcome to Planty of Food API."
// 			// });
// 		});
// 		// done();
// 	});
// 	// it("Stub for router Base - Handle Error", async () => {
// 	// 	router.get(`/`, async (req, res) => {
// 	// 		expect(500);
// 	// 		// const reqMock = mockReq(req);
// 	// 		// const resMock = new Error();
// 	// 		// getAllProducts(reqMock, resMock, next);
// 	// 	});
// 	// });

// 	after(() => {
// 		router.get.restore();
// 	});
// });

// Testing
// async orderExistsCheck() {
// 		this.presOrder = await this.orderModel.findOne({
// 			orderid: this.data["orderid"]
// 		});
// 		this.message = {};
// 		if (presOrder !== null) {
// 			this.message["message"] = "OrderId already exists";
// 		}
// 		return this.message;
// 	}

// if (Object.keys(existCheck).length > 0) {
// 	res.status(200).json(existCheck);
// } else if (Object.keys(orderExists).length > 0) {
// 	res.status(200).json(orderExists);
// } else {
// 	await prodUpdater.searchProd();
// 	await prodUpdater.createResults();
// 	const numOfErrs = await prodUpdater.createNewOrder();
// 	if (numOfErrs == 0) {
// 		await userUpdater.updateAccountsNewOrder();
// 	} else {
// 		// <--- test
// 		return;
// 	}
// 	// else if (numOfErrs > 0) {
// 	// 	return;
// 	// }
// }

const router = require("../src/api/index");
const sinon = require("sinon");
require("./sinon-mongoose");
const referee = require("@sinonjs/referee");
const assert = referee.assert;
const mongoose = require("mongoose");
const express = require("express");

const chai = require("chai");
const { expect } = require("chai");
const { mockReq, mockRes } = require("sinon-express-mock");

// const sinonChai = require("sinon-chai");

// chai.use(sinonChai);

const Order = require("../src/api/models/Order");
const Product = require("../src/api/models/Product");
const User = require("../src/api/models/User");

const {
	OrderManagerClass,
	ProductUpdaterClass,
	UserUpdaterClass
} = require("../src/api/routes/classes");

const {
	getAllOrders,
	getOneOrder,
	postOneOrder,
	putOneOrder,
	deleteOneOrder
} = require("../src/api/controllers/orderController");

const {
	getAllProducts,
	getOneProduct,
	postOneProduct,
	putOneProduct,
	deleteOneProduct
} = require("../src/api/controllers/productController");

const {
	getAllUsers,
	getOneUser,
	postOneUser,
	putOneUser,
	deleteOneUser
} = require("../src/api/controllers/userController");

// describe("GET /api/v1", () => {
// 	it("responds with a json message", (done) => {
// 		request(app)
// 			.get("/api/v1")
// 			.set("Accept", "application/json")
// 			.expect("Content-Type", /json/)
// 			.expect(
// 				200,
// 				{
// 					message: "API - 👋🌎🌍🌏"
// 				},
// 				done
// 			);
// 	});
// });

// describe("Stub router Base", () => {
// 	const msg = {
// 		message: "Welcome to Planty of Food API."
// 	};
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(null, {
// 			body: { message: "Welcome to Planty of Food API." }
// 			// status: sinon.stub().returnsThis(),
// 			// json: sinon.stub().returns({ message: "Welcome to Planty of Food API." })
// 		});
// 	});

// 	// json.calledWith({ success: true }).should.be.ok);
// 	it("Stub for router get /", () => {
// 		router.get("/", (req, res) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// console.log(res.status(200));
// 			// req = request;
// 			// res = response;
// 			resMock.status(200).json({ message: "Welcome to Planty of Food API." });
// 			expect(resMock.status.calledWith(200)).to.be.ok;
// 			expect(
// 				resMock.json.calledWith({ message: "Welcome to Planty of Food API." })
// 			).to.be.ok;
// 		});
// 		// sinon.assert.match(resMock, { message: "Welcome to Planty of Food API." });
// 		// expect(
// 		// 	res.json.calledWith({
// 		// 		message: "Welcome to Planty of Food API."
// 		// 	})
// 		// ).to.be.ok;
// 	});
// 	after(() => {
// 		router.get.restore();
// 	});
// });

// // ----------- Product tests

// // const testProdPut = "Strawberries";
// // const newQuantity = 23;
// // const testProdDelete = "Strawberries";

// const stubGetAllProducts = sinon.stub(getAllProducts);

// describe("Stub router product Get All", async () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			null,
// 			{
// 				body: [
// 					{
// 						name: "Strawberries",
// 						quantity: 23000,
// 						origin: "Italy",
// 						price: 20.23
// 					},
// 					{
// 						name: "Pineapples",
// 						quantity: 10000,
// 						origin: "Italy",
// 						price: 23.23
// 					},
// 					{
// 						name: "Apples",
// 						quantity: 10000,
// 						origin: "Italy",
// 						price: 23.32
// 					}
// 				]
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for product router get (all)", async () => {
// 		router.get("/products-storage/", async (req, res, next) => {
// 			expect("Content-Type", /json/);
// 			expect(200);
// 			// importante
// 			sinon.assert.calledWith(router.get, "/products-storage/");
// 			// importante
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetAllProducts(reqMock, resMock, next);

// 			const stubProductFind = sinon
// 				.stub(Product, "find")
// 				.withArgs({})
// 				.returns([
// 					{
// 						name: "Strawberries",
// 						quantity: 23000,
// 						origin: "Italy",
// 						price: 20.23
// 					},
// 					{
// 						name: "Pineapples",
// 						quantity: 10000,
// 						origin: "Italy",
// 						price: 23.23
// 					},
// 					{
// 						name: "Apples",
// 						quantity: 10000,
// 						origin: "Italy",
// 						price: 23.32
// 					}
// 				]);
// 			const result = await Product.find({});

// 			// console.log(result);
// 			// console.log(res.body);

// 			resMock.status(200).json(res.body);

// 			sinon.assert.calledWith(resMock.status, 200);
// 			sinon.assert.match(result, resMock.body);

// 			// res.calledWith(200).should.be.ok;

// 			// console.log(JSON.parse(result));

// 			// aggiungere resMock.status(200).json...

// 			// assert.isArray(result);
// 			// assert.match(res.body, result);
// 			const elements = result;
// 			elements.map((elem) => {
// 				expect(elem).to.have.property("name");
// 				expect(elem).to.have.property("quantity");
// 				expect(elem).to.have.property("origin");
// 				expect(elem).to.have.property("price");
// 			});
// 		});
// 	});
// 	it("Stub for product router get (all) - Handle Error", async () => {
// 		router.get(`/products-storage/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetAllProducts(reqMock, resMock, next);
// 			assert.isFalse(next(new Error()));
// 			// sinon.assert.calledOnce(next());
// 		});
// 	});

// 	after(() => {
// 		router.get.restore();
// 	});
// });

// const stubProductFindOne = sinon.stub(Product, "findOne");
// const stubGetOneProduct = sinon.stub(getOneProduct);
// const saveStubProd = sinon.stub(Product.prototype, "save");
// const stubPostOneProduct = sinon.stub(postOneProduct);

// // const stubRouterProductGet = sinon.stub(router, "get")

// describe("Stub router product Get One", () => {
// 	const testProdGet = "strawberries";
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{ params: testProdGet },
// 			{
// 				body: {
// 					name: "Strawberries",
// 					quantity: 23,
// 					origin: "Italy",
// 					price: 20.23
// 				}
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for product router get (one)", async () => {
// 		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
// 			expect("Content-Type", /json/);
// 			expect(200);

// 			sinon.assert.calledWith(router.get, `/products-storage/${testProdGet}`);

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetOneProduct(reqMock, resMock, next);

// 			const label = `${String(testProdGet)[0].toUpperCase()}${String(
// 				testProdGet
// 			).slice(1)}`;

// 			stubProductFindOne.withArgs({ name: "Strawberries" }).returns(res);
// 			const result = await Product.findOne({ name: "Strawberries" });

// 			// console.log(resMock);
// 			// if (existence !== null) {
// 			resMock.status(200).json(result);
// 			// }

// 			assert.match(res.body, {
// 				name: "Strawberries",
// 				quantity: 23,
// 				origin: "Italy",
// 				price: 20.23
// 			});

// 			// expect(resMock.statusCode).to.equal(200);

// 			expect(resMock.body).to.have.property("name");
// 			expect(resMock.body).to.have.property("quantity");
// 			expect(resMock.body).to.have.property("origin");
// 			expect(resMock.body).to.have.property("price");
// 			expect(resMock.status).to.equal(200);
// 		});
// 	});

// 	it("Stub for product router get (one) - Handle Error", async () => {
// 		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetOneProduct(reqMock, resMock, next);
// 			assert.isFalse(next(new Error()));

// 			// resMock.status(500).json({...});
// 		});
// 	});
// 	after(() => {
// 		router.get.restore();
// 		stubProductFindOne.restore();
// 	});
// });

// describe("Stub router product Get One - Product not found", () => {
// 	const testProdGet = "strawberries";
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{ params: testProdGet },
// 			{
// 				message: `${testProdGet} not exists`
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for product router get (one) - Product not found", async () => {
// 		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
// 			expect("Content-Type", /json/);
// 			expect(200);

// 			sinon.assert.calledWith(router.get, `/products-storage/${testProdGet}`);

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubMethod = sinon.stub(getOneProduct);
// 			stubGetOneProduct(reqMock, resMock, next);
// 			// getOneProduct.restore();

// 			const label = `${String(testProdGet)[0].toUpperCase()}${String(
// 				testProdGet
// 			).slice(1)}`;

// 			stubProductFindOne.withArgs({ name: label }).returns(null);
// 			const existence = await Product.findOne({ name: label });
// 			// console.log(existence);

// 			resMock.status(200).json({
// 				message: `Strawberries not exists`
// 			});

// 			// <-------- problem here

// 			// assert.match(JSON.parse(res), {
// 			// 	message: `${testProdGet} not exists`
// 			// });

// 			// expect(resMock.statusCode).to.equal(200);

// 			// expect(resMock).to.have.property("message");
// 			// assert.isFalse(next(err));

// 			// expect(JSON.parse(res)).to.have.property("quantity");
// 			// expect(JSON.parse(res)).to.have.property("origin");
// 			// expect(JSON.parse(res)).to.have.property("price");
// 		});
// 	});
// 	it("Stub for product router get (one) - Handle Error", async () => {
// 		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetOneProduct(reqMock, resMock, next);
// 			// resMock.status(500).json({...});
// 		});
// 	});
// 	after(() => {
// 		stubProductFindOne.restore();

// 		router.get.restore();
// 	});
// });

// describe("Stub router product Post - Not Exist in DB - Saved", async () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "post").yields(
// 			{
// 				body: {
// 					name: "Strawberries",
// 					quantity: 23,
// 					origin: "Italy",
// 					price: 10.23
// 				}
// 			},
// 			{
// 				name: "Strawberries",
// 				quantity: 23,
// 				origin: "Italy",
// 				price: 10.23
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for product router post - Not Exist in DB - Saved", async () => {
// 		router.post("/products-storage/", async (req, res, next) => {
// 			sinon.assert.calledWith(router.post, "/products-storage/");
// 			expect("Content-Type", /json/);
// 			expect(200);

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubPostOneProduct(reqMock, resMock, next);

// 			const stubProductFindOne = sinon
// 				.stub(Product, "findOne")
// 				.withArgs({ name: "Strawberries" })
// 				.returns(null);
// 			const existence = Product.findOne({ name: "Strawberries" });

// 			saveStubProd.returnsThis();

// 			// if (existence == null) {
// 			const newProduct = new Product(reqMock.body);

// 			// if (existence == null) {
// 			const result = await newProduct.save();
// 			resMock.status(200).json(result);
// 			expect(saveStubProd.calledOnce).to.be.true;
// 			assert.strictEqual(JSON.stringify(result), JSON.stringify(newProduct));
// 			// const newProduct = new Product(reqMock.body);
// 			// const result = await newProduct.save();
// 			// } else {
// 			// 	resMock.status(200).json({
// 			// 		message: `The product Strawberries already exists.`
// 			// 	});
// 			// }
// 		});
// 	});

// 	it("Stub for product router post - Not Exist in DB - Error during saving", async () => {
// 		router.post("/products-storage/", async (req, res, next) => {
// 			// try {
// 			sinon.assert.calledWith(router.post, "/products-storage/");

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubMethod = sinon.stub(postOneProduct);
// 			stubPostOneProduct(reqMock, resMock, next);

// 			// PERFEZIONARE QUESTO.

// 			stubProductFindOne.withArgs({ name: "Strawberries" }).returns(null);
// 			const existence = Product.findOne({ name: "Strawberries" });

// 			// console.log(existence);

// 			saveStubProd.withArgs(new Error(), existence).rejects();
// 			// saveStubProd.returnsThis();

// 			const newProduct = new Product(reqMock.body);
// 			const result = newProduct.save();
// 			// console.log(result); //<--- result da controllare
// 			// expect(saveStub.calledOnce).to.be.true;

// 			// assert.strictEqual(JSON.stringify(result), JSON.stringify(newProduct));
// 			// } catch (err) {
// 			// 	// expect("Content-Type", /json/);
// 			// 	// expect(500);
// 			resMock.status(500).json({ message: "Error during Product saving..." });
// 			assert.isFalse(next(new Error()));
// 			// 	// sinon.assert.failException;

// 			// }
// 		});
// 	});
// 	it("Stub for product router post - Handle Error", async () => {
// 		router.post(`/products-storage/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubPostOneProduct(reqMock, resMock, next);
// 			assert.isFalse(next(new Error()));
// 		});
// 	});
// 	after(() => {
// 		stubProductFindOne.restore();
// 		// soluzione ad inghippo usare .restore prima di creare un altro stub
// 		// come questo sopra e subito sotto stubProductFindOne
// 		saveStubProd.restore();
// 		router.post.restore();
// 	});
// });

// describe("Stub router product Post - Exist in DB - Not Saved", async () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "post").yields(
// 			{
// 				body: {
// 					name: "Strawberries",
// 					quantity: 23,
// 					origin: "Italy",
// 					price: 10.23
// 				}
// 			},
// 			{
// 				message: `The product Strawberries already exists.`
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for product router post - Exist in DB - Not Saved", async () => {
// 		router.post("/products-storage/", async (req, res, next) => {
// 			// try {
// 			sinon.assert.calledWith(router.post, "/products-storage/");
// 			expect("Content-Type", /json/);
// 			expect(200);

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubMethod = sinon.stub(postOneProduct);
// 			stubPostOneProduct(reqMock, resMock, next);

// 			const stubProductFindOne = sinon
// 				.stub(Product, "findOne")
// 				.withArgs({ name: "Strawberries" })
// 				.returns({
// 					name: "Strawberries",
// 					quantity: 23,
// 					origin: "Italy",
// 					price: 10.23
// 				});
// 			const existence = Product.findOne({ name: "Strawberries" });

// 			// console.log(existence);

// 			// if (existence == null) {
// 			// 	// const result = await newProduct.save();
// 			// 	resMock.status(200).json({
// 			// 		name: "Strawberries",
// 			// 		quantity: 23,
// 			// 		origin: "Italy",
// 			// 		price: 10.23
// 			// 	});
// 			// expect(saveStub.calledOnce).to.be.false;
// 			// const newProduct = new Product(reqMock.body);
// 			// const result = await newProduct.save();
// 			// } else {
// 			resMock.status(200).json(res);

// 			assert.strictEqual(res, {
// 				message: `The product Strawberries already exists.`
// 			});

// 			// assert.isFalse(next(err));
// 			// }
// 			// } catch (err) {
// 			// }
// 		});
// 	});
// 	it("Stub for product router post - Handle Error", async () => {
// 		router.post(`/products-storage/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubPostOneProduct(reqMock, resMock, next);
// 			assert.isFalse(next(new Error()));
// 		});
// 	});
// 	after(() => {
// 		// stubProductFindOne.restore();

// 		router.post.restore();
// 	});
// });

// const stubputOneProduct = sinon.stub(putOneProduct);

// describe("Stub router product Put", async () => {
// 	const testProdPut = "Strawberries";
// 	const newQuantity = 23;
// 	before(() => {
// 		const stub = sinon.stub(router, "put").yields(
// 			{
// 				params: testProdPut,
// 				body: {
// 					name: testProdPut,
// 					quantity: newQuantity,
// 					origin: "Italy",
// 					price: 20.23
// 				}
// 			},
// 			JSON.stringify({
// 				name: testProdPut,
// 				quantity: newQuantity,
// 				origin: "Italy",
// 				price: 20.23
// 			}),
// 			null
// 		);
// 	});
// 	it("Stub for product router put", async () => {
// 		router.put("/products-storage/Strawberries", async (req, res, next) => {
// 			sinon.assert.calledWith(router.put, `/products-storage/${testProdPut}`);
// 			expect("Content-Type", /json/);
// 			expect(200);
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubputOneProduct(reqMock, resMock, next);

// 			// const mockProdFindUpdate = sinon
// 			// 	.mock(Product)
// 			// 	.expects("findOneAndUpdate")
// 			// 	.withArgs({ name: "Strawberries" }, { quantity: 23 })
// 			// 	.resolves({
// 			// 		name: "Strawberries",
// 			// 		quantity: 23,
// 			// 		origin: "Italy",
// 			// 		price: 20.23
// 			// 	});
// 			// Product.findOneAndUpdate({ name: "Strawberries" }, { quantity: 23 });
// 			// mockProdFindUpdate.verify();

// 			const stubProductFindUp = sinon
// 				.stub(Product, "findOneAndUpdate")
// 				.withArgs({ name: "Strawberries" }, { quantity: 23 })
// 				.returns(res);
// 			const result = await Product.findOneAndUpdate(
// 				{ name: "Strawberries" },
// 				{ quantity: 23 }
// 			);

// 			// console.log(result);

// 			resMock.status(200).json(result);

// 			const label = `${String(testProdPut)[0].toUpperCase()}${String(
// 				testProdPut
// 			).slice(1)}`;

// 			assert.match(JSON.parse(res), {
// 				name: "Strawberries",
// 				quantity: 23,
// 				price: 20.23
// 			});
// 			expect(JSON.parse(res)).to.have.property("name");
// 			expect(JSON.parse(res)).to.have.property("quantity");
// 			expect(JSON.parse(res)).to.have.property("price");
// 		});
// 	});
// 	it("Stub for product router put - Handle Error", async () => {
// 		router.put(`/products-storage/${testProdPut}`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubputOneProduct(reqMock, resMock, next);
// 		});
// 	});

// 	after(() => {
// 		router.put.restore();
// 	});
// });

// const stubdeleteOneProduct = sinon.stub(deleteOneProduct);

// describe("Stub router product Delete One", async () => {
// 	const testProdDelete = "Strawberries";

// 	before(() => {
// 		const stub = sinon.stub(router, "delete").yields(
// 			{
// 				params: testProdDelete
// 			},
// 			JSON.stringify({
// 				message: "Field delete."
// 			}),
// 			null
// 		);
// 	});
// 	it("Stub for product router delete", () => {
// 		router.delete("/products-storage/Strawberries", async (req, res, next) => {
// 			sinon.assert.calledWith(
// 				router.delete,
// 				`/products-storage/${testProdDelete}`
// 			);
// 			expect("Content-Type", /json/);
// 			expect(200);

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubdeleteOneProduct(reqMock, resMock, next);

// 			const stubProductFindDelete = sinon
// 				.stub(Product, "findOneAndDelete")
// 				.returns({
// 					name: "Strawberries",
// 					quantity: 23000,
// 					origin: "Italy",
// 					price: 20.23
// 				});
// 			const result = await Product.findOneAndDelete({ name: "Strawberries" });

// 			// <----- forse aumento coverage

// 			resMock.status(200).json({
// 				message: "Field delete."
// 			});
// 			assert.match(JSON.parse(res), {
// 				message: "Field delete."
// 			});
// 			expect(JSON.parse(res)).to.have.property("message");
// 		});
// 	});
// 	it("Stub for product router delete - Handle Error", async () => {
// 		router.delete(
// 			`/products-storage/${testProdDelete}`,
// 			async (req, res, next) => {
// 				expect(500);
// 				const reqMock = mockReq(req);
// 				const resMock = new Error();
// 				stubdeleteOneProduct(reqMock, resMock, next);
// 			}
// 		);
// 	});

// 	after(() => {
// 		router.delete.restore();
// 	});
// });

// // ----------- Product tests

// // ----------- User tests

// const stubGetAllUsers = sinon.stub(getAllUsers);

// describe("Stub router user Get All", async () => {
// 	const body = [
// 		{
// 			firstname: "userTestOne",
// 			lastname: "for Sinon Testing",
// 			username: "User1",
// 			address: "test@sinon.com",
// 			orders: [
// 				{
// 					orderid: "00001",
// 					url: "none"
// 				}
// 			]
// 		},
// 		{
// 			firstname: "userTestTwo",
// 			lastname: "for Sinon Testing",
// 			username: "User2",
// 			address: "test@sinon.com",
// 			orders: [
// 				{
// 					orderid: "00002",
// 					url: "none"
// 				}
// 			]
// 		},
// 		{
// 			firstname: "UserFromInsomnia",
// 			lastname: "for Sinon Testing",
// 			username: "User3",
// 			address: "test@sinon.com",
// 			orders: [
// 				{
// 					orderid: "00003",
// 					url: "none"
// 				}
// 			]
// 		}
// 	];
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			null,
// 			JSON.stringify({
// 				body: body
// 			}),
// 			null
// 		);
// 	});
// 	it("Stub for user router get (all)", async () => {
// 		router.get("/users/", async (req, res, next) => {
// 			expect("Content-Type", /json/);
// 			expect(200);
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetAllUsers(reqMock, resMock, next);

// 			const mockUserFind = sinon
// 				.mock(User)
// 				.expects("find")
// 				.withArgs({})
// 				.resolves(body);
// 			const result = await User.find({});
// 			mockUserFind.verify();

// 			resMock.status(200).json(result);
// 			assert.isArray(JSON.parse(res).body);
// 			assert.match(
// 				JSON.parse(res).body,
// 				String({
// 					body: [
// 						{
// 							firstname: "userTestOne",
// 							lastname: "for Sinon Testing",
// 							username: "User1",
// 							address: "test@sinon.com",
// 							orders: [
// 								{
// 									orderid: "00001",
// 									url: "none"
// 								}
// 							]
// 						},
// 						{
// 							firstname: "userTestTwo",
// 							lastname: "for Sinon Testing",
// 							username: "User2",
// 							address: "test@sinon.com",
// 							orders: [
// 								{
// 									orderid: "00002",
// 									url: "none"
// 								}
// 							]
// 						},
// 						{
// 							firstname: "userTestThree",
// 							lastname: "for Sinon Testing",
// 							username: "User3",
// 							address: "test@sinon.com",
// 							orders: [
// 								{
// 									orderid: "00003",
// 									url: "none"
// 								}
// 							]
// 						}
// 					]
// 				})
// 			);
// 			const elements = JSON.parse(res).body;
// 			elements.map((user) => {
// 				expect(user).to.have.property("firstname");
// 				expect(user).to.have.property("lastname");
// 				expect(user).to.have.property("username");
// 				expect(user).to.have.property("address");
// 				expect(user).to.have.property("orders");
// 				// ...
// 			});
// 		});
// 	});
// 	it("Stub for user router get (all) - handle errors", async () => {
// 		router.get("/users/", (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			// const stubMethod = sinon.stub(getAllUsers);
// 			// getAllUsers(reqMock, resMock, next);
// 			stubGetAllUsers(reqMock, resMock, next);
// 		});
// 	});
// 	after(() => {
// 		router.get.restore();
// 	});
// });

// const stubUserFindOne = sinon.stub(User, "findOne");
// const stubGetOneUser = sinon.stub(getOneUser);

// describe("Stub router user Get One", async () => {
// 	const testUserGet = "User1";
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{ params: testUserGet },
// 			JSON.stringify({
// 				firstname: "userTestOne",
// 				lastname: "for Sinon Testing",
// 				username: testUserGet,
// 				address: "test@sinon.com",
// 				orders: [
// 					{
// 						orderid: "00001",
// 						url: "none"
// 					}
// 				]
// 			}),
// 			null
// 		);
// 	});
// 	it("Stub for user router get (one)", async () => {
// 		router.get(`/users/${testUserGet}`, async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetOneUser(req, res, next);

// 			stubUserFindOne.withArgs({ username: "User1" }).returns({
// 				firstname: "userTestOne",
// 				lastname: "for Sinon Testing",
// 				username: "User1",
// 				address: "test@sinon.com",
// 				orders: [
// 					{
// 						orderid: "00001",
// 						url: "none"
// 					}
// 				]
// 			});
// 			const existence = await User.findOne({ username: "User1" });

// 			// console.log(res);

// 			// resMock.status(200).json(existence);

// 			// CONTINUARE CON TEST STUB TUTTI I METODI FIND...
// 			// E ALTERNARE ATTIVO/DISATTIVO PER VEDERE COPERTURA LINEE

// 			resMock.status(200).json(existence);
// 			expect("Content-Type", /json/);
// 			expect(200);
// 			assert.match(JSON.parse(res), {
// 				firstname: "userTestOne",
// 				lastname: "for Sinon Testing",
// 				username: testUserGet,
// 				address: "test@sinon.com",
// 				orders: [
// 					{
// 						orderid: "00001",
// 						url: "none"
// 					}
// 				]
// 			});
// 			expect(JSON.parse(res)).to.have.property("firstname");
// 			expect(JSON.parse(res)).to.have.property("lastname");
// 			expect(JSON.parse(res)).to.have.property("username");
// 			expect(JSON.parse(res)).to.have.property("address");
// 			expect(JSON.parse(res)).to.have.property("orders");
// 		});
// 	});
// 	it("Stub for user router get (one) - Handle Error", async () => {
// 		router.get(`/users/${testUserGet}`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetOneUser(req, res, next);
// 		});
// 	});
// 	after(() => {
// 		stubUserFindOne.restore();
// 		router.get.restore();
// 	});
// });

// const stubPostOneUser = sinon.stub(postOneUser);
// const saveStubUser = sinon.stub(User.prototype, "save");

// describe("Stub router user Post - Not Exist in DB - Saved", async () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "post").yields(
// 			{
// 				body: {
// 					firstname: "userTestOne",
// 					lastname: "for Sinon Testing",
// 					username: "User1",
// 					address: "test@sinon.com",
// 					orders: [
// 						{
// 							orderid: "00001",
// 							url: "none"
// 						}
// 					]
// 				}
// 			},
// 			{
// 				firstname: "userTestOne",
// 				lastname: "for Sinon Testing",
// 				username: "User1",
// 				address: "test@sinon.com",
// 				orders: [
// 					{
// 						orderid: "00001",
// 						url: "none"
// 					}
// 				]
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for user router post - Not Exist in DB - Saved ", async () => {
// 		router.post("/users/", async (req, res, next) => {
// 			// try {
// 			expect("Content-Type", /json/);
// 			expect(200);
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubPostOneUser(reqMock, resMock, next);
// 			// postOneUser.restore();

// 			const stubUserFindOne = sinon
// 				.stub(User, "findOne")
// 				.withArgs({ username: "User1" })
// 				.returns(null);
// 			const existence = User.findOne({ username: "User1" });

// 			// const mockUserFindOne = sinon
// 			// 	.mock(User)
// 			// 	.expects("findOne")
// 			// 	.withArgs({ username: "UserOne" })
// 			// 	.resolves(null);
// 			// User.findOne({ username: "UserOne" });
// 			// mockUserFindOne.verify();

// 			saveStubUser.returnsThis();

// 			const newUser = new User(reqMock.body);
// 			// console.log(newUser);
// 			const result = await newUser.save();

// 			// console.log(result);
// 			expect(saveStubUser.calledOnce).to.be.true;
// 			resMock.status(200).json(result);
// 			// expect(await result).to.eql(res);

// 			// resMock.status(200).json(result);

// 			// resMock;

// 			// Valutare
// 			// assert.strictEqual(result, newUser);
// 			// resMock.status(200).json(result);
// 			// Valutare

// 			// } catch (err) {
// 			// 	assert.isFalse(next(err));
// 			// }
// 			// assert.isFalse(
// 			// 	resMock.status(200).json({ message: `The user User1 already exists.` })
// 			// );
// 			// User.save();
// 			// saveStub.restore();
// 		});
// 	});

// 	it("Stub for user router post - Handle Error", async () => {
// 		router.post(`/users/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubPostOneUser(reqMock, resMock, next);
// 			assert.isFalse(next(resMock));
// 		});
// 	});
// 	after(() => {
// 		stubUserFindOne.restore();
// 		saveStubUser.restore();
// 		router.post.restore();
// 	});
// });

// describe("Stub router user Post - Exist in DB - Not Saved", async () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "post").yields(
// 			{
// 				body: {
// 					firstname: "userTestOne",
// 					lastname: "for Sinon Testing",
// 					username: "User1",
// 					address: "test@sinon.com",
// 					orders: [
// 						{
// 							orderid: "00001",
// 							url: "none"
// 						}
// 					]
// 				}
// 			},
// 			{
// 				message: `The user User1 already exists.`
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for user router post - Exist in DB - Not Saved ", async () => {
// 		router.post("/users/", async (req, res, next) => {
// 			// try {
// 			sinon.assert.calledWith(router.post, "/users/");
// 			expect("Content-Type", /json/);
// 			expect(200);
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubMethod = sinon.stub(postOneUser);
// 			stubPostOneUser(reqMock, resMock, next);
// 			// postOneUser.restore();

// 			// const stubMethod = sinon.stub(postOneUser);
// 			// postOneUser(reqMock, resMock, next);
// 			// postOneUser.restore();

// 			// ----- valutare se inserire o no ---------
// 			const stubUserFindOne = sinon
// 				.stub(User, "findOne")
// 				.withArgs({ username: "User1" })
// 				.returns({
// 					firstname: "userTestOne",
// 					lastname: "for Sinon Testing",
// 					username: "User1",
// 					address: "test@sinon.com",
// 					orders: [
// 						{
// 							orderid: "00001",
// 							url: "none"
// 						}
// 					]
// 				});
// 			const existence = User.findOne({ username: "User1" });
// 			// console.log(existence);
// 			// ----- valutare se inserire o no ---------

// 			// stubProductFindOne.restore();

// 			resMock.status(200).json(res);

// 			assert.strictEqual(res, {
// 				message: `The user User1 already exists.`
// 			});

// 			// assert.match(JSON.parse(res), {
// 			// 	message: `The user User1 already exists.`
// 			// });
// 			// // assert.match(JSON.parse(res), { username: "User1" });
// 			// expect(JSON.parse(res)).to.have.property("message");
// 			// resMock.status(200).json({ message: `The user User1 already exists.` });
// 			// } catch (err) {
// 			// assert.isFalse(next(err));
// 			// }

// 			// const mockUserFindOne = sinon
// 			// 	.mock(User)
// 			// 	.expects("findOne")
// 			// 	.withArgs({ username: "UserOne" })
// 			// 	.resolves({
// 			// 		firstname: "userTestOne",
// 			// 		lastname: "for Sinon Testing",
// 			// 		username: "User1",
// 			// 		address: "test@sinon.com",
// 			// 		orders: [
// 			// 			{
// 			// 				orderid: "00001",
// 			// 				url: "none"
// 			// 			}
// 			// 		]
// 			// 	});
// 			// User.findOne({ username: "UserOne" });
// 			// mockUserFindOne.verify();

// 			// const stub = sinon.stub(User, "save").resolves({
// 			// 	firstname: "userTestOne",
// 			// 	lastname: "for Sinon Testing",
// 			// 	username: "User1",
// 			// 	address: "test@sinon.com",
// 			// 	orders: [
// 			// 		{
// 			// 			orderid: "00001",
// 			// 			url: "none"
// 			// 		}
// 			// 	]
// 			// });
// 			// console.log(stub);

// 			// --------------------------

// 			// expect(JSON.parse(res)).to.have.property("lastname");
// 			// expect(JSON.parse(res)).to.have.property("username");
// 			// expect(JSON.parse(res)).to.have.property("address");
// 			// expect(JSON.parse(res)).to.have.property("orders");
// 		});
// 	});
// 	it("Stub for user router post - Handle Error", async () => {
// 		router.post(`/users/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubPostOneUser(reqMock, resMock, next);
// 			assert.isFalse(next(new Error()));
// 		});
// 	});
// 	after(() => {
// 		// stubUserFindOne.restore();
// 		router.post.restore();
// 	});
// });

// const stubUserFindUp = sinon.stub(User, "findOneAndUpdate");

// const stubPutOneUser = sinon.stub(putOneUser);

// describe("Stub router user Put", async () => {
// 	const testUserPut = "User1";
// 	const newAddress = "userone@sinon.com";
// 	before(() => {
// 		const stub = sinon.stub(router, "put").yields(
// 			{
// 				params: testUserPut,
// 				body: {
// 					firstname: "userTestOne",
// 					lastname: "for Sinon Testing",
// 					username: testUserPut,
// 					address: newAddress,
// 					orders: [
// 						{
// 							orderid: "00001",
// 							url: "none"
// 						}
// 					]
// 				}
// 			},
// 			JSON.stringify({
// 				firstname: "userTestOne",
// 				lastname: "for Sinon Testing",
// 				username: testUserPut,
// 				address: newAddress,
// 				orders: [
// 					{
// 						orderid: "00001",
// 						url: "none"
// 					}
// 				]
// 			}),
// 			null
// 		);
// 	});
// 	it("Stub for user router put", async () => {
// 		router.put(`/users/${testUserPut}`, async (req, res, next) => {
// 			expect("Content-Type", /json/);
// 			expect(200);

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);

// 			stubPutOneUser(req, res, next);

// 			// sistemare ---> qualcosa di non rilevato abbassa coverage ----> cerca in giù -> doppio stub ->
// 			// -> unire mettendo const all'esterno ------ HERE ------

// 			stubUserFindUp.withArgs({ username: testUserPut }, res).returns({
// 				firstname: "userTestOne",
// 				lastname: "for Sinon Testing",
// 				username: testUserPut,
// 				address: newAddress,
// 				orders: [
// 					{
// 						orderid: "00001",
// 						url: "none"
// 					}
// 				]
// 			});
// 			const result = await User.findOneAndUpdate({ username: testUserPut });

// 			// sistemare ---> qualcosa di non rilevato abbassa coverage

// 			resMock.status(200).json({
// 				firstname: "userTestOne",
// 				lastname: "for Sinon Testing",
// 				username: testUserPut,
// 				address: newAddress,
// 				orders: [
// 					{
// 						orderid: "00001",
// 						url: "none"
// 					}
// 				]
// 			});
// 			assert.match(JSON.parse(res), {
// 				firstname: "userTestOne",
// 				lastname: "for Sinon Testing",
// 				username: testUserPut,
// 				address: newAddress,
// 				orders: [
// 					{
// 						orderid: "00001",
// 						url: "none"
// 					}
// 				]
// 			});
// 			expect(JSON.parse(res)).to.have.property("firstname");
// 			expect(JSON.parse(res)).to.have.property("lastname");
// 			expect(JSON.parse(res)).to.have.property("username");
// 			expect(JSON.parse(res)).to.have.property("address");
// 			expect(JSON.parse(res)).to.have.property("orders");
// 		});
// 	});
// 	it("Stub for user router put - Handle Error", async () => {
// 		router.put(`/users/${testUserPut}`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubPutOneUser(reqMock, resMock, next);
// 		});
// 	});
// 	after(() => {
// 		router.put.restore();
// 	});
// });

// const stubDeleteOneUser = sinon.stub(deleteOneUser);
// const stubProductFindOneDelete = sinon.stub(User, "findOneAndDelete");

// describe("Stub router user Delete ", async () => {
// 	const testUserDelete = "User1";
// 	before(() => {
// 		const stub = sinon.stub(router, "delete").yields(
// 			{ params: testUserDelete },
// 			JSON.stringify({
// 				message: "User delete."
// 			}),
// 			null
// 		);
// 	});
// 	it("Stub for user router delete", async () => {
// 		router.delete(
// 			`/products-storage/${testUserDelete}`,
// 			async (req, res, next) => {
// 				expect("Content-Type", /json/);
// 				expect(200);
// 				const reqMock = mockReq(req);
// 				const resMock = mockRes(res);
// 				stubDeleteOneUser(req, res, next);

// 				// const mockUserFindDelete = sinon
// 				// 	.mock(User)
// 				// 	.expects("findOneAndDelete")
// 				// 	.withArgs({ username: "User1" })
// 				// 	.resolves({
// 				// 		firstname: "userTestOne",
// 				// 		lastname: "for Sinon Testing",
// 				// 		username: "User1",
// 				// 		address: "test@sinon.com",
// 				// 		orders: []
// 				// 	});
// 				// User.findOneAndDelete({ username: "User1" });
// 				// mockUserFindDelete.verify();

// 				stubProductFindOneDelete.withArgs({ username: "User1" }).returns({
// 					firstname: "userTestOne",
// 					lastname: "for Sinon Testing",
// 					username: "User1",
// 					address: "test@sinon.com",
// 					orders: []
// 				});
// 				const result = await User.findOneAndDelete({ username: "User1" });

// 				// const stubFindOne = sinon
// 				// 	.stub(User.findOneAndDelete({ username: "User1" }))
// 				// 	.returns({
// 				// 		firstname: "userTestOne",
// 				// 		lastname: "for Sinon Testing",
// 				// 		username: "User1",
// 				// 		address: "test@sinon.com",
// 				// 		orders: [
// 				// 			{
// 				// 				orderid: "00001",
// 				// 				url: "none"
// 				// 			}
// 				// 		]
// 				// 	});
// 				// User.findOneAndDelete({ username: "User1" });

// 				resMock.status(200).json({
// 					message: "User delete."
// 				});
// 				assert.match(JSON.parse(res), {
// 					message: "User delete."
// 				});
// 				expect(JSON.parse(res)).to.have.property("message");
// 				// expect(res).to.be.equal(
// 				// 	JSON.stringify({
// 				// 		message: "User delete."
// 				// 	})
// 				// );
// 			}
// 		);
// 	});
// 	it("Stub for user router delete - Handle Error", async () => {
// 		router.delete(`/users/${testUserDelete}`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubDeleteOneUser(reqMock, resMock, next);
// 		});
// 	});

// 	after(() => {
// 		router.delete.restore();
// 	});
// });

// // // ----------- User tests

// // // ----------- Order tests

// const stubGetAllOrders = sinon.stub(getAllOrders);

// const stubOrderFind = sinon.stub(Order, "find");

// describe("Stub router order Get All - filter: date, value: 202..., orderBy: undefined, sort: undefined", async () => {
// 	const results = [
// 		{
// 			orderid: "order000001",
// 			users: [
// 				{
// 					username: "UserOne",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		},
// 		{
// 			orderid: "order000002",
// 			users: [
// 				{
// 					username: "UserTwo",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		}
// 	];
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{
// 				params: {
// 					filter: "date",
// 					value: "2022-09-06T21:55:50.076+00:00",
// 					orderBy: undefined,
// 					sort: undefined
// 				}
// 			},
// 			{
// 				body: [
// 					{
// 						orderid: "order000001",
// 						users: [
// 							{
// 								username: "UserOne",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						date: "2022-09-06T21:55:50.076+00:00",
// 						totalcost: 2000
// 					},
// 					{
// 						orderid: "order000002",
// 						users: [
// 							{
// 								username: "UserTwo",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						date: "2022-09-06T21:55:50.076+00:00",
// 						totalcost: 2000
// 					}
// 				]
// 			},
// 			null
// 		);
// 	});

// 	it("Stub for router order get (all)", async () => {
// 		router.get("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetAllOrders(reqMock, resMock, next);

// 			stubOrderFind.withArgs({}).returns(resMock.body);

// 			const result = await Order.find({});

// 			// console.log(result);

// 			// const stubProductFindOne = sinon
// 			// 	.stub(Order, "find")
// 			// 	.withArgs({})
// 			// 	.returns(res);
// 			// const existence = Order.find({});

// 			const eightOrderStub = sinon.createStubInstance(OrderManagerClass, {
// 				parametersHandling: sinon.stub().returnsThis(),
// 				determinate: sinon.stub().returns(result),
// 				ordering: sinon.stub().returns(result),
// 				createResponse: sinon
// 					.stub()
// 					.withArgs(result)
// 					.returns(resMock.status(200).json(result))
// 			});

// 			const eightOrderManager = new OrderManagerClass();

// 			eightOrderManager.response = await result;
// 			eightOrderManager.data = await result;
// 			eightOrderManager.filterQuery = "date";
// 			eightOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
// 			eightOrderManager.orderByQuery = undefined;
// 			eightOrderManager.sortQuery = undefined;

// 			// await eightOrderManager.determinate();
// 			// await eightOrderManager.ordering();
// 			// await eightOrderManager.createResponse();
// 			// await eightOrderManager.noProducts();
// 			await eightOrderManager.parametersHandling();

// 			// resMock.status(200).json(res.body);

// 			// console.log(thirdOrderStub);

// 			// secondOrderManager.determinate().then((result) => console.log(result));

// 			// console.log(secondOrderStub.determinate());
// 			// console.log(secondOrderStub.ordering());

// 			// expect(secondOrderStub.determinate()).to.be.equal(results);
// 			// expect(thirdOrderManager.determinate().response).to.be.a("array");
// 			// return secondOrderStub.determinate().should.eventually.equal(results);
// 			// assert(secondOrderStub.determinate()).returns(results);
// 			// stubGetAllOrders.restore();
// 		});
// 	});

// 	it("Stub for router order get (all) - Handle Error", async () => {
// 		router.get(`/orders-archieve/`, async (req, res, next) => {
// 			// try {
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetAllOrders(reqMock, resMock, next);

// 			const eightOrderStub = sinon.createStubInstance(OrderManagerClass, {
// 				parametersHandling: sinon.stub().throws()
// 			});

// 			const eightOrderManager = new OrderManagerClass();

// 			// eightOrderManager.response = new Error();
// 			// eightOrderManager.data = res.body;
// 			// eightOrderManager.filterQuery = "date";
// 			// eightOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
// 			// eightOrderManager.orderByQuery = undefined;
// 			// eightOrderManager.sortQuery = undefined;

// 			// eightOrderManager.determinate();
// 			await eightOrderManager.parametersHandling();
// 			// } catch (error) {
// 			// 	next(error);
// 			// }
// 			// next(eightOrderManager.determinate());

// 			// console.log(detError);
// 			// const stubPar = sinon
// 			// 	.stub(OrderManagerClass, "parametersHandling")
// 			// 	.throws();
// 			// console.log(stubPar);

// 			// assert.isFalse(next(new Error()));

// 			// resMock.status(500);

// 			// expect(next(error)).to.be.calledOnce;
// 			// sinon.assert.calledOnce(next);
// 			// stubGetAllOrders.restore();
// 		});
// 	});

// 	after(() => {
// 		router.get.restore();
// 	});
// });

// describe("Stub router order Get All - filter: orderid, value: order000001, orderBy: undefined, sort: undefined", async () => {
// 	const results = [
// 		{
// 			orderid: "order000001",
// 			users: [
// 				{
// 					username: "UserOne",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		},
// 		{
// 			orderid: "order000002",
// 			users: [
// 				{
// 					username: "UserTwo",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		}
// 	];
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{
// 				params: {
// 					filter: "orderid",
// 					value: "order00001",
// 					orderBy: undefined,
// 					sort: undefined
// 				}
// 			},
// 			{
// 				body: results
// 			},
// 			null
// 		);
// 	});

// 	it("Stub for router order get (all)", async () => {
// 		router.get("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetAllOrders(reqMock, resMock, next);

// 			stubOrderFind.withArgs({}).returns(results);

// 			const result = await Order.find({});

// 			console.log(result);

// 			const seventhOrderStub = sinon.createStubInstance(OrderManagerClass, {
// 				parametersHandling: sinon.stub().returnsThis(),
// 				determinate: sinon.stub().returns(result),
// 				ordering: sinon.stub().returns(result),
// 				createResponse: sinon
// 					.stub()
// 					.withArgs(result)
// 					.returns(resMock.status(200).json(result))
// 			});

// 			const seventhOrderManager = new OrderManagerClass();

// 			seventhOrderManager.response = await result;
// 			seventhOrderManager.data = await result;
// 			seventhOrderManager.filterQuery = "orderid";
// 			seventhOrderManager.valueQuery = "order00001";
// 			seventhOrderManager.orderByQuery = undefined;
// 			seventhOrderManager.sortQuery = undefined;

// 			await seventhOrderManager.parametersHandling();
// 			// await seventhOrderManager.determinate();
// 			// await seventhOrderManager.ordering();
// 			// await seventhOrderManager.createResponse();
// 			// await seventhOrderManager.noProducts();
// 			// ---- QUI 05/10
// 			// console.log(response);

// 			// resMock.status(200).json(result);

// 			// stubGetAllOrders.restore();

// 			// console.log(thirdOrderStub);

// 			// secondOrderManager.determinate().then((result) => console.log(result));

// 			// console.log(secondOrderStub.determinate());
// 			// console.log(secondOrderStub.ordering());

// 			// expect(secondOrderStub.determinate()).to.be.equal(results);
// 			// expect(thirdOrderManager.determinate().response).to.be.a("array");
// 			// return secondOrderStub.determinate().should.eventually.equal(results);
// 			// assert(secondOrderStub.determinate()).returns(results);
// 		});
// 	});

// 	it("Stub for router order get (all) - Handle Error", async () => {
// 		router.get(`/orders-archieve/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetAllOrders(null, null, next);
// 			assert.isFalse(next(new Error()));
// 		});
// 	});

// 	after(() => {
// 		router.get.restore();
// 	});
// });

// describe("Stub router order Get All - filter: orderid, value: order000001, orderBy: orderid, sort: increasing", async () => {
// 	const results = [
// 		{
// 			orderid: "order000001",
// 			users: [
// 				{
// 					username: "UserOne",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		},
// 		{
// 			orderid: "order000002",
// 			users: [
// 				{
// 					username: "UserTwo",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		}
// 	];
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{
// 				params: {
// 					filter: "orderid",
// 					value: "order00001",
// 					orderBy: "orderid",
// 					sort: "increasing"
// 				}
// 			},
// 			{
// 				body: results
// 			},
// 			null
// 		);
// 	});

// 	it("Stub for router order get (all)", async () => {
// 		router.get("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetAllOrders(reqMock, resMock, next);

// 			const result = await Order.find({});

// 			console.log(result);

// 			const sixthOrderStub = sinon.createStubInstance(OrderManagerClass, {
// 				parametersHandling: sinon.stub().returnsThis(),
// 				determinate: sinon.stub().returns(result),
// 				ordering: sinon.stub().returns(result),
// 				createResponse: sinon
// 					.stub()
// 					.withArgs(result)
// 					.returns(resMock.status(200).json(result))
// 			});

// 			const sixthOrderManager = new OrderManagerClass();

// 			sixthOrderManager.response = await result;
// 			sixthOrderManager.data = await result;
// 			sixthOrderManager.filterQuery = "orderid";
// 			sixthOrderManager.valueQuery = "order00001";
// 			sixthOrderManager.orderByQuery = "orderid";
// 			sixthOrderManager.sortQuery = "increasing";

// 			// sixthOrderManager.determinate();
// 			// sixthOrderManager.ordering();
// 			// sixthOrderManager.createResponse();
// 			// sixthOrderManager.noProducts();
// 			await sixthOrderManager.parametersHandling();

// 			// console.log(thirdOrderStub);

// 			// secondOrderManager.determinate().then((result) => console.log(result));

// 			// console.log(secondOrderStub.determinate());
// 			// console.log(secondOrderStub.ordering());

// 			// expect(secondOrderStub.determinate()).to.be.equal(results);
// 			// expect(thirdOrderManager.determinate().response).to.be.a("array");
// 			// return secondOrderStub.determinate().should.eventually.equal(results);
// 			// assert(secondOrderStub.determinate()).returns(results);
// 		});
// 	});

// 	it("Stub for router order get (all) - Handle Error", async () => {
// 		router.get(`/orders-archieve/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetAllOrders(null, null, next);
// 			assert.isFalse(next(new Error()));
// 		});
// 	});

// 	after(() => {
// 		router.get.restore();
// 	});
// });

// describe("Stub router order Get All - filter: shipped, value: true, orderBy: orderid, sort: increasing", async () => {
// 	const results = [
// 		{
// 			orderid: "order000001",
// 			users: [
// 				{
// 					username: "UserOne",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		},
// 		{
// 			orderid: "order000002",
// 			users: [
// 				{
// 					username: "UserTwo",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		}
// 	];
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{
// 				params: {
// 					filter: "shipped",
// 					value: true,
// 					orderBy: "orderid",
// 					sort: "increasing"
// 				}
// 			},
// 			{
// 				body: results
// 			},
// 			null
// 		);
// 	});

// 	it("Stub for router order get (all)", async () => {
// 		router.get("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetAllOrders(reqMock, resMock, next);

// 			stubOrderFind.withArgs({}).returns(results);

// 			const result = await Order.find({});

// 			console.log(result);

// 			const fifthOrderStub = sinon.createStubInstance(OrderManagerClass, {
// 				parametersHandling: sinon.stub().returnsThis(),
// 				determinate: sinon.stub().returns(result),
// 				ordering: sinon.stub().returns(result),
// 				createResponse: sinon
// 					.stub()
// 					.withArgs(result)
// 					.returns(resMock.status(200).json(result))
// 			});

// 			const fifthOrderManager = new OrderManagerClass();

// 			fifthOrderManager.response = await result;
// 			fifthOrderManager.data = await result;
// 			fifthOrderManager.filterQuery = reqMock.params.filter;
// 			fifthOrderManager.valueQuery = reqMock.params.value;
// 			fifthOrderManager.orderByQuery = reqMock.params.orderBy;
// 			fifthOrderManager.sortQuery = reqMock.params.sort;

// 			await fifthOrderManager.parametersHandling();
// 			// await fifthOrderManager.determinate();
// 			// await fifthOrderManager.ordering();
// 			// await fifthOrderManager.createResponse();
// 			// await fifthOrderManager.noProducts();
// 			// resMock.status(200).json(result);

// 			// console.log(thirdOrderStub);

// 			// secondOrderManager.determinate().then((result) => console.log(result));

// 			// console.log(secondOrderStub.determinate());
// 			// console.log(secondOrderStub.ordering());

// 			// expect(secondOrderStub.determinate()).to.be.equal(results);
// 			// expect(thirdOrderManager.determinate().response).to.be.a("array");
// 			// return secondOrderStub.determinate().should.eventually.equal(results);
// 			// assert(secondOrderStub.determinate()).returns(results);
// 		});
// 	});

// 	it("Stub for router order get (all) - Handle Error", async () => {
// 		router.get(`/orders-archieve/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetAllOrders(null, null, next);
// 			assert.isFalse(next(new Error()));
// 		});
// 	});

// 	after(() => {
// 		router.get.restore();
// 	});
// });

// describe("Stub router order Get All - filter: date, value: 2022..., orderBy: orderid, sort: decreasing", async () => {
// 	const results = [
// 		{
// 			orderid: "order000001",
// 			users: [
// 				{
// 					username: "UserOne",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		},
// 		{
// 			orderid: "order000002",
// 			users: [
// 				{
// 					username: "UserTwo",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		}
// 	];
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{
// 				params: {
// 					filter: "date",
// 					value: "2022-09-06T21:55:50.076+00:00",
// 					orderBy: "orderid",
// 					sort: "decreasing"
// 				}
// 			},
// 			{
// 				body: results
// 			},
// 			null
// 		);
// 	});

// 	it("Stub for router order get (all)", async () => {
// 		router.get("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetAllOrders(reqMock, resMock, next);

// 			stubOrderFind.withArgs({}).returns(results);

// 			const result = await Order.find({});

// 			const fourthOrderStub = sinon.createStubInstance(OrderManagerClass, {
// 				parametersHandling: sinon.stub().returnsThis(),
// 				determinate: sinon.stub().returns(result),
// 				ordering: sinon.stub().returns(result),
// 				createResponse: sinon
// 					.stub()
// 					.withArgs(result)
// 					.returns(resMock.status(200).json(result))
// 			});

// 			const fourthOrderManager = new OrderManagerClass();

// 			fourthOrderManager.response = await result;
// 			fourthOrderManager.data = await result;
// 			fourthOrderManager.filterQuery = "date";
// 			fourthOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
// 			fourthOrderManager.orderByQuery = "orderid";
// 			fourthOrderManager.sortQuery = "decreasing";

// 			await fourthOrderManager.parametersHandling();
// 			// await fourthOrderManager.determinate();
// 			// await fourthOrderManager.ordering();
// 			// await fourthOrderManager.createResponse();
// 			// fourthOrderManager.noProducts();

// 			// resMock.status(200).json(result);

// 			// secondOrderManager.determinate().then((result) => console.log(result));

// 			// console.log(secondOrderStub.determinate());
// 			// console.log(secondOrderStub.ordering());

// 			// expect(secondOrderStub.determinate()).to.be.equal(results);
// 			// expect(thirdOrderManager.determinate().response).to.be.a("array");
// 			// return secondOrderStub.determinate().should.eventually.equal(results);
// 			// assert(secondOrderStub.determinate()).returns(results);
// 		});
// 	});

// 	it("Stub for router order get (all) - Handle Error", async () => {
// 		router.get(`/orders-archieve/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetAllOrders(null, null, next);
// 			assert.isFalse(next(new Error()));
// 		});
// 	});

// 	after(() => {
// 		stubOrderFind.restore();
// 		router.get.restore();
// 	});
// });

// describe("Stub router order Get All - All undefined", async () => {
// 	const results = [
// 		{
// 			orderid: "order000001",
// 			users: [
// 				{
// 					username: "UserOne",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		},
// 		{
// 			orderid: "order000002",
// 			users: [
// 				{
// 					username: "UserTwo",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		}
// 	];
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{
// 				params: {
// 					filter: undefined,
// 					value: undefined,
// 					orderBy: undefined,
// 					sort: undefined
// 				}
// 			},
// 			{
// 				body: results
// 			},
// 			null
// 		);
// 	});

// 	it("Stub for router order get (all)", async () => {
// 		router.get("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetAllOrders(reqMock, resMock, next);

// 			stubOrderFind.withArgs({}).returns(results);

// 			const result = await Order.find({});

// 			// console.log(result);

// 			const thirdOrderStub = sinon.createStubInstance(OrderManagerClass, {
// 				parametersHandling: sinon.stub().returnsThis(),
// 				determinate: sinon.stub().returns(result),
// 				ordering: sinon.stub().returns(result),
// 				createResponse: sinon
// 					.stub()
// 					.withArgs(result)
// 					.returns(resMock.status(200).json(result))
// 			});

// 			const thirdOrderManager = new OrderManagerClass();

// 			thirdOrderManager.response = await result;
// 			thirdOrderManager.data = await result;
// 			thirdOrderManager.filterQuery = undefined;
// 			thirdOrderManager.valueQuery = undefined;
// 			thirdOrderManager.orderByQuery = undefined;
// 			thirdOrderManager.sortQuery = undefined;

// 			await thirdOrderManager.parametersHandling();

// 			await thirdOrderManager.determinate();
// 			await thirdOrderManager.ordering();
// 			// await thirdOrderManager.createResponse();
// 			// await thirdOrderManager.noProducts();

// 			// resMock.status(200).json(result);
// 		});
// 	});

// 	it("Stub for router order get (all) - Handle Error", async () => {
// 		router.get(`/orders-archieve/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetAllOrders(null, null, next);
// 			assert.isFalse(next(new Error()));
// 		});
// 	});

// 	after(() => {
// 		stubOrderFind.restore();

// 		router.get.restore();
// 	});
// });

// describe("Stub router order Get All - miss sort param", async () => {
// 	const results = [
// 		{
// 			orderid: "order000001",
// 			users: [
// 				{
// 					username: "UserOne",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		},
// 		{
// 			orderid: "order000002",
// 			users: [
// 				{
// 					username: "UserTwo",
// 					products: [
// 						{
// 							productname: "Watermelon",
// 							quantity: 23
// 						},
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			],
// 			shipped: false,
// 			date: "2022-09-06T21:55:50.076+00:00",
// 			totalcost: 2000
// 		}
// 	];
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{
// 				params: {
// 					filter: "productname",
// 					value: "strawberries",
// 					orderBy: "orderid",
// 					sort: undefined
// 				}
// 			},
// 			{
// 				message: `Need a &sort= parameter for search...`
// 			},
// 			null
// 		);
// 	});

// 	it("Stub for router order get (all) - miss sort param", () => {
// 		router.get("/orders-archieve/", async (req, res, next) => {
// 			//

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetAllOrders(reqMock, resMock, next);

// 			const stubOrderFindTest = sinon
// 				.stub(Order, "find")
// 				.withArgs({})
// 				.returns(results);

// 			const savedResult = await Order.find({});

// 			const orderManagerStub = sinon.createStubInstance(OrderManagerClass, {
// 				parametersHandling: sinon.stub().returnsThis(),
// 				missParam: sinon
// 					.stub()
// 					.withArgs("&sort= ")
// 					.returns(
// 						resMock.status(400).json({
// 							message: `Need a &sort= parameter for search...`
// 						})
// 					)
// 				// determinate: sinon.stub().returns(result),
// 				// ordering: sinon.stub().returns(result),
// 				// createResponse: sinon
// 				// 	.stub()
// 				// 	.withArgs(result)
// 				// 	.returns(resMock.status(200).json(result))
// 			});

// 			const orderManager = new OrderManagerClass();

// 			orderManager.response = await savedResult;
// 			orderManager.data = await savedResult;
// 			orderManager.filterQuery = "productname";
// 			orderManager.valueQuery = "strawberries";
// 			orderManager.orderByQuery = "orderid";
// 			orderManager.sortQuery = undefined;

// 			orderManager.determinate();
// 			orderManager.ordering();
// 			orderManager.createResponse();
// 			orderManager.noProducts();
// 			orderManager.parametersHandling();
// 			orderManager.missParam();

// 			// expect.fail(orderManager.parametersHandling(), {
// 			// 	message: `Need a &sort= parameter for search...`
// 			// });

// 			// resMock.status(400).json();

// 			// expect(
// 			// 	orderManager.missParam("&sort= "),
// 			// 	resMock.status(400).json({
// 			// 		message: `Need a &sort= parameter for search...`
// 			// 	})
// 			// );
// 			// sinon.assert.match(resMock, {
// 			// 	message: `Need a &sort= parameter for search...`
// 			// });
// 		});
// 	});

// 	it("Stub for router order get (all) - Handle Error", async () => {
// 		router.get(`/orders-archieve/`, async (req, res, next) => {
// 			expect(500);
// 			// const reqMock = mockReq(req);
// 			// const resMock = new Error();
// 			stubGetAllOrders(null, null, next);
// 			assert.isFalse(next(new Error()));
// 		});
// 	});

// 	after(() => {
// 		stubOrderFind.restore();
// 		router.get.restore();
// 	});
// });

// // portare all'esterno const stubMethod = sinon.stub(getAllOrders); in su

// // const stubOrderFind = sinon.stub(Order, 'find'); <----- provare a riusare per tutti o getall tranne sottostante con mock

// describe("Stub router order Get All", async () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{
// 				params: {
// 					filter: "productname",
// 					value: "strawberries",
// 					orderBy: "orderid",
// 					sort: "decreasing"
// 				}
// 			},
// 			{
// 				body: [
// 					{
// 						orderid: "order000001",
// 						users: [
// 							{
// 								username: "UserOne",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						date: "2022-09-06T21:55:50.076+00:00",
// 						totalcost: 2000
// 					},
// 					{
// 						orderid: "order000002",
// 						users: [
// 							{
// 								username: "UserTwo",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						date: "2022-09-06T21:55:50.076+00:00",
// 						totalcost: 2000
// 					}
// 				]
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for router order get (all)", async () => {
// 		// const results = [
// 		// 	{
// 		// 		orderid: "order000001",
// 		// 		users: [
// 		// 			{
// 		// 				username: "UserOne",
// 		// 				products: [
// 		// 					{
// 		// 						productname: "Watermelon",
// 		// 						quantity: 23
// 		// 					},
// 		// 					{
// 		// 						productname: "Strawberries",
// 		// 						quantity: 23
// 		// 					}
// 		// 				]
// 		// 			}
// 		// 		],
// 		// 		shipped: false,
// 		// 		date: "2022-09-06T21:55:50.076+00:00",
// 		// 		totalcost: 2000
// 		// 	},
// 		// 	{
// 		// 		orderid: "order000002",
// 		// 		users: [
// 		// 			{
// 		// 				username: "UserTwo",
// 		// 				products: [
// 		// 					{
// 		// 						productname: "Watermelon",
// 		// 						quantity: 23
// 		// 					},
// 		// 					{
// 		// 						productname: "Strawberries",
// 		// 						quantity: 23
// 		// 					}
// 		// 				]
// 		// 			}
// 		// 		],
// 		// 		shipped: false,
// 		// 		date: "2022-09-06T21:55:50.076+00:00",
// 		// 		totalcost: 2000
// 		// 	}
// 		// ];
// 		router.get("/orders-archieve/", async (req, res, next) => {
// 			const secondOrderStub = sinon.createStubInstance(OrderManagerClass, {
// 				determinate: sinon.stub().returnsThis(),
// 				ordering: sinon.stub().returnsThis(),
// 				createResponse: sinon.stub().returnsThis(),
// 				parametersHandling: sinon.stub().returnsThis()
// 			});

// 			// modificare i vari createStubInstance con metodi
// 			// che facciano qualcosa

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);

// 			// const stubGetAllOrders = sinon.stub(getAllOrders);
// 			stubGetAllOrders(reqMock, resMock, next);

// 			const stubOrderFindTwo = sinon
// 				.stub(Order, "find")
// 				.withArgs({})
// 				.returns([
// 					{
// 						orderid: "order000001",
// 						users: [
// 							{
// 								username: "UserOne",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						date: "2022-09-06T21:55:50.076+00:00",
// 						totalcost: 2000
// 					},
// 					{
// 						orderid: "order000002",
// 						users: [
// 							{
// 								username: "UserTwo",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						date: "2022-09-06T21:55:50.076+00:00",
// 						totalcost: 2000
// 					}
// 				]);

// 			const result = await Order.find({});

// 			const secondOrderManager = new OrderManagerClass();

// 			secondOrderStub.response = await result;
// 			secondOrderStub.data = await result;
// 			secondOrderStub.filterQuery = reqMock.params.filter;
// 			secondOrderStub.valueQuery = reqMock.params.value;
// 			secondOrderStub.orderByQuery = reqMock.params.orderBy;
// 			secondOrderStub.sortQuery = reqMock.params.sort;

// 			// secondOrderStub.determinate();
// 			// secondOrderStub.ordering();
// 			// secondOrderStub.createResponse();
// 			// secondOrderStub.noProducts();
// 			await secondOrderManager.parametersHandling();
// 			// console.log(val);

// 			// expect(secondOrderStub.determinate().response).to.be.a("array");

// 			expect("Content-Type", /json/);
// 			expect(200);

// 			assert.isArray(res.body);
// 			const orders = res.body;
// 			orders.map((order) => {
// 				expect(order).to.have.property("orderid");
// 				expect(order).to.have.property("users");
// 				expect(order).to.have.property("shipped");
// 				expect(order).to.have.property("date");
// 				expect(order).to.have.property("totalcost");
// 			});
// 			resMock.status(200).json(result);
// 		});
// 	});

// 	it("Stub for router order get (all) - Handle Error", async () => {
// 		router.get(`/orders-archieve/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetAllOrders(null, null, next);
// 			sinon.assert.calledWith(resMock.status, 500);
// 		});
// 	});

// 	after(() => {
// 		// stubOrderFind.restore();
// 		router.get.restore();
// 	});
// });

// const stubGetOneOrder = sinon.stub(getOneOrder);
// const stubOrderFindOne = sinon.stub(Order, "findOne");

// describe("Stub router order Get One", () => {
// 	const testOrderGet = "order000001";
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{ params: testOrderGet },
// 			{
// 				body: {
// 					orderid: "order000001",
// 					users: [
// 						{
// 							username: "UserOne",
// 							products: [
// 								{
// 									productname: "Watermelon",
// 									quantity: 23
// 								},
// 								{
// 									productname: "Strawberries",
// 									quantity: 23
// 								}
// 							]
// 						}
// 					],
// 					shipped: false,
// 					date: "2022-09-06T21:55:50.076+00:00",
// 					totalcost: 2000
// 				}
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for order router get (one)", async () => {
// 		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
// 			expect("Content-Type", /json/);
// 			expect(200);
// 			sinon.assert.calledWith(router.get, `/orders-archieve/${testOrderGet}`);

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			stubGetOneOrder(reqMock, resMock, next);

// 			stubOrderFindOne.withArgs({ orderid: "order000001" }).returns(res);

// 			const result = await Order.findOne({ orderid: "order000001" });

// 			// console.log(result);
// 			// if (result == null) {
// 			// 	resMock.status(200).json({
// 			// 		message: `${testOrderGet} not exists`
// 			// 	});
// 			// } else {
// 			resMock.status(200).json(result);

// 			// } // questo...

// 			// resMock.status(200).json(result); ... o questo

// 			assert.match(res.body, {
// 				orderid: "order000001",
// 				users: [
// 					{
// 						username: "UserOne",
// 						products: [
// 							{
// 								productname: "Watermelon",
// 								quantity: 23
// 							},
// 							{
// 								productname: "Strawberries",
// 								quantity: 23
// 							}
// 						]
// 					}
// 				],
// 				shipped: false,
// 				date: "2022-09-06T21:55:50.076+00:00",
// 				totalcost: 2000
// 			});

// 			expect(resMock.body).to.have.property("orderid");
// 			expect(resMock.body).to.have.property("users");
// 			expect(resMock.body).to.have.property("shipped");
// 			expect(resMock.body).to.have.property("date");
// 			expect(resMock.body).to.have.property("totalcost");
// 			expect(resMock.status).to.equal(200);
// 		});
// 	});
// 	it("Stub for router order get (one) - Handle Error", async () => {
// 		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetOneOrder(reqMock, resMock, next);
// 			assert.isFalse(next(new Error()));
// 			// sinon.assert.called(next);

// 			// Qui 05/10

// 			// resMock.status(500).json({
// 			// 	message: `Error in searching order`
// 			// });
// 		});
// 	});

// 	after(() => {
// 		router.get.restore();
// 		stubOrderFindOne.restore();
// 	});
// });

// describe("Stub router order Get One - Order not found", async () => {
// 	const testOrderGet = "order000001";
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{ params: testOrderGet },
// 			{
// 				message: `${testOrderGet} not exists`
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for order router get (one) - order not found", async () => {
// 		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
// 			expect("Content-Type", /json/);
// 			expect(200);

// 			sinon.assert.calledWith(router.get, `/orders-archieve/${testOrderGet}`);

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);

// 			stubGetOneOrder(reqMock, resMock, next);

// 			stubOrderFindOne.withArgs({ orderid: testOrderGet }).returns(null);
// 			const existence = await Order.findOne({ orderid: testOrderGet });
// 			resMock.status(200).json({
// 				message: `order000001 not exists`
// 			});
// 		});
// 	});
// 	it("Stub for router order get (one) - Handle Error", async () => {
// 		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetOneOrder(null, null, next);
// 		});
// 	});

// 	after(() => {
// 		stubOrderFindOne.restore();
// 		router.get.restore();
// 	});
// });

// // forse reinserire -->
// describe("Stub router order Get One - Error", async () => {
// 	const testOrderGet = "order000001";
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{ params: testOrderGet },
// 			{
// 				message: `Error in searching order`
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for order router get (one) - Error", async () => {
// 		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
// 			expect("Content-Type", /json/);
// 			expect(500);

// 			sinon.assert.calledWith(router.get, `/orders-archieve/${testOrderGet}`);

// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetOneOrder(reqMock, resMock, new Error());
// 			resMock.status(500).json({
// 				message: `Error in searching order`
// 			});
// 		});
// 	});
// 	it("Stub for router order get (one) - Handle Error", async () => {
// 		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
// 			// expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubGetOneOrder(null, null, next);
// 		});
// 	});

// 	after(() => {
// 		stubOrderFindOne.restore();
// 		router.get.restore();
// 	});
// });

// // QUI

// const stubpostOneOrder = sinon.stub(postOneOrder);
// // stubpostOneOrder.onCall(0).returs()
// // stubpostOneOrder.onCall(0).returns({ message0: "User23 not exist." });

// describe("Stub router order Post - user not exists", async () => {
// 	// --
// 	// let stubpostOneOrder;
// 	before(() => {
// 		const stub = sinon.stub(router, "post").yields(
// 			{
// 				body: {
// 					orderid: "order00001",
// 					users: [
// 						{
// 							username: "User23",
// 							products: [
// 								{
// 									productname: "Watermelon",
// 									quantity: 23
// 								},
// 								{
// 									productname: "Strawberries",
// 									quantity: 23
// 								}
// 							]
// 						}
// 					],
// 					shipped: false
// 				}
// 			},
// 			{ message0: "User23 not exist." },
// 			null
// 		);
// 	});
// 	it("Stub for order router post - user not exists", async () => {
// 		router.post("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubMethod = sinon.stub(postOneOrder);
// 			// stubMethod(req, res, next);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// 			// {
// 			// 	name: "User23",
// 			// 	data: stubUserFindOne.withArgs({ username: "User23" }).returns(null)
// 			// }

// 			stubpostOneOrder(reqMock, resMock, next);

// 			// console.log(test);

// 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// 				findData: stubUserFindOne.withArgs({ username: "User23" }).returns([
// 					{
// 						name: "User23",
// 						data: null
// 					}
// 				]),
// 				usersExistCheck: sinon
// 					.stub()
// 					.returns({ message0: "User23 not exist." }),
// 				updateAccountsNewOrder: sinon.stub().returns(null),
// 				updateAccountsDelOrder: sinon.stub().returns(null)
// 			});

// 			const userUpdater = new UserUpdaterClass();

// 			userUpdaterStub.data = req.body;
// 			userUpdaterStub.userModel = User;
// 			userUpdaterStub.orderModel = Order;
// 			userUpdaterStub.response = res;

// 			await userUpdaterStub.findData();
// 			await userUpdaterStub.usersExistCheck();

// 			console.log(userUpdaterStub.usersExistCheck());

// 			resMock.status(200).json({ message0: "User23 not exist." });

// 			expect("Content-Type", /json/);
// 			expect(200);
// 			assert.match(res, { message0: "User23 not exist." });
// 			expect(res).to.have.property("message0");
// 			// stubpostOneOrder.restore();

// 			// userUpdaterStub.findData().restore();
// 			// await userUpdaterStub.usersExistCheck().restore();
// 			// stubpostOneOrderTest.restore();
// 		});
// 	});
// 	it("Stub for router order post - Handle Error", async () => {
// 		router.post(`/orders-archieve/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);
// 			await stubpostOneOrder(null, null, next);
// 			// await stubpostOneOrder(reqMock, resMock, next);

// 			// stubpostOneOrder.restore();
// 		});
// 	});

// 	after(() => {
// 		// stubpostOneOrder.restore();
// 		// User.findOne.restore();
// 		// stubpostOneOrderTest.restore();
// 		// stubOrderFindOne.restore();

// 		// postOneOrder.reset();
// 		router.post.restore();
// 	});
// });

// // const stubpostOneOrder = sinon.stub(postOneOrder);

// // const stubpostOneOrder = sinon.stub(postOneOrder);

// describe("Stub router order Post - order just exists", async () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "post").yields(
// 			{
// 				body: {
// 					orderid: "order000001",
// 					users: [
// 						{
// 							username: "UserOne",
// 							products: [
// 								{
// 									productname: "Watermelon",
// 									quantity: 23
// 								},
// 								{
// 									productname: "Strawberries",
// 									quantity: 23
// 								}
// 							]
// 						}
// 					],
// 					shipped: false
// 				}
// 			},
// 			{
// 				body: {
// 					message: "OrderId already exists"
// 				}
// 			},
// 			null
// 		);
// 	});

// 	it("Stub for order router post - order just exists", async () => {
// 		router.post("/orders-archieve/", async (req, res, next) => {
// 			sinon.assert.calledWith(router.post, "/orders-archieve/");

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);
// 			// stubpostOneOrder.returns(res);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// 			await stubpostOneOrder(reqMock, resMock, next);

// 			// console.log(resMock);

// 			// QUI 11/10

// 			// const result = await Order.findOne({ orderid: "order000002" });

// 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// 				findData: sinon.stub().returns([
// 					{
// 						name: "UserOne",
// 						data: stubUserFindOne.withArgs({ username: "UserOne" }).returns({
// 							firstname: "UserFromInsomnia",
// 							lastname: "from req.body",
// 							username: "UserOne",
// 							address: "test@request.com",
// 							orders: [
// 								{
// 									orderid: "00001",
// 									url: "none"
// 								}
// 							]
// 						})
// 					}
// 				]),
// 				usersExistCheck: sinon.stub().returns({}),
// 				updateAccountsNewOrder: sinon.stub().returns(null),
// 				updateAccountsDelOrder: sinon.stub().returns(null)
// 			});

// 			const userUpdater = new UserUpdaterClass();

// 			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
// 				orderExistsCheck: sinon.stub().returns({
// 					message: "OrderId already exists"
// 				}),
// 				searchProd: sinon.stub().returns(null),
// 				createResults: sinon.stub().returns(null),
// 				createNewOrder: sinon.stub().returns(null),
// 				restoreQuantities: sinon.stub().returns(null)
// 			});

// 			const prodUpManager = new ProductUpdaterClass();

// 			userUpdaterStub.data = req.body;
// 			userUpdaterStub.userModel = User;
// 			userUpdaterStub.orderModel = Order;
// 			userUpdaterStub.response = res;

// 			prodUpStub.data = req.body;
// 			prodUpStub.productModel = Product;
// 			prodUpStub.orderModel = Order;
// 			prodUpStub.response = res;

// 			await userUpdaterStub.findData();
// 			await userUpdaterStub.usersExistCheck();

// 			await prodUpStub.orderExistsCheck();
// 			// await prodUpStub.searchProd();
// 			// await prodUpStub.createResults();
// 			// await prodUpStub.createNewOrder();
// 			// await prodUpStub.restoreQuantities();

// 			// console.log(r);
// 			// console.log(ord);

// 			resMock.status(200).json({
// 				message: "OrderId already exists"
// 			});

// 			console.log(resMock);

// 			expect("Content-Type", /json/);
// 			expect(200);
// 			sinon.assert.match(res.body, {
// 				message: "OrderId already exists"
// 			});
// 			expect(res.body).to.have.property("message");
// 			assert.strictEqual(res.body, {
// 				message: "OrderId already exists"
// 			});
// 			// stubpostOneOrder.restore();
// 		});
// 	});
// 	it("Stub for router order post - Handle Error", async () => {
// 		router.post(`/orders-archieve/`, async (req, res, next) => {
// 			expect(404);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// 			await stubpostOneOrder(null, null, next);
// 			// res.status(404).json({ message: "Problem occured" });

// 			// stubpostOneOrder.restore();
// 		});
// 	});
// 	after(() => {
// 		// stubUserFindOne.restore();
// 		// stubOrderFindOne.restore();
// 		router.post.restore();
// 	});
// });

// describe("Stub router order Post - not enought products", async () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "post").yields(
// 			{
// 				body: JSON.stringify({
// 					orderid: "order000001",
// 					users: [
// 						{
// 							username: "UserOne",
// 							products: [
// 								{
// 									productname: "Watermelon",
// 									quantity: 23
// 								},
// 								{
// 									productname: "Strawberries",
// 									quantity: 23
// 								}
// 							]
// 						}
// 					],
// 					shipped: false,
// 					date: "2022-09-06T21:55:50.076+00:00",
// 					totalcost: 2000
// 				})
// 			},
// 			{ message1: "Too little quantity of Watermelon" },
// 			null
// 		);
// 	});
// 	it("Stub for order router post - not enought products", async () => {
// 		router.post("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubMethod = sinon.stub(postOneOrder);
// 			// stubMethod(req, res, next);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// 			stubpostOneOrder(reqMock, resMock, next);

// 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// 				findData: sinon.stub().returns([
// 					{
// 						name: "UserOne",
// 						data: stubUserFindOne.withArgs({ username: "UserOne" }).returns({
// 							firstname: "UserFromInsomnia",
// 							lastname: "from req.body",
// 							username: "UserOne",
// 							address: "test@request.com",
// 							orders: [
// 								{
// 									orderid: "00001",
// 									url: "none"
// 								}
// 							]
// 						})
// 					}
// 				]),
// 				usersExistCheck: sinon.stub().returns({}),
// 				updateAccountsNewOrder: sinon.stub().returns(null),
// 				updateAccountsDelOrder: sinon.stub().returns(null)
// 			});

// 			const userUpdater = new UserUpdaterClass();

// 			userUpdaterStub.data = req.body;
// 			userUpdaterStub.userModel = User;
// 			userUpdaterStub.orderModel = Order;
// 			userUpdaterStub.response = res;

// 			// userUpdaterStub.findData();
// 			userUpdaterStub.usersExistCheck();

// 			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
// 				orderExistsCheck: sinon.stub().returns(null),
// 				searchProd: sinon.stub().returns([
// 					{ productname: "Watermelon", response: "positive", quantity: 23 },
// 					{ productname: "Strawberries", response: "positive", quantity: 23 },
// 					{
// 						productname: "Watermelon",
// 						response: "negative",
// 						message: "Too little quantity of Watermelon"
// 					},
// 					{ productname: "Strawberries", response: "positive", quantity: 23 }
// 				]),
// 				createResults: sinon
// 					.stub()
// 					.returns({ productname: "Strawberries", quantity: 23 }),
// 				createNewOrder: sinon.stub().returns(1),
// 				restoreQuantities: sinon.stub().returns(null)
// 			});

// 			const prodUpManager = new ProductUpdaterClass();

// 			prodUpStub.data = req.body;
// 			prodUpStub.productModel = Product;
// 			prodUpStub.orderModel = Order;
// 			prodUpStub.response = res;

// 			prodUpStub.orderExistsCheck();
// 			prodUpStub.searchProd();
// 			prodUpStub.createResults();
// 			prodUpStub.createNewOrder();
// 			prodUpStub.restoreQuantities();

// 			resMock
// 				.status(200)
// 				.json({ message1: "Too little quantity of Watermelon" });

// 			expect("Content-Type", /json/);
// 			expect(200);
// 			assert.match(JSON.parse(res), {
// 				message1: `Too little quantity of Watermelon`
// 			});
// 			// stubpostOneOrder.restore();

// 			// expect(res).to.have.property("message1");
// 		});
// 	});
// 	it("Stub for router order post - Handle Error", async () => {
// 		router.post(`/orders-archieve/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// 			await stubpostOneOrder(reqMock, resMock, next);
// 			// stubpostOneOrder.restore();
// 		});
// 	});

// 	after(() => {
// 		// postOneOrder.restore();

// 		// stubUserFindOne.restore();
// 		router.post.restore();
// 	});
// });

// describe("Stub router order Post", async () => {
// 	// const stubpostOneOrder = sinon.stub(postOneOrder);

// 	before(() => {
// 		const stub = sinon.stub(router, "post").yields(
// 			{
// 				body: {
// 					orderid: "order000001",
// 					users: [
// 						{
// 							username: "UserOne",
// 							products: [
// 								{
// 									productname: "Watermelon",
// 									quantity: 23
// 								},
// 								{
// 									productname: "Strawberries",
// 									quantity: 23
// 								}
// 							]
// 						}
// 					],
// 					shipped: false
// 				}
// 			},
// 			{
// 				orderid: "order000001",
// 				users: [
// 					{
// 						username: "UserOne",
// 						products: [
// 							{
// 								productname: "Watermelon",
// 								quantity: 23
// 							},
// 							{
// 								productname: "Strawberries",
// 								quantity: 23
// 							}
// 						]
// 					}
// 				],
// 				shipped: false,
// 				date: "2022-09-06T21:55:50.076+00:00",
// 				totalcost: 2000
// 			},
// 			null
// 		);
// 		// stub.onCall(0).returns() - ?
// 	});
// 	it("Stub for order router post", async () => {
// 		router.post("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// 			await stubpostOneOrder(reqMock, resMock, next);

// 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// 				findData: sinon.stub().resolves([
// 					{
// 						name: "UserOne",
// 						data: stubUserFindOne.withArgs({ username: "UserOne" }).returns({
// 							firstname: "UserFromInsomnia",
// 							lastname: "from req.body",
// 							username: "UserOne",
// 							address: "test@request.com",
// 							orders: []
// 						})
// 					}
// 				]),
// 				usersExistCheck: sinon.stub().resolves({}),
// 				updateAccountsNewOrder: sinon.stub().resolves(
// 					stubUserFindUp
// 						.withArgs(
// 							{ username: "User1" },
// 							{
// 								orders: [
// 									{
// 										orderid: "00001",
// 										url: "none"
// 									}
// 								]
// 							}
// 						)
// 						.resolves({
// 							firstname: "UserFromInsomnia",
// 							lastname: "from req.body",
// 							username: "UserOne",
// 							address: "test@request.com",
// 							orders: [
// 								{
// 									orderid: "00001",
// 									url: "none"
// 								}
// 							]
// 						})
// 				)
// 			});

// 			const userUpdater = new UserUpdaterClass();

// 			userUpdaterStub.data = req.body;
// 			userUpdaterStub.userModel = User;
// 			userUpdaterStub.orderModel = Order;
// 			userUpdaterStub.response = res;

// 			// await userUpdaterStub.findData();

// 			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
// 				orderExistsCheck: sinon.stub().returns(null),
// 				searchProd: sinon.stub().returns([
// 					{ productname: "Watermelon", response: "positive", quantity: 23 },
// 					{ productname: "Strawberries", response: "positive", quantity: 23 },
// 					{ productname: "Watermelon", response: "positive", quantity: 23 },
// 					{ productname: "Strawberries", response: "positive", quantity: 23 }
// 				]),
// 				createResults: sinon.stub().returns(null),
// 				createNewOrder: sinon.stub().returns(0),
// 				restoreQuantities: sinon.stub().returns(null)
// 			});

// 			const prodUpManager = new ProductUpdaterClass();

// 			prodUpStub.data = req.body;
// 			prodUpStub.productModel = Product;
// 			prodUpStub.orderModel = Order;
// 			prodUpStub.response = res;

// 			await userUpdaterStub.usersExistCheck();
// 			await prodUpStub.orderExistsCheck();

// 			const t = await prodUpStub.searchProd();
// 			// console.log(t);

// 			await prodUpStub.createResults();
// 			await prodUpStub.createNewOrder();

// 			await userUpdaterStub.updateAccountsNewOrder();

// 			// await prodUpStub.restoreQuantities();

// 			// userUpdaterStub.updateAccountsDelOrder();

// 			resMock.status(200).json({
// 				orderid: "order000001",
// 				users: [
// 					{
// 						username: "UserOne",
// 						products: [
// 							{
// 								productname: "Watermelon",
// 								quantity: 23
// 							},
// 							{
// 								productname: "Strawberries",
// 								quantity: 23
// 							}
// 						]
// 					}
// 				],
// 				shipped: false,
// 				date: "2022-09-06T21:55:50.076+00:00",
// 				totalcost: 2000
// 			});

// 			// userUpdaterStub.resultUpdate = await this.userModel.findOneAndUpdate(
// 			// 	{
// 			// 		username: elem
// 			// 	},
// 			// 	{
// 			// 		orders: this.updatedField
// 			// 	}
// 			// );

// 			expect("Content-Type", /json/);
// 			expect(200);
// 			sinon.assert.match(res, {
// 				orderid: "order000001",
// 				users: [
// 					{
// 						username: "UserOne",
// 						products: [
// 							{
// 								productname: "Watermelon",
// 								quantity: 23
// 							},
// 							{
// 								productname: "Strawberries",
// 								quantity: 23
// 							}
// 						]
// 					}
// 				],
// 				shipped: false,
// 				date: "2022-09-06T21:55:50.076+00:00",
// 				totalcost: 2000
// 			});
// 			expect(res).to.have.property("orderid");
// 			expect(res).to.have.property("users");
// 			expect(res).to.have.property("shipped");
// 			expect(res).to.have.property("date");
// 			expect(res).to.have.property("totalcost");

// 			stubpostOneOrder.restore();

// 			// stubMethod.restore();
// 		});
// 	});

// 	it("Stub for router order post - Handle Error", async () => {
// 		router.post(`/orders-archieve/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();

// 			await stubpostOneOrder(reqMock, resMock, next);
// 		});
// 	});

// 	after(() => {
// 		// stubUserFindOne.restore();
// 		router.post.restore();
// 	});
// });

// //  con stub.onCall(0).returns() ? ---->

// // describe("Stub router order Post", async () => {
// // 	// const stubpostOneOrder = sinon.stub(postOneOrder);

// // 	before(() => {
// // 		const stub = sinon.stub(router, "post").yields(
// // 			{
// // 				body: {
// // 					orderid: "order000001",
// // 					users: [
// // 						{
// // 							username: "UserOne",
// // 							products: [
// // 								{
// // 									productname: "Watermelon",
// // 									quantity: 23
// // 								},
// // 								{
// // 									productname: "Strawberries",
// // 									quantity: 23
// // 								}
// // 							]
// // 						}
// // 					],
// // 					shipped: false
// // 				}
// // 			},
// // 			{
// // 				orderid: "order000001",
// // 				users: [
// // 					{
// // 						username: "UserOne",
// // 						products: [
// // 							{
// // 								productname: "Watermelon",
// // 								quantity: 23
// // 							},
// // 							{
// // 								productname: "Strawberries",
// // 								quantity: 23
// // 							}
// // 						]
// // 					}
// // 				],
// // 				shipped: false,
// // 				date: "2022-09-06T21:55:50.076+00:00",
// // 				totalcost: 2000
// // 			},
// // 			null
// // 		);
// // 		// stub.onCall(0).returns() - ?
// // 	});
// // 	it("Stub for order router post", async () => {
// // 		router.post("/orders-archieve/", async (req, res, next) => {
// // 			const reqMock = mockReq(req);
// // 			const resMock = mockRes(res);
// // 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// // 			await stubpostOneOrder(reqMock, resMock, next);

// // 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// // 				findData: sinon.stub().resolves([
// // 					{
// // 						name: "UserOne",
// // 						data: stubUserFindOne.withArgs({ username: "UserOne" }).returns({
// // 							firstname: "UserFromInsomnia",
// // 							lastname: "from req.body",
// // 							username: "UserOne",
// // 							address: "test@request.com",
// // 							orders: []
// // 						})
// // 					}
// // 				]),
// // 				usersExistCheck: sinon.stub().resolves({}),
// // 				updateAccountsNewOrder: sinon.stub().resolves(
// // 					stubUserFindUp
// // 						.withArgs(
// // 							{ username: "User1" },
// // 							{
// // 								orders: [
// // 									{
// // 										orderid: "00001",
// // 										url: "none"
// // 									}
// // 								]
// // 							}
// // 						)
// // 						.resolves({
// // 							firstname: "UserFromInsomnia",
// // 							lastname: "from req.body",
// // 							username: "UserOne",
// // 							address: "test@request.com",
// // 							orders: [
// // 								{
// // 									orderid: "00001",
// // 									url: "none"
// // 								}
// // 							]
// // 						})
// // 				)
// // 			});

// // 			const userUpdater = new UserUpdaterClass();

// // 			userUpdaterStub.data = req.body;
// // 			userUpdaterStub.userModel = User;
// // 			userUpdaterStub.orderModel = Order;
// // 			userUpdaterStub.response = res;

// // 			// await userUpdaterStub.findData();

// // 			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
// // 				orderExistsCheck: sinon.stub().returns(null),
// // 				searchProd: sinon.stub().returns([
// // 					{ productname: "Watermelon", response: "positive", quantity: 23 },
// // 					{ productname: "Strawberries", response: "positive", quantity: 23 },
// // 					{ productname: "Watermelon", response: "positive", quantity: 23 },
// // 					{ productname: "Strawberries", response: "positive", quantity: 23 }
// // 				]),
// // 				createResults: sinon.stub().returns(null),
// // 				createNewOrder: sinon.stub().returns(0),
// // 				restoreQuantities: sinon.stub().returns(null)
// // 			});

// // 			const prodUpManager = new ProductUpdaterClass();

// // 			prodUpStub.data = req.body;
// // 			prodUpStub.productModel = Product;
// // 			prodUpStub.orderModel = Order;
// // 			prodUpStub.response = res;

// // 			await userUpdaterStub.usersExistCheck();
// // 			await prodUpStub.orderExistsCheck();

// // 			const t = await prodUpStub.searchProd();
// // 			// console.log(t);

// // 			await prodUpStub.createResults();
// // 			await prodUpStub.createNewOrder();

// // 			await userUpdaterStub.updateAccountsNewOrder();

// // 			// await prodUpStub.restoreQuantities();

// // 			// userUpdaterStub.updateAccountsDelOrder();

// // 			resMock.status(200).json({
// // 				orderid: "order000001",
// // 				users: [
// // 					{
// // 						username: "UserOne",
// // 						products: [
// // 							{
// // 								productname: "Watermelon",
// // 								quantity: 23
// // 							},
// // 							{
// // 								productname: "Strawberries",
// // 								quantity: 23
// // 							}
// // 						]
// // 					}
// // 				],
// // 				shipped: false,
// // 				date: "2022-09-06T21:55:50.076+00:00",
// // 				totalcost: 2000
// // 			});

// // 			// userUpdaterStub.resultUpdate = await this.userModel.findOneAndUpdate(
// // 			// 	{
// // 			// 		username: elem
// // 			// 	},
// // 			// 	{
// // 			// 		orders: this.updatedField
// // 			// 	}
// // 			// );

// // 			expect("Content-Type", /json/);
// // 			expect(200);
// // 			sinon.assert.match(res, {
// // 				orderid: "order000001",
// // 				users: [
// // 					{
// // 						username: "UserOne",
// // 						products: [
// // 							{
// // 								productname: "Watermelon",
// // 								quantity: 23
// // 							},
// // 							{
// // 								productname: "Strawberries",
// // 								quantity: 23
// // 							}
// // 						]
// // 					}
// // 				],
// // 				shipped: false,
// // 				date: "2022-09-06T21:55:50.076+00:00",
// // 				totalcost: 2000
// // 			});
// // 			expect(res).to.have.property("orderid");
// // 			expect(res).to.have.property("users");
// // 			expect(res).to.have.property("shipped");
// // 			expect(res).to.have.property("date");
// // 			expect(res).to.have.property("totalcost");

// // 			stubpostOneOrder.restore();

// // 			// stubMethod.restore();
// // 		});
// // 	});

// // 	it("Stub for order router post - not enought products", async () => {
// // 		router.post("/orders-archieve/", async (req, res, next) => {
// // 			const reqMock = mockReq(req);
// // 			const resMock = mockRes(res);
// // 			// const stubMethod = sinon.stub(postOneOrder);
// // 			// stubMethod(req, res, next);
// // 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// // 			stubpostOneOrder(reqMock, resMock, next);

// // 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// // 				findData: sinon.stub().returns([
// // 					{
// // 						name: "UserOne",
// // 						data: stubUserFindOne.withArgs({ username: "UserOne" }).returns({
// // 							firstname: "UserFromInsomnia",
// // 							lastname: "from req.body",
// // 							username: "UserOne",
// // 							address: "test@request.com",
// // 							orders: [
// // 								{
// // 									orderid: "00001",
// // 									url: "none"
// // 								}
// // 							]
// // 						})
// // 					}
// // 				]),
// // 				usersExistCheck: sinon.stub().returns({}),
// // 				updateAccountsNewOrder: sinon.stub().returns(null),
// // 				updateAccountsDelOrder: sinon.stub().returns(null)
// // 			});

// // 			const userUpdater = new UserUpdaterClass();

// // 			userUpdaterStub.data = req.body;
// // 			userUpdaterStub.userModel = User;
// // 			userUpdaterStub.orderModel = Order;
// // 			userUpdaterStub.response = res;

// // 			// userUpdaterStub.findData();
// // 			userUpdaterStub.usersExistCheck();

// // 			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
// // 				orderExistsCheck: sinon.stub().returns(null),
// // 				searchProd: sinon.stub().returns([
// // 					{ productname: "Watermelon", response: "positive", quantity: 23 },
// // 					{ productname: "Strawberries", response: "positive", quantity: 23 },
// // 					{
// // 						productname: "Watermelon",
// // 						response: "negative",
// // 						message: "Too little quantity of Watermelon"
// // 					},
// // 					{ productname: "Strawberries", response: "positive", quantity: 23 }
// // 				]),
// // 				createResults: sinon
// // 					.stub()
// // 					.returns({ productname: "Strawberries", quantity: 23 }),
// // 				createNewOrder: sinon.stub().returns(1),
// // 				restoreQuantities: sinon.stub().returns(null)
// // 			});

// // 			const prodUpManager = new ProductUpdaterClass();

// // 			prodUpStub.data = req.body;
// // 			prodUpStub.productModel = Product;
// // 			prodUpStub.orderModel = Order;
// // 			prodUpStub.response = res;

// // 			prodUpStub.orderExistsCheck();
// // 			prodUpStub.searchProd();
// // 			prodUpStub.createResults();
// // 			prodUpStub.createNewOrder();
// // 			prodUpStub.restoreQuantities();

// // 			resMock
// // 				.status(200)
// // 				.json({ message1: "Too little quantity of Watermelon" });

// // 			expect("Content-Type", /json/);
// // 			expect(200);
// // 			assert.match(JSON.parse(res), {
// // 				message1: `Too little quantity of Watermelon`
// // 			});
// // 			// stubpostOneOrder.restore();

// // 			// expect(res).to.have.property("message1");
// // 		});
// // 	});

// // 	it("Stub for order router post - order just exists", async () => {
// // 		router.post("/orders-archieve/", async (req, res, next) => {
// // 			sinon.assert.calledWith(router.post, "/orders-archieve/");

// // 			const reqMock = mockReq(req);
// // 			const resMock = mockRes(res);
// // 			// const stubpostOneOrder = sinon.stub(postOneOrder);
// // 			// stubpostOneOrder.returns(res);
// // 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// // 			await stubpostOneOrder(reqMock, resMock, next);

// // 			// console.log(resMock);

// // 			// QUI 11/10

// // 			// const result = await Order.findOne({ orderid: "order000002" });

// // 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// // 				findData: sinon.stub().returns([
// // 					{
// // 						name: "UserOne",
// // 						data: stubUserFindOne.withArgs({ username: "UserOne" }).returns({
// // 							firstname: "UserFromInsomnia",
// // 							lastname: "from req.body",
// // 							username: "UserOne",
// // 							address: "test@request.com",
// // 							orders: [
// // 								{
// // 									orderid: "00001",
// // 									url: "none"
// // 								}
// // 							]
// // 						})
// // 					}
// // 				]),
// // 				usersExistCheck: sinon.stub().returns({}),
// // 				updateAccountsNewOrder: sinon.stub().returns(null),
// // 				updateAccountsDelOrder: sinon.stub().returns(null)
// // 			});

// // 			const userUpdater = new UserUpdaterClass();

// // 			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
// // 				orderExistsCheck: sinon
// // 					.stub(Order, "findOne")
// // 					.withArgs({ orderid: reqMock.body["orderid"] })
// // 					.returns({
// // 						orderid: "order000001",
// // 						users: [
// // 							{
// // 								username: "UserOne",
// // 								products: [
// // 									{
// // 										productname: "Watermelon",
// // 										quantity: 23
// // 									},
// // 									{
// // 										productname: "Strawberries",
// // 										quantity: 23
// // 									}
// // 								]
// // 							}
// // 						],
// // 						shipped: false,
// // 						date: "2022-09-06T21:55:50.076+00:00",
// // 						totalcost: 2000
// // 					}),
// // 				searchProd: sinon.stub().returns({
// // 					message: "OrderId already exists"
// // 				}),
// // 				createResults: sinon.stub().returns(null),
// // 				createNewOrder: sinon.stub().returns(null),
// // 				restoreQuantities: sinon.stub().returns(null)
// // 			});

// // 			const prodUpManager = new ProductUpdaterClass();

// // 			userUpdaterStub.data = req.body;
// // 			userUpdaterStub.userModel = User;
// // 			userUpdaterStub.orderModel = Order;
// // 			userUpdaterStub.response = res;

// // 			prodUpStub.data = req.body;
// // 			prodUpStub.productModel = Product;
// // 			prodUpStub.orderModel = Order;
// // 			prodUpStub.response = res;

// // 			userUpdaterStub.findData();
// // 			userUpdaterStub.usersExistCheck();

// // 			prodUpStub.orderExistsCheck();
// // 			// await prodUpStub.searchProd();
// // 			// await prodUpStub.createResults();
// // 			// await prodUpStub.createNewOrder();
// // 			// await prodUpStub.restoreQuantities();

// // 			// console.log(r);
// // 			// console.log(ord);

// // 			resMock.status(200).json({
// // 				message: "OrderId already exists"
// // 			});

// // 			console.log(resMock);

// // 			expect("Content-Type", /json/);
// // 			expect(200);
// // 			sinon.assert.match(res.body, {
// // 				message: "OrderId already exists"
// // 			});
// // 			expect(res.body).to.have.property("message");
// // 			assert.strictEqual(res.body, {
// // 				message: "OrderId already exists"
// // 			});
// // 			// stubpostOneOrder.restore();
// // 		});
// // 	});

// // 	it("Stub for order router post - user not exists", async () => {
// // 		router.post("/orders-archieve/", async (req, res, next) => {
// // 			const reqMock = mockReq(req);
// // 			const resMock = mockRes(res);
// // 			// const stubMethod = sinon.stub(postOneOrder);
// // 			// stubMethod(req, res, next);
// // 			// const stubpostOneOrder = sinon.stub(postOneOrder);
// // 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// // 			// {
// // 			// 	name: "User23",
// // 			// 	data: stubUserFindOne.withArgs({ username: "User23" }).returns(null)
// // 			// }

// // 			stubpostOneOrder(reqMock, resMock, next);

// // 			// console.log(test);

// // 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// // 				findData: sinon.stub().returns([
// // 					{
// // 						name: "User23",
// // 						data: null
// // 					}
// // 				]),
// // 				usersExistCheck: sinon
// // 					.stub()
// // 					.returns({ message0: "User23 not exist." }),
// // 				updateAccountsNewOrder: sinon.stub().returns(null),
// // 				updateAccountsDelOrder: sinon.stub().returns(null)
// // 			});

// // 			const userUpdater = new UserUpdaterClass();

// // 			userUpdaterStub.data = req.body;
// // 			userUpdaterStub.userModel = User;
// // 			userUpdaterStub.orderModel = Order;
// // 			userUpdaterStub.response = res;

// // 			await userUpdaterStub.findData();
// // 			await userUpdaterStub.usersExistCheck();

// // 			console.log(userUpdaterStub.usersExistCheck());

// // 			resMock.status(200).json({ message0: "User23 not exist." });

// // 			expect("Content-Type", /json/);
// // 			expect(200);
// // 			assert.match(res, { message0: "User23 not exist." });
// // 			expect(res).to.have.property("message0");
// // 			// stubpostOneOrder.restore();

// // 			// userUpdaterStub.findData().restore();
// // 			// await userUpdaterStub.usersExistCheck().restore();
// // 			// stubpostOneOrderTest.restore();
// // 		});
// // 	});

// // 	it("Stub for router order post - Handle Error", async () => {
// // 		router.post(`/orders-archieve/`, async (req, res, next) => {
// // 			expect(500);
// // 			const reqMock = mockReq(req);
// // 			const resMock = new Error();

// // 			await stubpostOneOrder(reqMock, resMock, next);
// // 		});
// // 	});

// // 	after(() => {
// // 		// stubUserFindOne.restore();
// // 		router.post.restore();
// // 	});
// // });

// //

// const stubPutOneOrder = sinon.stub(putOneOrder);

// describe("Stub router order Put", async () => {
// 	const testOrderPut = "order00001";
// 	const newShipStatus = true;
// 	before(() => {
// 		const stub = sinon.stub(router, "put").yields(
// 			{ params: testOrderPut },
// 			{
// 				orderid: testOrderPut,
// 				users: [
// 					{
// 						username: "UserOne",
// 						products: [
// 							{
// 								productname: "Watermelon",
// 								quantity: 23
// 							},
// 							{
// 								productname: "Strawberries",
// 								quantity: 23
// 							}
// 						]
// 					}
// 				],
// 				shipped: newShipStatus,
// 				date: "2022-09-06T21:55:50.076+00:00",
// 				totalcost: 2000
// 			},
// 			null
// 		);
// 	});
// 	it("Stub for order router put", async () => {
// 		router.put(`/orders-archieve/${testOrderPut}`, async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);

// 			stubPutOneOrder(reqMock, resMock, next);

// 			const stubUserFindUp = sinon
// 				.stub(Order, "findOneAndUpdate")
// 				.withArgs({ orderid: testOrderPut })
// 				.returns({
// 					orderid: testOrderPut,
// 					users: [
// 						{
// 							username: "UserOne",
// 							products: [
// 								{
// 									productname: "Watermelon",
// 									quantity: 23
// 								},
// 								{
// 									productname: "Strawberries",
// 									quantity: 23
// 								}
// 							]
// 						}
// 					],
// 					shipped: newShipStatus,
// 					date: "2022-09-06T21:55:50.076+00:00",
// 					totalcost: 2000
// 				});
// 			const result = await User.findOneAndUpdate(
// 				{ orderid: testOrderPut },
// 				{
// 					orderid: testOrderPut,
// 					users: [
// 						{
// 							username: "UserOne",
// 							products: [
// 								{
// 									productname: "Watermelon",
// 									quantity: 23
// 								},
// 								{
// 									productname: "Strawberries",
// 									quantity: 23
// 								}
// 							]
// 						}
// 					],
// 					shipped: newShipStatus,
// 					date: "2022-09-06T21:55:50.076+00:00",
// 					totalcost: 2000
// 				}
// 			);

// 			// testing
// 			resMock.status(200).json(result);
// 			// testing

// 			expect(res).to.have.property("orderid");
// 			expect(res).to.have.property("users");
// 			expect(res).to.have.property("shipped");
// 			expect(res).to.have.property("date");
// 			expect(res).to.have.property("totalcost");
// 			expect(resMock.status).to.equal(200);
// 		});
// 	});
// 	it("Stub for router order put - Handle Error", async () => {
// 		router.put(`/orders-archieve/${testOrderPut}`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();
// 			stubPutOneOrder(reqMock, resMock, next);
// 		});
// 	});

// 	after(() => {
// 		router.put.restore();
// 	});
// });

// const stubDeleteOneOrder = sinon.stub(deleteOneOrder);

// describe("Stub router order Delete One", async () => {
// 	const testOrderDelete = "order00001";

// 	before(() => {
// 		const stub = sinon.stub(router, "delete").yields(
// 			{ params: testOrderDelete },
// 			{
// 				message: "Order delete."
// 			},
// 			null
// 		);
// 	});

// 	it("Stub for order router delete", async () => {
// 		router.delete(
// 			`/orders-archieve/${testOrderDelete}`,
// 			async (req, res, next) => {
// 				const reqMock = mockReq(req);
// 				const resMock = mockRes(res);
// 				stubDeleteOneOrder(reqMock, resMock, next);

// 				const stubOrderFindDel = sinon
// 					.stub(Order, "findOneAndDelete")
// 					.withArgs({
// 						orderid: "order000002"
// 					})
// 					.returns({
// 						orderid: "order000002",
// 						users: [
// 							{
// 								username: "UserOne",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						totalcost: 2000
// 					});
// 				const orderRemoved = await Order.findOneAndDelete({
// 					orderid: "order000002"
// 				});
// 				console.log(orderRemoved);

// 				const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// 					findData: sinon.stub().returnsThis(),
// 					usersExistCheck: sinon.stub().returnsThis(),
// 					updateAccountsNewOrder: sinon.stub().returns(null),
// 					updateAccountsDelOrder: sinon.stub().returnsThis()
// 				});

// 				const userUpdater = new UserUpdaterClass();

// 				userUpdater.data = orderRemoved;
// 				userUpdater.userModel = User;
// 				userUpdater.orderModel = Order;
// 				userUpdater.response = res;

// 				const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
// 					orderExistsCheck: sinon.stub().returnsThis(),
// 					searchProd: sinon.stub().returnsThis(),
// 					createResults: sinon.stub().returnsThis(),
// 					createNewOrder: sinon.stub().returnsThis(),
// 					restoreQuantities: sinon.stub().returnsThis()
// 				});

// 				const prodUdManager = new ProductUpdaterClass();

// 				prodUdManager.data = orderRemoved;
// 				prodUdManager.productModel = Product;
// 				prodUdManager.orderModel = Order;
// 				prodUdManager.response = res;

// 				userUpdater.findData();
// 				userUpdater.usersExistCheck();
// 				userUpdater.updateAccountsNewOrder();
// 				userUpdater.updateAccountsDelOrder();

// 				prodUdManager.orderExistsCheck();
// 				prodUdManager.searchProd();
// 				prodUdManager.createResults();
// 				prodUdManager.createNewOrder();
// 				prodUdManager.restoreQuantities();

// 				// for (let orders of userUpdater.fieldsToUpdate) {

// 				// }
// 				resMock.status(200).json({
// 					message: "Order delete."
// 				});

// 				// console.log(result);

// 				expect("Content-Type", /json/);
// 				expect(200);

// 				expect(res).to.have.property("message");
// 			}
// 		);
// 	});
// 	it("Stub for router order delete - Handle Error", async () => {
// 		router.delete(
// 			`/orders-archieve/${testOrderDelete}`,
// 			async (req, res, next) => {
// 				expect(500);
// 				const reqMock = mockReq(req);
// 				const resMock = new Error();
// 				stubDeleteOneOrder(reqMock, resMock, next);
// 			}
// 		);
// 	});

// 	after(() => {
// 		router.delete.restore();
// 	});
// });

// // // ----------- Order tests

// const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
// 	orderExistsCheck: stubOrderFindOne
// 		.withArgs({ orderid: "order000001" })
// 		.returns({
// 			message: "OrderId already exists"
// 		}),
// 	searchProd: sinon.stub().returns(null),
// 	createResults: sinon.stub().returns(null),
// 	createNewOrder: sinon.stub().returns(null),
// 	restoreQuantities: sinon.stub().returns(null)
// });


			// const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
			// 	findData: sinon.stub().returns([
			// 		{
			// 			name: "User1",
			// 			data: stubUserFindOne.withArgs({ username: "User1" }).returns({
			// 				firstname: "UserFromInsomnia",
			// 				lastname: "from req.body",
			// 				username: "User1",
			// 				address: "test@request.com",
			// 				orders: []
			// 			})
			// 		}
			// 	]),
			// 	usersExistCheck: sinon.stub().returns({}),
			// 	updateAccountsNewOrder: sinon.stub().returns(
			// 		stubUserFindUp
			// 			.withArgs(
			// 				{ username: "User1" },
			// 				{
			// 					orders: [
			// 						{
			// 							orderid: "00001",
			// 							url: "none"
			// 						}
			// 					]
			// 				}
			// 			)
			// 			.returns({
			// 				firstname: "UserFromInsomnia",
			// 				lastname: "from req.body",
			// 				username: "User1",
			// 				address: "test@request.com",
			// 				orders: [
			// 					{
			// 						orderid: "00001",
			// 						url: "none"
			// 					}
			// 				]
			// 			})
			// 	)
			// });


// describe("Stub router order Post", async () => {
// 	// const stubpostOneOrder = sinon.stub(postOneOrder);

// 	before(() => {
// 		const stub = sinon.stub(router, "post").yields(
// 			{
// 				body: {
// 					orderid: "order000001",
// 					users: [
// 						{
// 							username: "UserOne",
// 							products: [
// 								{
// 									productname: "Watermelon",
// 									quantity: 23
// 								},
// 								{
// 									productname: "Strawberries",
// 									quantity: 23
// 								}
// 							]
// 						}
// 					],
// 					shipped: false
// 				}
// 			},
// 			{
// 				orderid: "order000001",
// 				users: [
// 					{
// 						username: "UserOne",
// 						products: [
// 							{
// 								productname: "Watermelon",
// 								quantity: 23
// 							},
// 							{
// 								productname: "Strawberries",
// 								quantity: 23
// 							}
// 						]
// 					}
// 				],
// 				shipped: false,
// 				date: "2022-09-06T21:55:50.076+00:00",
// 				totalcost: 2000
// 			},
// 			null
// 		);
// 		// stub.onCall(0).returns() - ?
// 	});
// 	it("Stub for order router post", async () => {
// 		router.post("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// 			await stubpostOneOrder(reqMock, resMock, next);

// 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// 				findData: sinon.stub().resolves([
// 					{
// 						name: "UserOne",
// 						data: stubUserFindOne.withArgs({ username: "UserOne" }).returns({
// 							firstname: "UserFromInsomnia",
// 							lastname: "from req.body",
// 							username: "UserOne",
// 							address: "test@request.com",
// 							orders: []
// 						})
// 					}
// 				]),
// 				usersExistCheck: sinon.stub().resolves({}),
// 				updateAccountsNewOrder: sinon.stub().resolves(
// 					stubUserFindUp
// 						.withArgs(
// 							{ username: "User1" },
// 							{
// 								orders: [
// 									{
// 										orderid: "00001",
// 										url: "none"
// 									}
// 								]
// 							}
// 						)
// 						.resolves({
// 							firstname: "UserFromInsomnia",
// 							lastname: "from req.body",
// 							username: "UserOne",
// 							address: "test@request.com",
// 							orders: [
// 								{
// 									orderid: "00001",
// 									url: "none"
// 								}
// 							]
// 						})
// 				)
// 			});

// 			const userUpdater = new UserUpdaterClass();

// 			userUpdaterStub.data = req.body;
// 			userUpdaterStub.userModel = User;
// 			userUpdaterStub.orderModel = Order;
// 			userUpdaterStub.response = res;

// 			// await userUpdaterStub.findData();

// 			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
// 				orderExistsCheck: sinon.stub().returns(null),
// 				searchProd: sinon.stub().returns([
// 					{ productname: "Watermelon", response: "positive", quantity: 23 },
// 					{ productname: "Strawberries", response: "positive", quantity: 23 },
// 					{ productname: "Watermelon", response: "positive", quantity: 23 },
// 					{ productname: "Strawberries", response: "positive", quantity: 23 }
// 				]),
// 				createResults: sinon.stub().returns(null),
// 				createNewOrder: sinon.stub().returns(0),
// 				restoreQuantities: sinon.stub().returns(null)
// 			});

// 			const prodUpManager = new ProductUpdaterClass();

// 			prodUpStub.data = req.body;
// 			prodUpStub.productModel = Product;
// 			prodUpStub.orderModel = Order;
// 			prodUpStub.response = res;

// 			await userUpdaterStub.usersExistCheck();
// 			await prodUpStub.orderExistsCheck();

// 			const t = await prodUpStub.searchProd();
// 			// console.log(t);

// 			await prodUpStub.createResults();
// 			await prodUpStub.createNewOrder();

// 			await userUpdaterStub.updateAccountsNewOrder();

// 			// await prodUpStub.restoreQuantities();

// 			// userUpdaterStub.updateAccountsDelOrder();

// 			resMock.status(200).json({
// 				orderid: "order000001",
// 				users: [
// 					{
// 						username: "UserOne",
// 						products: [
// 							{
// 								productname: "Watermelon",
// 								quantity: 23
// 							},
// 							{
// 								productname: "Strawberries",
// 								quantity: 23
// 							}
// 						]
// 					}
// 				],
// 				shipped: false,
// 				date: "2022-09-06T21:55:50.076+00:00",
// 				totalcost: 2000
// 			});

// 			// userUpdaterStub.resultUpdate = await this.userModel.findOneAndUpdate(
// 			// 	{
// 			// 		username: elem
// 			// 	},
// 			// 	{
// 			// 		orders: this.updatedField
// 			// 	}
// 			// );

// 			expect("Content-Type", /json/);
// 			expect(200);
// 			sinon.assert.match(res, {
// 				orderid: "order000001",
// 				users: [
// 					{
// 						username: "UserOne",
// 						products: [
// 							{
// 								productname: "Watermelon",
// 								quantity: 23
// 							},
// 							{
// 								productname: "Strawberries",
// 								quantity: 23
// 							}
// 						]
// 					}
// 				],
// 				shipped: false,
// 				date: "2022-09-06T21:55:50.076+00:00",
// 				totalcost: 2000
// 			});
// 			expect(res).to.have.property("orderid");
// 			expect(res).to.have.property("users");
// 			expect(res).to.have.property("shipped");
// 			expect(res).to.have.property("date");
// 			expect(res).to.have.property("totalcost");

// 			stubpostOneOrder.restore();

// 			// stubMethod.restore();
// 		});
// 	});

// 	it("Stub for order router post - not enought products", async () => {
// 		router.post("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubMethod = sinon.stub(postOneOrder);
// 			// stubMethod(req, res, next);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// 			stubpostOneOrder(reqMock, resMock, next);

// 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// 				findData: sinon.stub().returns([
// 					{
// 						name: "UserOne",
// 						data: stubUserFindOne.withArgs({ username: "UserOne" }).returns({
// 							firstname: "UserFromInsomnia",
// 							lastname: "from req.body",
// 							username: "UserOne",
// 							address: "test@request.com",
// 							orders: [
// 								{
// 									orderid: "00001",
// 									url: "none"
// 								}
// 							]
// 						})
// 					}
// 				]),
// 				usersExistCheck: sinon.stub().returns({}),
// 				updateAccountsNewOrder: sinon.stub().returns(null),
// 				updateAccountsDelOrder: sinon.stub().returns(null)
// 			});

// 			const userUpdater = new UserUpdaterClass();

// 			userUpdaterStub.data = req.body;
// 			userUpdaterStub.userModel = User;
// 			userUpdaterStub.orderModel = Order;
// 			userUpdaterStub.response = res;

// 			// userUpdaterStub.findData();
// 			userUpdaterStub.usersExistCheck();

// 			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
// 				orderExistsCheck: sinon.stub().returns(null),
// 				searchProd: sinon.stub().returns([
// 					{ productname: "Watermelon", response: "positive", quantity: 23 },
// 					{ productname: "Strawberries", response: "positive", quantity: 23 },
// 					{
// 						productname: "Watermelon",
// 						response: "negative",
// 						message: "Too little quantity of Watermelon"
// 					},
// 					{ productname: "Strawberries", response: "positive", quantity: 23 }
// 				]),
// 				createResults: sinon
// 					.stub()
// 					.returns({ productname: "Strawberries", quantity: 23 }),
// 				createNewOrder: sinon.stub().returns(1),
// 				restoreQuantities: sinon.stub().returns(null)
// 			});

// 			const prodUpManager = new ProductUpdaterClass();

// 			prodUpStub.data = req.body;
// 			prodUpStub.productModel = Product;
// 			prodUpStub.orderModel = Order;
// 			prodUpStub.response = res;

// 			prodUpStub.orderExistsCheck();
// 			prodUpStub.searchProd();
// 			prodUpStub.createResults();
// 			prodUpStub.createNewOrder();
// 			prodUpStub.restoreQuantities();

// 			resMock
// 				.status(200)
// 				.json({ message1: "Too little quantity of Watermelon" });

// 			expect("Content-Type", /json/);
// 			expect(200);
// 			assert.match(JSON.parse(res), {
// 				message1: `Too little quantity of Watermelon`
// 			});
// 			// stubpostOneOrder.restore();

// 			// expect(res).to.have.property("message1");
// 		});
// 	});

// 	it("Stub for order router post - order just exists", async () => {
// 		router.post("/orders-archieve/", async (req, res, next) => {
// 			sinon.assert.calledWith(router.post, "/orders-archieve/");

// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);
// 			// stubpostOneOrder.returns(res);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// 			await stubpostOneOrder(reqMock, resMock, next);

// 			// console.log(resMock);

// 			// QUI 11/10

// 			// const result = await Order.findOne({ orderid: "order000002" });

// 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// 				findData: sinon.stub().returns([
// 					{
// 						name: "UserOne",
// 						data: stubUserFindOne.withArgs({ username: "UserOne" }).returns({
// 							firstname: "UserFromInsomnia",
// 							lastname: "from req.body",
// 							username: "UserOne",
// 							address: "test@request.com",
// 							orders: [
// 								{
// 									orderid: "00001",
// 									url: "none"
// 								}
// 							]
// 						})
// 					}
// 				]),
// 				usersExistCheck: sinon.stub().returns({}),
// 				updateAccountsNewOrder: sinon.stub().returns(null),
// 				updateAccountsDelOrder: sinon.stub().returns(null)
// 			});

// 			const userUpdater = new UserUpdaterClass();

// 			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
// 				orderExistsCheck: sinon
// 					.stub(Order, "findOne")
// 					.withArgs({ orderid: reqMock.body["orderid"] })
// 					.returns({
// 						orderid: "order000001",
// 						users: [
// 							{
// 								username: "UserOne",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						date: "2022-09-06T21:55:50.076+00:00",
// 						totalcost: 2000
// 					}),
// 				searchProd: sinon.stub().returns({
// 					message: "OrderId already exists"
// 				}),
// 				createResults: sinon.stub().returns(null),
// 				createNewOrder: sinon.stub().returns(null),
// 				restoreQuantities: sinon.stub().returns(null)
// 			});

// 			const prodUpManager = new ProductUpdaterClass();

// 			userUpdaterStub.data = req.body;
// 			userUpdaterStub.userModel = User;
// 			userUpdaterStub.orderModel = Order;
// 			userUpdaterStub.response = res;

// 			prodUpStub.data = req.body;
// 			prodUpStub.productModel = Product;
// 			prodUpStub.orderModel = Order;
// 			prodUpStub.response = res;

// 			userUpdaterStub.findData();
// 			userUpdaterStub.usersExistCheck();

// 			prodUpStub.orderExistsCheck();
// 			// await prodUpStub.searchProd();
// 			// await prodUpStub.createResults();
// 			// await prodUpStub.createNewOrder();
// 			// await prodUpStub.restoreQuantities();

// 			// console.log(r);
// 			// console.log(ord);

// 			resMock.status(200).json({
// 				message: "OrderId already exists"
// 			});

// 			console.log(resMock);

// 			expect("Content-Type", /json/);
// 			expect(200);
// 			sinon.assert.match(res.body, {
// 				message: "OrderId already exists"
// 			});
// 			expect(res.body).to.have.property("message");
// 			assert.strictEqual(res.body, {
// 				message: "OrderId already exists"
// 			});
// 			// stubpostOneOrder.restore();
// 		});
// 	});

// 	it("Stub for order router post - user not exists", async () => {
// 		router.post("/orders-archieve/", async (req, res, next) => {
// 			const reqMock = mockReq(req);
// 			const resMock = mockRes(res);
// 			// const stubMethod = sinon.stub(postOneOrder);
// 			// stubMethod(req, res, next);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);
// 			// const stubpostOneOrder = sinon.stub(postOneOrder);

// 			// {
// 			// 	name: "User23",
// 			// 	data: stubUserFindOne.withArgs({ username: "User23" }).returns(null)
// 			// }

// 			stubpostOneOrder(reqMock, resMock, next);

// 			// console.log(test);

// 			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
// 				findData: sinon.stub().returns([
// 					{
// 						name: "User23",
// 						data: null
// 					}
// 				]),
// 				usersExistCheck: sinon
// 					.stub()
// 					.returns({ message0: "User23 not exist." }),
// 				updateAccountsNewOrder: sinon.stub().returns(null),
// 				updateAccountsDelOrder: sinon.stub().returns(null)
// 			});

// 			const userUpdater = new UserUpdaterClass();

// 			userUpdaterStub.data = req.body;
// 			userUpdaterStub.userModel = User;
// 			userUpdaterStub.orderModel = Order;
// 			userUpdaterStub.response = res;

// 			await userUpdaterStub.findData();
// 			await userUpdaterStub.usersExistCheck();

// 			console.log(userUpdaterStub.usersExistCheck());

// 			resMock.status(200).json({ message0: "User23 not exist." });

// 			expect("Content-Type", /json/);
// 			expect(200);
// 			assert.match(res, { message0: "User23 not exist." });
// 			expect(res).to.have.property("message0");
// 			// stubpostOneOrder.restore();

// 			// userUpdaterStub.findData().restore();
// 			// await userUpdaterStub.usersExistCheck().restore();
// 			// stubpostOneOrderTest.restore();
// 		});
// 	});

// 	it("Stub for router order post - Handle Error", async () => {
// 		router.post(`/orders-archieve/`, async (req, res, next) => {
// 			expect(500);
// 			const reqMock = mockReq(req);
// 			const resMock = new Error();

// 			await stubpostOneOrder(reqMock, resMock, next);
// 		});
// 	});

// 	after(() => {
// 		// stubUserFindOne.restore();
// 		router.post.restore();
// 	});
// });

//


			// -----

			// await userUpdaterStub.findData();

			// const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
			// 	orderExistsCheck: sinon.stub().returns(null),
			// 	searchProd: sinon.stub().returns([
			// 		{ productname: "Watermelon", response: "positive", quantity: 23 },
			// 		{ productname: "Strawberries", response: "positive", quantity: 23 },
			// 		{ productname: "Watermelon", response: "positive", quantity: 23 },
			// 		{ productname: "Strawberries", response: "positive", quantity: 23 }
			// 	]),
			// 	createResults: sinon.stub().returns(null),
			// 	createNewOrder: sinon.stub().returns(0),
			// 	restoreQuantities: sinon.stub().returns(null)
			// });

			// -------


			// prodUpStubExt.searchProd = sinon.stub().callsFake(function fakeSix() {
			// 	// const prodOne = stubProductFind().withArgs({})
			// 	// console.log(prodUpStubExt.data);
			// 	const permissions = [];
			// 	for (let item of prodUpStubExt.data["users"]) {
			// 		const prodsToUpArray = [];
			// 		for (let prod of item["products"]) {
			// 			// console.log(prod);
			// 			const prodsToUp = stubProductFindOne()
			// 				.withArgs({
			// 					name: prod["productname"]
			// 				})
			// 				.returns({
			// 					name: prod["productname"],
			// 					quantity: 23,
			// 					origin: "Italy",
			// 					price: 10.23
			// 				});
			// 			prodsToUpArray.push(prodsToUp);
			// 		}
			// 		for (let i = 0; i < prodsToUpArray.length; i++) {
			// 			if (
			// 				prodsToUpArray[i]["quantity"] < item["products"][i]["quantity"]
			// 			) {
			// 				permissions.push({
			// 					productname: item["products"][i]["productname"],
			// 					response: "negative",
			// 					message: `Too little quantity of ${prodsToUpArray[i]["name"]}`
			// 				});
			// 			} else {
			// 				permissions.push({
			// 					productname: item["products"][i]["productname"],
			// 					response: "positive",
			// 					quantity: item["products"][i]["quantity"]
			// 				});
			// 			}
			// 		}
			// 	}
			// 	return permissions;
			// });


			// -----

			// const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
			// 	orderExistsCheck: sinon.stub().returns(null),
			// 	searchProd: sinon.stub().returns([
			// 		{ productname: "Watermelon", response: "positive", quantity: 23 },
			// 		{ productname: "Strawberries", response: "positive", quantity: 23 },
			// 		{
			// 			productname: "Watermelon",
			// 			response: "negative",
			// 			message: "Too little quantity of Watermelon"
			// 		},
			// 		{ productname: "Strawberries", response: "positive", quantity: 23 }
			// 	]),
			// 	createResults: sinon
			// 		.stub()
			// 		.returns({ productname: "Strawberries", quantity: 23 }),
			// 	createNewOrder: sinon.stub().returns(1),
			// 	restoreQuantities: sinon.stub().returns(null)
			// });

			// const prodUpManager = new ProductUpdaterClass();

			// prodUpStub.data = req.body;
			// prodUpStub.productModel = Product;
			// prodUpStub.orderModel = Order;
			// prodUpStub.response = res;

			// prodUpStub.orderExistsCheck();
			// prodUpStub.searchProd();
			// prodUpStub.createResults();
			// prodUpStub.createNewOrder();
			// prodUpStub.restoreQuantities();

			// ------

			// far funzionare searchProd ------>

			// prodUpStubExt.searchProd = sinon.stub().returns([
			// 	{
			// 		productname: "Watermelon",
			// 		response: "negative",
			// 		message: "Too little quantity of Watermelon"
			// 	},
			// 	{ productname: "Strawberries", response: "positive", quantity: 23 }
			// ]);
