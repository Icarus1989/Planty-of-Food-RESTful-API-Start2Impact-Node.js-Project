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
		this.products = await this.data["users"].map((user) => {
			return user["products"];
		});
		this.permissions = await this.products[0].map(async (elem) => {
			this.prodsToUpdate = await this.productModel.find({
				name: elem["productname"]
			});
			if ((await this.prodsToUpdate[0]["quantity"]) < elem["quantity"]) {
				console.log("No");
				return {
					productname: elem["productname"],
					response: "negative",
					message: `Too little quantity of ${await this.prodsToUpdate[0][
						"name"
					]}`
				};
			} else {
				console.log("Ok");
				return {
					productname: elem["productname"],
					response: "positive",
					quantity: elem["quantity"]
				};
			}
		});
	}
	async createResults() {
		this.results = await Promise.all(this.permissions);
		this.negativeArr = [];
		this.results.map(async (elem) => {
			if (elem["response"] == "negative") {
				this.negativeArr.push({
					message: elem["message"]
				});
			} else if (elem["response"] == "positive") {
				this.updatingProduct = await this.productModel.findOne({
					name: elem["productname"]
				});
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
			}
		});
	}
	async createNewOrder() {
		if (this.negativeArr.length == 0) {
			this.newOrder = new this.orderModel(this.data);
			this.newOrder.save((err, savedData) => {
				if (err) {
					console.log(err);
				}
				this.response.status(200).json(savedData);
			});
		} else {
			this.negInfo = {};
			this.negativeArr.map((elem) => {
				this.negInfo[`message${this.negativeArr.indexOf(elem)}`] =
					elem["message"];
			});
			this.response.status(200).json(this.negInfo);
		}
	}
}

class UserUpdaterClass {
	constructor(data, OrderModel) {
		this.data = data;
		this.orderModel = OrderModel;
	}
	// Individuare names users
	// per ogni user individuare array orders
	// aggiungere orderid ad ogni array
}

module.exports = { OrderManagerClass, ProductUpdaterClass };
