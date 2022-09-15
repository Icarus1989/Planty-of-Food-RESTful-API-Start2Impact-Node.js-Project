const router = require("../src/api/index");
const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const assert = referee.assert;
const { expect } = require("chai");

const express = require("express");

// const ordersRoutes = require('../src/api/routes/orders')

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

// <---- provare ad inserire le chiamate delle funzioni (es getAllOrders) nei test

// ----------- Product tests

const testProdPut = "Strawberries";
const newQuantity = 23;
const testProdDelete = "Strawberries";

describe("Stub router product Get All", async () => {
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			null,
			JSON.stringify({
				body: [
					{
						name: "Strawberries",
						quantity: 23000,
						price: 10.23
					},
					{
						name: "Pineapples",
						quantity: 10000,
						price: 23.23
					},
					{
						name: "Apples",
						quantity: 10000,
						price: 23.32
					}
				]
			}),
			null
		);
		// .callsFake(() => {
		// 	sinon.stub().returnsThis();
		// });
	});
	it("Stub for product router get (all)", async () => {
		router.get("/products-storage/", (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);

			// importante
			sinon.assert.calledWith(router.get, "/products-storage/");
			// importante

			getAllProducts(req, res, next);

			assert.isArray(JSON.parse(res).body);
			assert.match(
				JSON.parse(res).body,
				String({
					body: [
						{
							name: "Strawberries",
							quantity: 23000,
							price: 10.23
						},
						{
							name: "Pineapples",
							quantity: 10000,
							price: 23.23
						},
						{
							name: "Apples",
							quantity: 10000,
							price: 23.32
						}
					]
				})
			);
			const elements = JSON.parse(res).body;
			elements.map((elem) => {
				expect(elem).to.have.property("name");
				expect(elem).to.have.property("quantity");
				expect(elem).to.have.property("price");
				// ...
			});
		});
	});
	after(() => {
		router.get.restore();
	});
});

describe("Stub router product Get One", () => {
	const testProdGet = "strawberries";
	before(() => {
		// const stub = sinon
		// 	.stub(router, "get")
		// 	.yields(
		// 		{ params: testProdGet },
		// 		JSON.stringify({ name: testProdGet, quantity: 23, price: 20.23 }),
		// 		null
		// 	);

		const stub = sinon.stub(router, "get").yields(
			{ params: testProdGet },
			JSON.stringify({
				name: testProdGet,
				quantity: 23,
				origin: "Italy",
				price: 20.23
			}),
			null
		);
	});
	it("Stub for product router get (one)", async () => {
		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
			// expect("Content-Type", /json/);
			// expect(200);
			// expect(res.statusCode).to.equal(200);

			expect("Content-Type", /json/);
			expect(200);
			// expect(res.statusCode).to.equal(200);

			// --------> problem here
			sinon.assert.calledWith(router.get, `/products-storage/${testProdGet}`);
			getOneProduct(req, res, next);

			// <-------- problem here

			assert.match(JSON.parse(res), {
				name: "strawberries",
				quantity: 23,
				origin: "Italy",
				price: 20.23
			});

			expect(JSON.parse(res)).to.have.property("name");
			expect(JSON.parse(res)).to.have.property("quantity");
			expect(JSON.parse(res)).to.have.property("origin");
			expect(JSON.parse(res)).to.have.property("price");
		});
	});
	after(() => {
		router.get.restore();
	});
});

describe("Stub router product Post", async () => {
	// const testProdPost = "Strawberries";
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: JSON.stringify({
					name: "Strawberries",
					quantity: 23,
					origin: "Italy",
					price: 10.23
				})
			},
			JSON.stringify({
				name: "Strawberries",
				quantity: 23,
				origin: "Italy",
				price: 10.23
			}),
			null
		);
	});
	it("Stub for product router post", async () => {
		router.post("/products-storage/", async (req, res, next) => {
			sinon.assert.calledWith(router.post, "/products-storage/");
			expect("Content-Type", /json/);
			expect(200);
			postOneProduct(req, res, next);
			assert.match(JSON.parse(res), {
				name: "Strawberries",
				quantity: 23,
				price: 10.23
			});
			expect(res).to.have.property("name");
			expect(res).to.have.property("quantity");
			expect(res).to.have.property("price");
		});
	});
	after(() => {
		router.post.restore();
	});
});

describe("Stub router product Put", async () => {
	const testProdPut = "Strawberries";
	const newQuantity = 23;
	before(() => {
		const stub = sinon.stub(router, "put").yields(
			{
				params: testProdPut,
				body: {
					name: testProdPut,
					quantity: newQuantity
				}
			},
			JSON.stringify({
				name: testProdPut,
				quantity: newQuantity,
				price: 10.23
			}),
			null
		);
	});
	it("Stub for product router put", async () => {
		router.put("/products-storage/Strawberries", (req, res, next) => {
			sinon.assert.calledWith(router.put, `/products-storage/${testProdPut}`);
			expect("Content-Type", /json/);
			expect(200);
			putOneProduct(req, res, next);
			assert.match(JSON.parse(res), {
				name: "Strawberries",
				quantity: 23,
				price: 10.23
			});
			expect(JSON.parse(res)).to.have.property("name");
			expect(JSON.parse(res)).to.have.property("quantity");
			expect(JSON.parse(res)).to.have.property("price");
		});
	});
	after(() => {
		router.put.restore();
	});
});

describe("Stub router product Delete One", async () => {
	const testProdDelete = "Strawberries";

	before(() => {
		const stub = sinon.stub(router, "delete").yields(
			{
				params: testProdDelete
			},
			JSON.stringify({
				message: "Field delete."
			}),
			null
		);
	});
	it("Stub for product router delete", () => {
		router.delete("/products-storage/Strawberries", (req, res, next) => {
			sinon.assert.calledWith(
				router.delete,
				`/products-storage/${testProdDelete}`
			);
			expect("Content-Type", /json/);
			expect(200);
			deleteOneProduct(req, res, next);
			assert.match(JSON.parse(res), {
				message: "Field delete."
			});
			expect(JSON.parse(res)).to.have.property("message");
		});
	});
	after(() => {
		router.delete.restore();
	});
});

// ----------- Product tests

// ----------- User tests

describe("Stub router user Get All", async () => {
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			null,
			JSON.stringify({
				body: [
					{
						firstname: "userTestOne",
						lastname: "for Sinon Testing",
						username: "User1",
						address: "test@sinon.com",
						orders: [
							{
								orderid: "00001",
								url: "none"
							}
						]
					},
					{
						firstname: "userTestTwo",
						lastname: "for Sinon Testing",
						username: "User2",
						address: "test@sinon.com",
						orders: [
							{
								orderid: "00002",
								url: "none"
							}
						]
					},
					{
						firstname: "UserFromInsomnia",
						lastname: "for Sinon Testing",
						username: "User3",
						address: "test@sinon.com",
						orders: [
							{
								orderid: "00003",
								url: "none"
							}
						]
					}
				]
			}),
			null
		);
	});
	it("Stub for user router get (all)", async () => {
		router.get("/users/", (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			getAllUsers(req, res, next);
			assert.isArray(JSON.parse(res).body);
			assert.match(
				JSON.parse(res).body,
				String({
					body: [
						{
							firstname: "userTestOne",
							lastname: "for Sinon Testing",
							username: "User1",
							address: "test@sinon.com",
							orders: [
								{
									orderid: "00001",
									url: "none"
								}
							]
						},
						{
							firstname: "userTestTwo",
							lastname: "for Sinon Testing",
							username: "User2",
							address: "test@sinon.com",
							orders: [
								{
									orderid: "00002",
									url: "none"
								}
							]
						},
						{
							firstname: "userTestThree",
							lastname: "for Sinon Testing",
							username: "User3",
							address: "test@sinon.com",
							orders: [
								{
									orderid: "00003",
									url: "none"
								}
							]
						}
					]
				})
			);
			const elements = JSON.parse(res).body;
			elements.map((user) => {
				expect(user).to.have.property("firstname");
				expect(user).to.have.property("lastname");
				expect(user).to.have.property("username");
				expect(user).to.have.property("address");
				expect(user).to.have.property("orders");
				// ...
			});
		});
	});
	after(() => {
		router.get.restore();
	});
});

describe("Stub router user Get One", async () => {
	const testUserGet = "User1";
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{ params: testUserGet },
			JSON.stringify({
				firstname: "userTestOne",
				lastname: "for Sinon Testing",
				username: testUserGet,
				address: "test@sinon.com",
				orders: [
					{
						orderid: "00001",
						url: "none"
					}
				]
			}),
			null
		);
	});
	it("Stub for user router get (one)", async () => {
		router.get(`/users/${testUserGet}`, async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			// stesso problema precedente
			// getOneUser(req, res, next);
			assert.match(JSON.parse(res), { username: testUserGet });
			expect(JSON.parse(res)).to.have.property("firstname");
			expect(JSON.parse(res)).to.have.property("lastname");
			expect(JSON.parse(res)).to.have.property("username");
			expect(JSON.parse(res)).to.have.property("address");
			expect(JSON.parse(res)).to.have.property("orders");
		});
	});
	after(() => {
		router.get.restore();
	});
});

describe("Stub router user Post", async () => {
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: JSON.stringify({
					firstname: "userTestOne",
					lastname: "for Sinon Testing",
					username: "User1",
					address: "test@sinon.com",
					orders: [
						{
							orderid: "00001",
							url: "none"
						}
					]
				})
			},
			JSON.stringify({
				firstname: "userTestOne",
				lastname: "for Sinon Testing",
				username: "User1",
				address: "test@sinon.com",
				orders: [
					{
						orderid: "00001",
						url: "none"
					}
				]
			}),
			null
		);
	});
	it("Stub for user router post", async () => {
		router.post("/users/", async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			postOneUser(req, res, next);
			assert.match(JSON.parse(res), {
				firstname: "userTestOne",
				lastname: "for Sinon Testing",
				username: "User1",
				address: "test@sinon.com",
				orders: [
					{
						orderid: "00001",
						url: "none"
					}
				]
			});
			assert.match(JSON.parse(res), { username: "User1" });
			expect(JSON.parse(res)).to.have.property("firstname");
			expect(JSON.parse(res)).to.have.property("lastname");
			expect(JSON.parse(res)).to.have.property("username");
			expect(JSON.parse(res)).to.have.property("address");
			expect(JSON.parse(res)).to.have.property("orders");
		});
	});
	after(() => {
		router.post.restore();
	});
});

describe("Stub router user Put", async () => {
	const testUserPut = "User1";
	const newAddress = "userone@sinon.com";
	before(() => {
		const stub = sinon.stub(router, "put").yields(
			{
				params: testUserPut,
				body: {
					firstname: "userTestOne",
					lastname: "for Sinon Testing",
					username: testUserPut,
					address: newAddress,
					orders: [
						{
							orderid: "00001",
							url: "none"
						}
					]
				}
			},
			JSON.stringify({
				firstname: "userTestOne",
				lastname: "for Sinon Testing",
				username: testUserPut,
				address: newAddress,
				orders: [
					{
						orderid: "00001",
						url: "none"
					}
				]
			}),
			null
		);
	});
	it("Stub for user router put", async () => {
		router.put(`/users/${testUserPut}`, async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			putOneUser(req, res, next);
			assert.match(JSON.parse(res), { username: testUserPut });
			expect(JSON.parse(res)).to.have.property("firstname");
			expect(JSON.parse(res)).to.have.property("lastname");
			expect(JSON.parse(res)).to.have.property("username");
			expect(JSON.parse(res)).to.have.property("address");
			expect(JSON.parse(res)).to.have.property("orders");
		});
	});
	after(() => {
		router.put.restore();
	});
});

describe("Stub router user Delete ", async () => {
	const testUserDelete = "User1";
	before(() => {
		const stub = sinon.stub(router, "delete").yields(
			{ params: testUserDelete },
			JSON.stringify({
				message: "User delete."
			}),
			null
		);
	});
	it("Stub for user router delete", () => {
		router.delete(`/products-storage/${testUserDelete}`, (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			deleteOneUser(req, res, next);
			assert.match(JSON.parse(res), {
				message: "User delete."
			});
			expect(JSON.parse(res)).to.have.property("message");
		});
	});
	after(() => {
		router.delete.restore();
	});
});

// // ----------- User tests

// // ----------- Order tests

describe("Stub router order Get All", async () => {
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			null,
			JSON.stringify({
				body: [
					{
						orderid: "order000001",
						users: [
							{
								username: "UserOne",
								products: [
									{
										productname: "Watermelon",
										quantity: 23
									},
									{
										productname: "Strawberries",
										quantity: 23
									}
								]
							}
						],
						shipped: false,
						date: "2022-09-06T21:55:50.076+00:00",
						totalcost: 2000
					},
					{
						orderid: "order000002",
						users: [
							{
								username: "UserTwo",
								products: [
									{
										productname: "Watermelon",
										quantity: 23
									},
									{
										productname: "Strawberries",
										quantity: 23
									}
								]
							}
						],
						shipped: false,
						date: "2022-09-06T21:55:50.076+00:00",
						totalcost: 2000
					}
				]
			}),
			null
		);
	});
	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", (req, res, next) => {
			const orderManager = new OrderManagerClass(
				res,
				res,
				"productname",
				"strawberries",
				"orderid",
				"decreasing"
			);
			orderManager.parametersHandling();
			const secondOrderManager = new OrderManagerClass(
				res,
				res,
				"productname",
				"strawberries",
				"orderid",
				undefined
			);
			secondOrderManager.parametersHandling();

			const thirdOrderManager = new OrderManagerClass(
				res,
				res,
				undefined,
				undefined,
				undefined,
				undefined
			);
			thirdOrderManager.parametersHandling();

			const fourthOrderManager = new OrderManagerClass(
				res,
				res,
				"productname",
				undefined,
				"orderid",
				"increasing"
			);
			fourthOrderManager.noProducts();
			fourthOrderManager.parametersHandling();

			const fifthOrderManager = new OrderManagerClass(
				res,
				res,
				"shipped",
				true,
				"orderid",
				"increasing"
			);
			fifthOrderManager.parametersHandling();

			const sixthOrderManager = new OrderManagerClass(
				res,
				res,
				"orderid",
				"order00001",
				"orderid",
				"increasing"
			);
			sixthOrderManager.parametersHandling();

			const seventhOrderManager = new OrderManagerClass(
				res,
				res,
				"date",
				"2022-09-06T21:55:50.076+00:00",
				"orderid",
				"decreasing"
			);
			seventhOrderManager.parametersHandling();

			const eightOrderManager = new OrderManagerClass(
				res,
				res,
				"date",
				"2022-09-06T21:55:50.076+00:00",
				undefined,
				undefined
			);
			eightOrderManager.parametersHandling();

			expect("Content-Type", /json/);
			expect(200);
			// expect(res.statusCode).to.equal(200);

			getAllOrders(req, res, next);

			assert.isArray(JSON.parse(res).body);
			assert.match(
				JSON.parse(res).body,
				String({
					body: [
						{
							orderid: "order000001",
							users: [
								{
									username: "UserOne",
									products: [
										{
											productname: "Watermelon",
											quantity: 23
										},
										{
											productname: "Strawberries",
											quantity: 23
										}
									]
								}
							],
							shipped: false,
							date: "2022-09-06T21:55:50.076+00:00",
							totalcost: 2000
						},
						{
							orderid: "order000002",
							users: [
								{
									username: "UserTwo",
									products: [
										{
											productname: "Watermelon",
											quantity: 23
										},
										{
											productname: "Strawberries",
											quantity: 23
										}
									]
								}
							],
							shipped: false,
							date: "2022-09-06T21:55:50.076+00:00",
							totalcost: 2000
						}
					]
				})
			);
			const orders = JSON.parse(res).body;
			orders.map((order) => {
				expect(order).to.have.property("orderid");
				expect(order).to.have.property("users");
				expect(order).to.have.property("shipped");
				expect(order).to.have.property("date");
				expect(order).to.have.property("totalcost");
				// ...
			});
		});
	});
	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Get One", async () => {
	const testOrderGet = "order00001";
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{ params: testOrderGet },
			JSON.stringify({
				orderid: testOrderGet,
				users: [
					{
						username: "UserOne",
						products: [
							{
								productname: "Watermelon",
								quantity: 23
							},
							{
								productname: "Strawberries",
								quantity: 23
							}
						]
					}
				],
				shipped: false,
				date: "2022-09-06T21:55:50.076+00:00",
				totalcost: 2000
			}),
			null
		);
	});
	it("Stub for order router get (one)", async () => {
		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
			expect("Content-Type", /json/);

			// provare a scrivere il findOne a mongo con i corretti require qui
			// expect(200);
			expect(res.statusCode).to.equal(200);
			getOneOrder(req, res, next);

			assert.match(JSON.parse(res), {
				orderid: "order000001",
				users: [
					{
						username: "UserOne",
						products: [
							{
								productname: "Watermelon",
								quantity: 23
							},
							{
								productname: "Strawberries",
								quantity: 23
							}
						]
					}
				],
				shipped: false,
				date: "2022-09-06T21:55:50.076+00:00",
				totalcost: 2000
			});
			expect(JSON.parse(res)).to.have.property("orderid");
			expect(JSON.parse(res)).to.have.property("users");
			expect(JSON.parse(res)).to.have.property("shipped");
			expect(JSON.parse(res)).to.have.property("date");
			expect(JSON.parse(res)).to.have.property("totalcost");
		});
	});
	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Post", async () => {
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: JSON.stringify({
					orderid: "order000001",
					users: [
						{
							username: "UserOne",
							products: [
								{
									productname: "Watermelon",
									quantity: 23
								},
								{
									productname: "Strawberries",
									quantity: 23
								}
							]
						}
					],
					shipped: false,
					date: "2022-09-06T21:55:50.076+00:00",
					totalcost: 2000
				})
			},
			JSON.stringify({
				orderid: "order000001",
				users: [
					{
						username: "UserOne",
						products: [
							{
								productname: "Watermelon",
								quantity: 23
							},
							{
								productname: "Strawberries",
								quantity: 23
							}
						]
					}
				],
				shipped: false,
				date: "2022-09-06T21:55:50.076+00:00",
				totalcost: 2000
			}),
			null
		);
	});
	it("Stub for order router post", async () => {
		router.post("/orders-archieve/", async (req, res, next) => {
			postOneOrder(req, res, next);
			const prodUpdater = new ProductUpdaterClass(
				req.body,
				Product,
				Order,
				res
			);
			// const stubOne = sinon.stub(prodUpdater, "orderExistsCheck").resolves();
			// stub(prodUpdater, "orderExistsCheck").callsFake();
			// const prodUpStub = sinon.createStubInstance(ProductUpdaterClass);

			const ordCheck = await prodUpdater.orderExistsCheck();
			const userUpdater = new UserUpdaterClass(req.body, User, Order, res);
			// const stubTwo = sinon.stub(userUpdater, "usersExistCheck").resolves();
			const userCheck = await userUpdater.usersExistCheck();
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

			prodUpdater.searchProd();
			const results = await prodUpdater.createResults();
			const numOfErrs = await prodUpdater.createNewOrder();
			const orderUpdater = await userUpdater.updateAccountsNewOrder();
			// console.log(orderUpdater);

			expect("Content-Type", /json/);
			expect(200);
			assert.match(JSON.parse(res), {
				orderid: "order000001",
				users: [
					{
						username: "UserOne",
						products: [
							{
								productname: "Watermelon",
								quantity: 23
							},
							{
								productname: "Strawberries",
								quantity: 23
							}
						]
					}
				],
				shipped: false,
				date: "2022-09-06T21:55:50.076+00:00",
				totalcost: 2000
			});
			expect(JSON.parse(res)).to.have.property("orderid");
			expect(JSON.parse(res)).to.have.property("users");
			expect(JSON.parse(res)).to.have.property("shipped");
			expect(JSON.parse(res)).to.have.property("date");
			expect(JSON.parse(res)).to.have.property("totalcost");
		});
	});
	after(() => {
		router.post.restore();
	});
});

describe("Stub router order Put", async () => {
	const testOrderPut = "order00001";
	const newShipStatus = true;
	before(() => {
		const stub = sinon.stub(router, "put").yields(
			{ params: testOrderPut },
			JSON.stringify({
				orderid: testOrderPut,
				users: [
					{
						username: "UserOne",
						products: [
							{
								productname: "Watermelon",
								quantity: 23
							},
							{
								productname: "Strawberries",
								quantity: 23
							}
						]
					}
				],
				shipped: newShipStatus,
				date: "2022-09-06T21:55:50.076+00:00",
				totalcost: 2000
			}),
			null
		);
	});
	it("Stub for order router put", async () => {
		router.put(`/orders-archieve/${testOrderPut}`, async (req, res, next) => {
			putOneOrder(req, res, next);
			assert.match(JSON.parse(res), {
				orderid: "order00001",
				users: [
					{
						username: "UserOne",
						products: [
							{
								productname: "Watermelon",
								quantity: 23
							},
							{
								productname: "Strawberries",
								quantity: 23
							}
						]
					}
				],
				shipped: true,
				date: "2022-09-06T21:55:50.076+00:00",
				totalcost: 2000
			});
			expect(JSON.parse(res)).to.have.property("orderid");
			expect(JSON.parse(res)).to.have.property("users");
			expect(JSON.parse(res)).to.have.property("shipped");
			expect(JSON.parse(res)).to.have.property("date");
			expect(JSON.parse(res)).to.have.property("totalcost");
		});
	});
	after(() => {
		router.put.restore();
	});
});

describe("Stub router order Delete One", async () => {
	const testOrderDelete = "order00001";
	before(() => {
		const stub = sinon.stub(router, "delete").yields(
			{ params: testOrderDelete },
			JSON.stringify({
				message: "Order delete."
			}),
			null
		);
	});
	it("Stub for user router delete", async () => {
		router.delete(`/orders-archieve/${testOrderDelete}`, (req, res, next) => {
			deleteOneOrder(req, res, next);
			const prodUpdater = new ProductUpdaterClass(
				req.body,
				Product,
				Order,
				res
			);
			const userUpdater = new UserUpdaterClass(req.body, User, Order, res);
			userUpdater.updateAccountsDelOrder();
			prodUpdater.restoreQuantities();
			expect("Content-Type", /json/);
			expect(200);
			assert.match(JSON.parse(res), {
				message: "Order delete."
			});
			expect(JSON.parse(res)).to.have.property("message");
		});
	});
	after(() => {
		router.delete.restore();
	});
});

// // ----------- Order tests
