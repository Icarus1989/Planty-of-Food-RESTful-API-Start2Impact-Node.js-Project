class OrderClass {
	constructor(response, data, schema, filterQuery, valueQuery, orderQuery) {
		this.res = response;
		this.data = data;
		this.filterQuery = filterQuery;
		this.valueQuery = valueQuery;
		this.orderQuery = orderQuery;
		this.results = [];
		this.mapped;
		this.schema = schema;
	}
	missParam(paramIndication) {
		this.res.status(404).json({
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
		} else if (
			this.filterQuery == "_id" ||
			this.filterQuery == "orderId" ||
			this.filterQuery == "shipped"
		) {
			this.results = await this.schema.find({
				[this.filterQuery]: this.valueQuery
			});
			// SISTEMARE NON FUNZIONA
		} else if (this.filterQuery == "createdAt") {
			// testing
			console.log("Here date");
			this.mapped = this.data.map((elem) => {
				return elem["createdAt"];
			});
			for (let elem of this.mapped) {
				if (
					new Date(elem).getUTCFullYear() ==
						new Date(this.valueQuery).getUTCFullYear() &&
					new Date(elem).getUTCMonth() ==
						new Date(this.valueQuery).getUTCMonth() &&
					new Date(elem).getUTCDate() == new Date(this.valueQuery).getUTCDate()
				) {
					this.results.push(this.data[this.mapped.indexOf(elem)]);
				}
			}
			return this.results;
		}
	}

	reorderDescent(a, b) {
		if (a.orderId.slice(5) > b.orderId.slice(5)) {
			return 1;
		} else if (a.orderId.slice(5) < b.orderId.slice(5)) {
			return -1;
		}
	}

	reorderAscedent(a, b) {
		if (a.orderId.slice(5) > b.orderId.slice(5)) {
			return -1;
		} else if (a.orderId.slice(5) < b.orderId.slice(5)) {
			return 1;
		}
	}

	async ordering(arr) {
		this.arr = arr;
		if (this.orderQuery == "ascendent" && this.arr.length > 0) {
			return (this.arr = this.arr.sort(this.reorderAscedent));
		} else if (this.orderQuery == "descendent" && this.arr.length > 0) {
			return (this.arr = this.arr.sort(this.reorderDescent));
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

module.exports = OrderClass;
