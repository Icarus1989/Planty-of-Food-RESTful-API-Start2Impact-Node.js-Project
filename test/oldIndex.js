const router = require("../src/api/index");
const sinon = require("sinon");
require("./sinon-mongoose");
const referee = require("@sinonjs/referee");
const assert = referee.assert;
const { expect } = require("chai");
// const { mockReq, mockRes } = require("sinon-express-mock");

const mongoose = require("mongoose");

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

describe("Testing mongoose Model methods", () => {
	it("Mock Product Model find({}) method", () => {
		const mockProdFind = sinon
			.mock(Product)
			.expects("find")
			.withArgs({})
			.resolves([
				{
					name: "Strawberries",
					quantity: 23000,
					origin: "Italy",
					price: 20.23
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
			]);
		// mockProductFind.resolves();
		Product.find({});
		mockProdFind.verify();
		// mockProdFind.restore();
	});

	it("Mock Product Model findOne( { name: } ) method", () => {
		const mockProdFindOne = sinon
			.mock(Product)
			.expects("findOne")
			.withArgs({ name: "Strawberries" })
			.resolves({
				name: "Strawberries",
				quantity: 23000,
				origin: "Italy",
				price: 20.23
			});
		Product.findOne({ name: "Strawberries" });
		mockProdFindOne.verify();
	});

	it("Mock Product Model findOneAndUpdate( { name: }, {field: newValue} ) method", () => {
		const mockUserFindUpdate = sinon
			.mock(Product)
			.expects("findOneAndUpdate")
			.withArgs({ name: "Strawberries" }, { quantity: 23 })
			.resolves({
				name: "Strawberries",
				quantity: 23,
				origin: "Italy",
				price: 20.23
			});
		mockUserFindUpdate.resolves();
	});

	it("Mock Product Model findOneAndDelete( { name: value } ) method", () => {
		const mockProductFindDelete = sinon
			.mock(Product)
			.expects("findOneAndDelete")
			.withArgs({ name: "Strawberries" })
			.resolves({
				name: "Strawberries",
				quantity: 23000,
				origin: "Italy",
				price: 20.23
			});
		mockProductFindDelete.resolves();
	});

	it("Mock User Model find({}) method", () => {
		const mockUserFind = sinon
			.mock(User)
			.expects("find")
			.withArgs({})
			.resolves([
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
			]);
		mockUserFind.resolves();
	});

	// it("Mock User Model findOne( { username: value } ) method", () => {
	// 	const mockUserFindOne = sinon
	// 		.mock(User)
	// 		.expects("findOne")
	// 		.withArgs({ username: "UserOne" })
	// 		.resolves({
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
	// 		});
	// 	mockUserFindOne.resolves();
	// 	mockUserFindOne.restore();
	// });

	// it("Mock User Model findOneAndUpdate ( { username: value } , {value: newValue} ) method", () => {
	// 	sinon
	// 		.mock(User)
	// 		.expects("findOneAndUpdate")
	// 		.withArgs({ username: "UserOne" }, { orders: [] })
	// 		.resolves({
	// 			firstname: "userTestOne",
	// 			lastname: "for Sinon Testing",
	// 			username: "User1",
	// 			address: "test@sinon.com",
	// 			orders: []
	// 		});
	// });

	it("Mock User Model findOneAndDelete ( { username: value } ) method", () => {
		const mockUserFindDelete = sinon
			.mock(User)
			.expects("findOneAndDelete")
			.withArgs({ username: "UserOne" })
			.resolves({
				firstname: "userTestOne",
				lastname: "for Sinon Testing",
				username: "User1",
				address: "test@sinon.com",
				orders: []
			});
		mockUserFindDelete.resolves();
	});

	it("Mock Order Model find({})", () => {
		sinon
			.mock(Order)
			.expects("find")
			.withArgs({})
			.resolves([
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
			]);
	});

	// it("Mock Order Model findOne( { orderid: value } )", () => {
	// 	sinon
	// 		.mock(Order)
	// 		.expects("findOne")
	// 		.withArgs({ orderid: "order000001" })
	// 		.resolves({
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
	// 		});
	// });

	// it("Mock Order Model findOneAndUpdate( { orderid: value }, { value: newValue} )", () => {
	// 	sinon
	// 		.mock(Order)
	// 		.expects("findOneAndUpdate")
	// 		.withArgs(
	// 			{
	// 				orderid: "order000001"
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
	// 				shipped: true,
	// 				date: "2022-09-06T21:55:50.076+00:00",
	// 				totalcost: 2000
	// 			}
	// 		)
	// 		.resolves({
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
	// 			shipped: true,
	// 			date: "2022-09-06T21:55:50.076+00:00",
	// 			totalcost: 2000
	// 		});
	// });

	// it("Mock Order Model findOneAndDelete( { orderid: value }, { value: newValue} )", () => {
	// 	sinon
	// 		.mock(Order)
	// 		.expects("findOneAndDelete")
	// 		.withArgs({
	// 			orderid: "order000001"
	// 		})
	// 		.resolves({
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
	// 			shipped: true,
	// 			date: "2022-09-06T21:55:50.076+00:00",
	// 			totalcost: 2000
	// 		});
	// });
});

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
						origin: "Italy",
						price: 20.23
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
			// router.get(request, response);
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
			// const request = mockReq(req);
			// const response = mockRes();
			// console.log(request);

			// expect("Content-Type", /json/);
			// expect(200);
			// expect(res.statusCode).to.equal(200);

			expect("Content-Type", /json/);
			expect(200);
			// expect(res.statusCode).to.equal(200);

			// --------> problem here
			sinon.assert.calledWith(router.get, `/products-storage/${testProdGet}`);
			getOneProduct(request, res, next);

			const label = `${String(testProdGet)[0].toUpperCase()}${String(
				testProdGet
			).slice(1)}`;

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

			const label = `${String(testProdPut)[0].toUpperCase()}${String(
				testProdPut
			).slice(1)}`;

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
			const mock = sinon
				.mock(User)
				.expects("findOne")
				.withArgs({ username: testUserGet })
				.resolves({
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
				});
			User.findOne({ username: testUserGet });
			mock.verify();

			getOneUser(req, res, next);
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
			// expect(res).to.be.equal(
			// 	JSON.stringify({
			// 		message: "User delete."
			// 	})
			// );
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
			const orderManager = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			// console.log(orderManager);
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
			fifthOrderManager.ordering();

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
			seventhOrderManager.ordering();

			const eightOrderManager = new OrderManagerClass(
				res,
				res,
				"date",
				"2022-09-06T21:55:50.076+00:00",
				undefined,
				undefined
			);
			eightOrderManager.parametersHandling();

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

			expect("Content-Type", /json/);
			expect(200);
			// expect(res.statusCode).to.equal(200);

			// const stub =

			getAllOrders(req, res, next);

			// mockMongoose.verify();

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
	const testOrderGet = "order000001";
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
		const stubvalue = null;
		router.post("/orders-archieve/", async (req, res, next) => {
			// postOneOrder(req, res);

			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
				orderExistsCheck: sinon.stub().returns(null),
				searchProd: sinon.stub().returns([
					{ productname: "Watermelon", response: "positive", quantity: 23 },
					{ productname: "Strawberries", response: "positive", quantity: 23 },
					{ productname: "Watermelon", response: "positive", quantity: 23 },
					{ productname: "Strawberries", response: "positive", quantity: 23 }
				]),
				createResults: sinon
					.stub()
					.returns({ productname: "Strawberries", quantity: 23 }),
				createNewOrder: sinon.stub().returns({
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
				restoreQuantities: sinon.stub().returns(null)
			});

			prodUpStub.withArgs(req.body, Product, Order, res);

			prodUpStub.negativeArr = [];

			for await (let elem of results) {
				prodUpStub.updatingProduct = {
					productname: elem["productname"]
				};
				// prodUpStub.updatingProduct.returns({ productname: "Watermelon" });
				// prodUpStub.totalprice = 1000;
			}

			const userUpdater = sinon.createStubInstance(UserUpdaterClass, {
				findData: sinon.stub().returns(["UserOne"]),
				usersExistCheck: sinon.stub().returns(null),
				updateAccountsNewOrder: sinon.stub().returns({
					firstname: "UserFromInsomnia",
					lastname: "from req.body",
					username: "UserOne",
					address: "test@request.com",
					orders: [
						{
							orderid: "00001",
							url: "none"
						}
					]
				}),
				updateAccountsDelOrder: sinon.stub().returns(null)
			});
			userUpdater.withArgs(req.body, User, Order, res);

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
	it("Stub for order router post - not enought products", async () => {
		const stubvalue = null;
		router.post("/orders-archieve/", async (req, res, next) => {
			postOneOrder(req, res);
			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass);
			prodUpStub.withArgs(req.body, Product, Order, res);

			const prodUpStub1 = sinon.createStubInstance(ProductUpdaterClass, {
				orderExistsCheck: sinon.stub().returns(null),
				searchProd: sinon.stub().returns([
					{ productname: "Watermelon", response: "positive", quantity: 23 },
					{ productname: "Strawberries", response: "positive", quantity: 23 },
					{
						productname: "Watermelon",
						response: "negative",
						message: "Too little quantity of Watermelon"
					},
					{ productname: "Strawberries", response: "positive", quantity: 23 }
				]),
				createResults: sinon
					.stub()
					.returns({ productname: "Strawberries", quantity: 23 }),
				createNewOrder: sinon.stub().returns({
					message1: `Too little quantity of Strawberries`
				}),
				restoreQuantities: sinon.stub().returns(null)
			});
			prodUpStub1.withArgs(req.body, Product, Order, res);

			expect("Content-Type", /json/);
			expect(200);
			assert.match(JSON.parse(res), {
				message1: `Too little quantity of Strawberries`
			});
			expect(JSON.parse(res)).to.have.property("message1");
		});
	});
	after(() => {
		router.post.restore();
	});
});

describe("Stub router order Post - order just exists", async () => {
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
			{
				message: "OrderId already exists"
			},
			null
		);
	});

	it("Stub for order router post - order just exists", async () => {
		router.post("/orders-archieve/", async (req, res, next) => {
			// ----
			// const prodUpStub = sinon.createStubInstance(ProductUpdaterClass);
			// await prodUpStub.withArgs(req.body, Product, Order, res);

			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
				orderExistsCheck: sinon.stub().returns({
					orderid: "order000002",
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
					totalcost: 2000
				}),
				searchProd: sinon.stub().returns(null),
				createResults: sinon.stub().returns(null),
				createNewOrder: sinon.stub().returns(null),
				restoreQuantities: sinon.stub().returns(null)
			});
			prodUpStub.withArgs(req.body, Product, Order, res);

			// aggiungere
			// expect("Content-Type", /json/);
			// expect(200);
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
	// let prodUpdater;
	before(() => {
		// prodUpdater = new ProductUpdaterClass(req.body, Product, Order, res);
		// prodUpStub = sinon.createStubInstance(ProductUpdaterClass);

		const stub = sinon.stub(router, "delete").yields(
			{ params: testOrderDelete },
			JSON.stringify({
				message: "Order delete."
			}),
			null
		);
	});
	it("Stub for user router delete", async () => {
		router.delete(
			`/orders-archieve/${testOrderDelete}`,
			async (req, res, next) => {
				const prodUpdater = new ProductUpdaterClass(
					req.body,
					Product,
					Order,
					res
				);

				// const prodUpdater = sinon.createStubInstance(ProductUpdaterClass, {
				// 	orderExistsCheck: sinon.stub().returns({
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
				// 	}),
				// 	searchProd: sinon.stub().returns(null),
				// 	createResults: sinon.stub().returns(null),
				// 	createNewOrder: sinon.stub().returns(null),
				// 	restoreQuantities: sinon.stub().returns(null)
				// });
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

				const userUpdater = new UserUpdaterClass(req.body, User, Order, res);
				// const userUpdater = sinon.createStubInstance(UserUpdaterClass, {
				// 	findData: sinon.stub().returns(["UserOne"]),
				// 	usersExistCheck: sinon.stub().returns(null),
				// 	updateAccountsNewOrder: sinon.stub().returns({
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
				// 	}),
				// 	updateAccountsDelOrder: sinon.stub().returnsThis()
				// });
				// userUpdater.withArgs(req.body, User, Order, res);

				userUpdater.usersUp = ["UserOne", "UserTwo"];
				userUpdater.usersUp.map((elem) => {
					elem.fieldToUpdate = {
						firstname: "UserFromInsomnia",
						lastname: "from req.body",
						username: "UserOne",
						address: "test@request.com",
						orders: []
					};
					elem.updatedField = {
						orderid: "000002",
						url: `/api/v1/orders-archieve/000002`
					};
					elem.resultUpdate = {
						firstname: "UserFromInsomnia",
						lastname: "from req.body",
						username: "UserOne",
						address: "test@request.com",
						orders: [
							{
								orderid: "000002",
								url: `/api/v1/orders-archieve/000002`
							}
						]
					};
				});

				const mockUserFindUpdate = sinon
					.mock(userUpdater.userModel)
					.expects("findOneAndUpdate")
					.withArgs(
						{
							username: "UserOne"
						},
						{
							orders: []
						}
					)
					.resolves({
						firstname: "UserFromInsomnia",
						lastname: "from req.body",
						username: "UserOne",
						address: "test@request.com",
						orders: []
					});

				userUpdater.userModel.findOneAndUpdate(
					{
						username: "UserOne"
					},
					{
						orders: []
					}
				);
				mockUserFindUpdate.verify();

				userUpdater.updateAccountsDelOrder();
				const mockTestingTwo = sinon
					.mock(userUpdater)
					.expects("updateAccountsDelOrder")
					.resolves();

				userUpdater.updateAccountsDelOrder();
				mockTestingTwo.verify();

				userUpdater.users = "UserOne";
				userUpdater.usersToUpdate = [
					{
						firstname: "UserFromInsomnia",
						lastname: "from req.body",
						username: "UserOne",
						address: "test@request.com",
						orders: []
					}
				];

				userUpdater.resolvedUsers = [
					{
						firstname: "UserFromInsomnia",
						lastname: "from req.body",
						username: "UserOne",
						address: "test@request.com",
						orders: []
					}
				];

				userUpdater.fieldsToUpdate = [];
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

				prodUpdater.restoreQuantities();

				const mockTesting = sinon
					.mock(prodUpdater)
					.expects("restoreQuantities")
					.resolves();

				prodUpdater.restoreQuantities();
				mockTesting.verify();

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

				expect("Content-Type", /json/);
				expect(200);
				assert.match(JSON.parse(res), {
					message: "Order delete."
				});
				expect(JSON.parse(res)).to.have.property("message");
			}
		);
	});
	after(() => {
		router.delete.restore();
	});
});

// // ----------- Order tests

// ------------------------

describe("Testing mongoose Model methods", () => {
	it("Mock Product Model find({}) method", () => {
		const mockProdFind = sinon
			.mock(Product)
			.expects("find")
			.withArgs({})
			.resolves([
				{
					name: "Strawberries",
					quantity: 23000,
					origin: "Italy",
					price: 20.23
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
			]);
		// mockProductFind.resolves();
		Product.find({});
		mockProdFind.verify();
		// mockProdFind.restore();
	});

	it("Mock Product Model findOne( { name: } ) method", () => {
		const mockProdFindOne = sinon
			.mock(Product)
			.expects("findOne")
			.withArgs({ name: "Strawberries" })
			.resolves({
				name: "Strawberries",
				quantity: 23000,
				origin: "Italy",
				price: 20.23
			});
		Product.findOne({ name: "Strawberries" });
		mockProdFindOne.verify();
	});

	it("Mock Product Model findOneAndUpdate( { name: }, {field: newValue} ) method", () => {
		const mockUserFindUpdate = sinon
			.mock(Product)
			.expects("findOneAndUpdate")
			.withArgs({ name: "Strawberries" }, { quantity: 23 })
			.resolves({
				name: "Strawberries",
				quantity: 23,
				origin: "Italy",
				price: 20.23
			});
		mockUserFindUpdate.resolves();
	});

	it("Mock Product Model findOneAndDelete( { name: value } ) method", () => {
		const mockProductFindDelete = sinon
			.mock(Product)
			.expects("findOneAndDelete")
			.withArgs({ name: "Strawberries" })
			.resolves({
				name: "Strawberries",
				quantity: 23000,
				origin: "Italy",
				price: 20.23
			});
		mockProductFindDelete.resolves();
	});

	it("Mock User Model find({}) method", () => {
		const mockUserFind = sinon
			.mock(User)
			.expects("find")
			.withArgs({})
			.resolves([
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
			]);
		mockUserFind.resolves();
	});

	it("Mock User Model findOne( { username: value } ) method", () => {
		const mockUserFindOne = sinon
			.mock(User)
			.expects("findOne")
			.withArgs({ username: "UserOne" })
			.resolves({
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
		User.findOne({ username: "UserOne" });
		mockUserFindOne.verify();
	});

	it("Mock User Model findOneAndUpdate ( { username: value } , {value: newValue} ) method", () => {
		const mockUserFindUp = sinon
			.mock(User)
			.expects("findOneAndUpdate")
			.withArgs({ username: "UserOne" }, { orders: [] })
			.resolves({
				firstname: "userTestOne",
				lastname: "for Sinon Testing",
				username: "User1",
				address: "test@sinon.com",
				orders: []
			});
		User.findOneAndUpdate({ username: "UserOne" }, { orders: [] });
		mockUserFindUp.verify();
	});

	it("Mock User Model findOneAndDelete ( { username: value } ) method", () => {
		const mockUserFindDelete = sinon
			.mock(User)
			.expects("findOneAndDelete")
			.withArgs({ username: "UserOne" })
			.resolves({
				firstname: "userTestOne",
				lastname: "for Sinon Testing",
				username: "User1",
				address: "test@sinon.com",
				orders: []
			});
		mockUserFindDelete.resolves();
	});

	it("Mock Order Model find({})", () => {
		const mockOrderFind = sinon
			.mock(Order)
			.expects("find")
			.withArgs({})
			.resolves([
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
			]);
		Order.find({});
		mockOrderFind.verify();
	});

	it("Mock Order Model findOne( { orderid: value } )", () => {
		const mockOrderFindOne = sinon
			.mock(Order)
			.expects("findOne")
			.withArgs({ orderid: "order000001" })
			.resolves({
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
		Order.findOne({ orderid: "order000001" });
		mockOrderFindOne.verify();
	});

	it("Mock Order Model findOneAndUpdate( { orderid: value }, { value: newValue} )", () => {
		const mockOrderFindUp = sinon
			.mock(Order)
			.expects("findOneAndUpdate")
			.withArgs(
				{
					orderid: "order000001"
				},
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
					shipped: true,
					date: "2022-09-06T21:55:50.076+00:00",
					totalcost: 2000
				}
			)
			.resolves({
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
				shipped: true,
				date: "2022-09-06T21:55:50.076+00:00",
				totalcost: 2000
			});
		Order.findOneAndUpdate(
			{
				orderid: "order000001"
			},
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
				shipped: true,
				date: "2022-09-06T21:55:50.076+00:00",
				totalcost: 2000
			}
		);
		mockOrderFindUp.verify();
	});

	it("Mock Order Model findOneAndDelete( { orderid: value }, { value: newValue} )", () => {
		sinon
			.mock(Order)
			.expects("findOneAndDelete")
			.withArgs({
				orderid: "order000001"
			})
			.resolves({
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
				shipped: true,
				date: "2022-09-06T21:55:50.076+00:00",
				totalcost: 2000
			});
	});
});

describe("Test Testing Class", async () => {
	let prodUpStub;
	before(() => {
		prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
			orderExistsCheck: sinon.stub().returns({
				orderid: "order000002",
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
				totalcost: 2000
			}),
			searchProd: sinon.stub().returns(null),
			createResults: sinon.stub().returns(null),
			createNewOrder: sinon.stub().returns(null),
			restoreQuantities: sinon.stub().returns(null)
		});
		prodUpStub.withArgs(
			{
				orderid: "order000002",
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
				totalcost: 2000
			},
			Product,
			Order,
			{
				orderid: "order000002",
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
				totalcost: 2000
			}
		);
	});
	it("Stub for product router get (all)", async () => {
		prodUpStub.orderExistsCheck();
	});
});
