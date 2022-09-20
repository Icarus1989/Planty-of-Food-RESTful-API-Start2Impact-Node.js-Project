const router = require("../src/api/index");
const sinon = require("sinon");
require("./sinon-mongoose");
const referee = require("@sinonjs/referee");
const assert = referee.assert;
const { expect } = require("chai");
const { mockReq, mockRes } = require("sinon-express-mock");

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
		Product.findOneAndUpdate({ name: "Strawberries" }, { quantity: 23 });
		mockUserFindUpdate.verify();
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
		Product.findOneAndDelete({ name: "Strawberries" });
		mockProductFindDelete.verify();
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
		User.find({});
		mockUserFind.verify();
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
		User.findOneAndDelete({ username: "UserOne" });
		mockUserFindDelete.verify();
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
		const mockOrderFindDel = sinon
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
		Order.findOneAndDelete({
			orderid: "order000001"
		});
		mockOrderFindDel.verify();
	});
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

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(getAllProducts);
			getAllProducts(reqMock, resMock, next);

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

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(getOneProduct);
			getOneProduct(reqMock, resMock, next);

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

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(postOneProduct);
			postOneProduct(reqMock, resMock, next);

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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(putOneProduct);
			putOneProduct(reqMock, resMock, next);

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

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(deleteOneProduct);
			deleteOneProduct(reqMock, resMock, next);
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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(getAllUsers);
			getAllUsers(reqMock, resMock, next);
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
			// const mock = sinon
			// 	.mock(User)
			// 	.expects("findOne")
			// 	.withArgs({ username: testUserGet })
			// 	.resolves({
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
			// User.findOne({ username: testUserGet });
			// mock.verify();
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(getOneUser);
			getOneUser(reqMock, resMock, next);
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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(postOneUser);
			postOneUser(reqMock, resMock, next);
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
			const stubMethod = sinon.stub(putOneUser);
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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(deleteOneUser);
			deleteOneUser(reqMock, resMock, next);
			// stubRes.json()
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
			const orderManagerStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			const orderManager = new OrderManagerClass();

			orderManager.response = resMock;
			orderManager.data = resMock;
			orderManager.filterQuery = "productname";
			orderManager.valueQuery = "strawberries";
			orderManager.orderByQuery = "orderid";
			orderManager.sortQuery = undefined;
			// 	res,
			// 	res,
			// 	"productname",
			// 	"strawberries",
			// 	"orderid",
			// 	undefined

			orderManager.determinate();
			orderManager.ordering();
			orderManager.createResponse();
			orderManager.noProducts();
			orderManager.parametersHandling();

			// orderManager.resolves();

			const secondOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const secondOrderManager = new OrderManagerClass();

			secondOrderManager.response = resMock;
			secondOrderManager.data = resMock;
			secondOrderManager.filterQuery = "productname";
			secondOrderManager.valueQuery = "strawberries";
			secondOrderManager.orderByQuery = "orderid";
			secondOrderManager.sortQuery = "decreasing";

			secondOrderManager.determinate();
			secondOrderManager.ordering();
			secondOrderManager.createResponse();
			secondOrderManager.noProducts();
			secondOrderManager.parametersHandling();

			const thirdOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const thirdOrderManager = new OrderManagerClass();

			thirdOrderManager.response = resMock;
			thirdOrderManager.data = resMock;
			thirdOrderManager.filterQuery = undefined;
			thirdOrderManager.valueQuery = undefined;
			thirdOrderManager.orderByQuery = undefined;
			thirdOrderManager.sortQuery = undefined;

			thirdOrderManager.determinate();
			thirdOrderManager.ordering();
			thirdOrderManager.createResponse();
			thirdOrderManager.noProducts();
			thirdOrderManager.parametersHandling();

			const fourthOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const fourthOrderManager = new OrderManagerClass();

			fourthOrderManager.response = resMock;
			fourthOrderManager.data = resMock;
			fourthOrderManager.filterQuery = "date";
			fourthOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
			fourthOrderManager.orderByQuery = "orderid";
			fourthOrderManager.sortQuery = "increasing";

			fourthOrderManager.determinate();
			fourthOrderManager.ordering();
			fourthOrderManager.createResponse();
			fourthOrderManager.noProducts();
			fourthOrderManager.parametersHandling();

			const fifthOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const fifthOrderManager = new OrderManagerClass();

			fifthOrderManager.response = resMock;
			fifthOrderManager.data = resMock;
			fifthOrderManager.filterQuery = "shipped";
			fifthOrderManager.valueQuery = true;
			fifthOrderManager.orderByQuery = "orderid";
			fifthOrderManager.sortQuery = "increasing";

			fifthOrderManager.determinate();
			fifthOrderManager.ordering();
			fifthOrderManager.createResponse();
			fifthOrderManager.noProducts();
			fifthOrderManager.parametersHandling();

			const sixthOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const sixthOrderManager = new OrderManagerClass();

			sixthOrderManager.response = resMock;
			sixthOrderManager.data = resMock;
			sixthOrderManager.filterQuery = "orderid";
			sixthOrderManager.valueQuery = "order00001";
			sixthOrderManager.orderByQuery = "orderid";
			sixthOrderManager.sortQuery = "increasing";

			sixthOrderManager.determinate();
			sixthOrderManager.ordering();
			sixthOrderManager.createResponse();
			sixthOrderManager.noProducts();
			sixthOrderManager.parametersHandling();

			const seventhOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const seventhOrderManager = new OrderManagerClass();

			seventhOrderManager.response = resMock;
			seventhOrderManager.data = resMock;
			seventhOrderManager.filterQuery = "orderid";
			seventhOrderManager.valueQuery = "order00001";
			seventhOrderManager.orderByQuery = undefined;
			seventhOrderManager.sortQuery = undefined;

			seventhOrderManager.determinate();
			seventhOrderManager.ordering();
			seventhOrderManager.createResponse();
			seventhOrderManager.noProducts();
			seventhOrderManager.parametersHandling();

			const eightOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const eightOrderManager = new OrderManagerClass();

			eightOrderManager.response = resMock;
			eightOrderManager.data = resMock;
			eightOrderManager.filterQuery = "date";
			eightOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
			eightOrderManager.orderByQuery = undefined;
			eightOrderManager.sortQuery = undefined;

			eightOrderManager.determinate();
			eightOrderManager.ordering();
			eightOrderManager.createResponse();
			eightOrderManager.noProducts();
			eightOrderManager.parametersHandling();

			expect("Content-Type", /json/);
			expect(200);
			// expect(res.statusCode).to.equal(200);

			const stub = sinon.stub(getAllOrders);
			getAllOrders(reqMock, resMock, next);

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

			expect(res.statusCode).to.equal(200);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(getOneOrder);
			getOneOrder(reqMock, resMock, next);

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
			// const stubMethod = sinon.stub(postOneOrder);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			postOneOrder(reqMock, resMock, next);
			// postOneOrder.restore();

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

			const prodUpManager = new ProductUpdaterClass();

			prodUpManager.data = reqMock.body;
			prodUpManager.productModel = Product;
			prodUpManager.orderModel = Order;
			prodUpManager.response = resMock;

			prodUpManager.orderExistsCheck();
			prodUpManager.searchProd();
			prodUpManager.createResults();
			prodUpManager.createNewOrder();
			prodUpManager.restoreQuantities();
			// prodUpStub.withArgs(req.body, Product, Order, res);

			// prodUpStub.negativeArr = [];

			// for await (let elem of results) {
			// 	prodUpStub.updatingProduct = {
			// 		productname: elem["productname"]
			// 	};
			// 	// prodUpStub.updatingProduct.returns({ productname: "Watermelon" });
			// 	// prodUpStub.totalprice = 1000;
			// }

			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
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
				updateAccountsDelOrder: sinon.stub().returnsThis()
			});

			const userUpdater = new UserUpdaterClass();

			userUpdater.data = reqMock.body;
			userUpdater.userModel = User;
			userUpdater.orderModel = Order;
			userUpdater.response = resMock;

			userUpdater.findData();
			userUpdater.usersExistCheck();
			userUpdater.updateAccountsNewOrder();
			userUpdater.updateAccountsDelOrder();

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
		router.post("/orders-archieve/", async (req, res, next) => {
			// const stubMethod = sinon.stub(postOneOrder);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			postOneOrder(reqMock, resMock, next);

			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
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

			const prodUpManager = new ProductUpdaterClass();

			prodUpManager.data = reqMock.body;
			prodUpManager.productModel = Product;
			prodUpManager.orderModel = Order;
			prodUpManager.response = resMock;

			prodUpManager.orderExistsCheck();
			prodUpManager.searchProd();
			prodUpManager.createResults();
			prodUpManager.createNewOrder();
			prodUpManager.restoreQuantities();

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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(postOneOrder);
			postOneOrder(reqMock, resMock, next);

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

			const prodUpManager = new ProductUpdaterClass();

			prodUpManager.data = reqMock.body;
			prodUpManager.productModel = Product;
			prodUpManager.orderModel = Order;
			prodUpManager.response = resMock;

			prodUpManager.orderExistsCheck();
			prodUpManager.searchProd();
			prodUpManager.createResults();
			prodUpManager.createNewOrder();
			prodUpManager.restoreQuantities();
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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(putOneOrder);
			putOneOrder(reqMock, resMock, next);

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
	it("Stub for order router delete", async () => {
		router.delete(
			`/orders-archieve/${testOrderDelete}`,
			async (req, res, next) => {
				// const prodUpdater = new ProductUpdaterClass(
				// 	req.body,
				// 	Product,
				// 	Order,
				// 	res
				// );

				const reqMock = mockReq(req);
				const resMock = mockRes(res);
				const stubMethod = sinon.stub(deleteOneOrder);
				deleteOneOrder(reqMock, resMock, next);
				// deleteOneOrder.restore();
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

				const prodUdManager = new ProductUpdaterClass();

				prodUdManager.data = reqMock.body;
				prodUdManager.productModel = Product;
				prodUdManager.orderModel = Order;
				prodUdManager.response = resMock;

				prodUdManager.orderExistsCheck();
				prodUdManager.searchProd();
				prodUdManager.createResults();
				prodUdManager.createNewOrder();
				prodUdManager.restoreQuantities();

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
				const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
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
					updateAccountsDelOrder: sinon.stub().returnsThis()
				});

				const userUpdater = new UserUpdaterClass();
				// userUpdater.withArgs(req.body, User, Order, res);
				userUpdater.data = reqMock.body;
				userUpdater.userModel = User;
				userUpdater.orderModel = Order;
				userUpdater.response = resMock;

				userUpdater.findData();
				userUpdater.usersExistCheck();
				userUpdater.updateAccountsNewOrder();
				userUpdater.updateAccountsDelOrder();

				// userUpdaterStub.restore();

				// userUpdater.expects("findData").once();

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
