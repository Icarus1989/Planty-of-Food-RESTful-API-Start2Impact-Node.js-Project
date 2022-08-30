class OrderManagerClass {
	constructor(response, data, filterQuery, valueQuery, orderQuery) {
		this.res = response;
		this.data = data;
		this.filterQuery = filterQuery;
		this.valueQuery = valueQuery;
		this.orderQuery = orderQuery;
		this.results = [];
		this.mapped;
	}
	missParam(paramIndication) {
		this.res.status(400).json({
			message: `Need a ${paramIndication}parameter for search...`
		});
	}

	async determinate() {
		if (this.filterQuery == "productname") {
			this.mapped = await this.data.map((elem) => {
				return elem["users"][0]["products"];
			});
			for (let elem of this.mapped) {
				for (let i = 0; i < elem.length; i++) {
					if (
						elem[i]["productname"] ==
						`${String(this.valueQuery)[0].toUpperCase()}${String(
							this.valueQuery
						).slice(1)}`
					) {
						this.results.push(this.data[this.mapped.indexOf(elem)]);
					}
				}
			}
			return this.results;
		} else if (
			this.filterQuery == "username" ||
			this.filterQuery == "products"
		) {
			this.mapped = await this.data.map((elem) => {
				return elem["users"][0];
			});
			for (let elem of this.mapped) {
				if (elem["username"] == this.valueQuery) {
					this.results.push(this.data[this.mapped.indexOf(elem)]);
				}
			}
		} else if (this.filterQuery == "shipped") {
			this.results = this.data.filter((elem) => {
				if (elem[this.filterQuery] == Boolean(this.valueQuery)) {
					return true;
				} else {
					return false;
				}
			});
			return this.results;
		} else if (this.filterQuery == "_id" || this.filterQuery == "orderid") {
			this.results = this.data.filter((elem) => {
				if (elem[this.filterQuery] == this.valueQuery) {
					return true;
				} else {
					return false;
				}
			});
			return this.results;
		} else if (this.filterQuery == "date") {
			this.results = this.data.filter((elem) => {
				if (
					new Date(elem[this.filterQuery]).getUTCFullYear() ==
						new Date(this.valueQuery).getUTCFullYear() &&
					new Date(elem[this.filterQuery]).getUTCMonth() ==
						new Date(this.valueQuery).getUTCMonth() &&
					new Date(elem[this.filterQuery]).getUTCDate() ==
						new Date(this.valueQuery).getUTCDate()
				) {
					return true;
				} else {
					return false;
				}
			});
			return this.results;
		}
	}

	reorderIncr(a, b) {
		if (a.orderId.slice(5) > b.orderId.slice(5)) {
			return 1;
		} else if (a.orderId.slice(5) < b.orderId.slice(5)) {
			return -1;
		}
	}

	reorderDecr(a, b) {
		if (a.orderId.slice(5) > b.orderId.slice(5)) {
			return -1;
		} else if (a.orderId.slice(5) < b.orderId.slice(5)) {
			return 1;
		}
	}

	async ordering(arr) {
		this.arr = arr;
		if (this.orderQuery == "decreasing" && this.arr.length > 0) {
			return (this.arr = this.arr.sort(this.reorderDecr));
		} else if (this.orderQuery == "increasing" && this.arr.length > 0) {
			return (this.arr = this.arr.sort(this.reorderIncr));
		} else {
			return this.arr;
		}
	}

	async createResponse(arr) {
		this.res.status(200).json(arr);
	}

	async noProducts() {
		this.res.status(200).json({
			message: `Product ${this.valueQuery} is not present in the orders archieve`
		});
	}
}

class ProductUpdaterClass {
	constructor(data, productModel, orderModel, response) {
		this.data = data;
		this.productModel = productModel;
		this.orderModel = orderModel;
		this.response = response;
	}

	async orderExistsCheck() {
		return await this.orderModel.findOne({
			orderid: this.data["orderid"]
		});
	}

	async searchProd() {
		this.permissions = [];
		for await (let userSection of this.data["users"]) {
			for await (let user of userSection["products"]) {
				this.prodsToUp = await this.productModel.find({
					name: user["productname"]
				});
				for (let i = 0; i < this.prodsToUp.length; i++) {
					if ((await this.prodsToUp[i]["quantity"]) < user["quantity"]) {
						// console.log("No");
						this.permissions.push({
							productname: user["productname"],
							response: "negative",
							message: `Too little quantity of ${await this.prodsToUp[i][
								"name"
							]}`
						});
					} else {
						// console.log("Ok");
						this.permissions.push({
							productname: user["productname"],
							response: "positive",
							quantity: user["quantity"]
						});
					}
				}
			}
		}
		return this.permissions;
	}
	async createResults() {
		this.results = await Promise.all(this.permissions);
		this.negativeArr = [];
		this.totalprice = 0;
		for await (let elem of this.results) {
			if (elem["response"] == "negative") {
				this.negativeArr.push({
					message: elem["message"]
				});
			} else if (elem["response"] == "positive") {
				this.updatingProduct = await this.productModel.findOne({
					name: elem["productname"]
				});
				// console.log(this.updatingProduct["price"]);
				this.totalprice =
					this.totalprice + this.updatingProduct["price"] * elem["quantity"];
				// test with await... -->
				this.productModel.findOneAndUpdate(
					{
						name: elem["productname"]
					},
					{
						quantity: this.updatingProduct["quantity"] - elem["quantity"]
					},
					(err, docs) => {
						if (err) {
							// this.response.status(200).json({
							// 	message: "Error in quantity updating"
							// });
							console.log("Error in quantity updating");
						}
					}
				);
				// <--- test with await...
			}
		}
	}
	async createNewOrder() {
		if (this.negativeArr.length == 0) {
			this.newOrder = new this.orderModel(this.data);
			// console.log(this.newOrder);
			// console.log(Number(this.totalprice.toFixed(2)));

			// this.newOrder["users"].map(async (user) => {
			// 	// this.prod = await this.productModel.findOne({
			// 	// })
			// 	// user.cost =
			// });
			for await (let user of this.newOrder["users"]) {
				this.itemsCost = 0;
				// user["products"].map(async (elem) =>
				for await (let elem of user["products"]) {
					// console.log(elem["quantity"]);
					this.item = await this.productModel.findOne({
						name: elem["productname"]
					});
					// console.log(this.item["price"]);
					this.itemsPrice = this.item["price"] * elem["quantity"];
					this.itemsCost = this.itemsCost + this.itemsPrice;
					// console.log(this.itemsPrice);

					user.cost = Number(this.itemsCost.toFixed(2));
					this.itemsPrice = 0;
					// console.log(this.itemPrice);
					// console.log(user);
				}
			}
			this.newOrder.totalprice = Number(this.totalprice.toFixed(2));

			this.newOrder.save((err, savedData) => {
				if (err) {
					console.log(err);
				}
				this.response.status(200).json(savedData);
			});
		} else if (this.negativeArr.length > 0) {
			this.negInfo = {};
			this.negativeArr.map((elem) => {
				this.negInfo[`message${this.negativeArr.indexOf(elem)}`] =
					elem["message"];
			});
			this.response.status(200).json(this.negInfo);
		}
		return this.negativeArr.length;
	}

	async restoreQuantities() {
		// this.productsToUpdate = this.data["users"].map((user) => {
		// 	console.log(user["products"]);
		// });

		for await (let user of this.data["users"]) {
			for await (let product of user["products"]) {
				// console.log(product["productname"]);
				this.oldQuantity = await this.productModel.findOne({
					name: product["productname"]
				});
				this.productUpdate = await this.productModel.findOneAndUpdate(
					{
						name: product["productname"]
					},
					{
						quantity: this.oldQuantity["quantity"] + product["quantity"]
					}
				);
			}
		}
	}
}

class UserUpdaterClass {
	constructor(data, UserModel, OrderModel, response) {
		this.data = data;
		this.userModel = UserModel;
		this.orderModel = OrderModel;
		this.response = response;
	}

	async findData() {
		this.usersArr = [];

		for (let user of this.data["users"]) {
			try {
				this.usersArr.push({
					name: user["username"],
					data: await this.userModel.findOne({
						username: user["username"]
					})
				});
			} catch (error) {
				this.usersArr.push({
					name: user["username"],
					data: null
				});
			}
		}
		return this.usersArr;
	}

	async usersExistCheck() {
		this.existArray = await this.findData();
		this.message = {};
		for (let elem of this.existArray) {
			if (elem["data"] == null) {
				this.message[
					`message${this.usersArr.indexOf(elem)}`
				] = `${elem["name"]} not exist.`;
			}
			// else {
			// 	return null;
			// }
		}
		return this.message;
	}

	async updateAccountsNewOrder() {
		this.users = this.data["users"].map((user) => {
			return user["username"];
		});
		this.users.map(async (elem) => {
			this.fieldToUpdate = await this.userModel.findOne({
				username: elem
			});
			this.updatedField = await this.fieldToUpdate["orders"].concat([
				{
					orderid: this.data["orderid"],
					url: `/api/v1/orders-archieve/${this.data["orderid"].slice(5)}`
				}
			]);
			this.result = await this.userModel.findOneAndUpdate(
				{
					username: elem
				},
				{
					orders: this.updatedField
				}
				// {
				// 	new: true
				// }
			);
		});
		console.log("Update from updateAccountsNewOrder");
	}

	async updateAccountsDelOrder() {
		// console.log(this.data);

		this.users = this.data["users"].map((user) => {
			return user["username"];
		});
		this.usersToUpdate = this.users.map(async (elem) => {
			return await this.userModel.findOne({
				username: elem
			});
		});
		this.resolvedUsers = await Promise.all(this.usersToUpdate);
		this.fieldsToUpdate = this.resolvedUsers.map((elem) => {
			return elem["orders"];
		});

		for await (let orders of this.fieldsToUpdate) {
			this.dataUpdated = await orders.filter((elem) => {
				return elem["orderid"] !== this.data["orderid"];
			});

			this.result = await this.userModel.findOneAndUpdate(
				{
					username:
						this.resolvedUsers[this.fieldsToUpdate.indexOf(orders)]["username"]
				},
				{
					orders: this.dataUpdated
				}
				// {
				// 	new: true
				// }
			);
		}
	}
}

module.exports = { OrderManagerClass, ProductUpdaterClass, UserUpdaterClass };
