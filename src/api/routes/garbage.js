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
