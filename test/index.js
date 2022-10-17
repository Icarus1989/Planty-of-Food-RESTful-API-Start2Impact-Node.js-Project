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

describe("Stub router Base", () => {
	const msg = {
		message: "Welcome to Planty of Food API."
	};
	before(() => {
		const stub = sinon.stub(router, "get").yields(null, {
			body: { message: "Welcome to Planty of Food API." }
		});
	});

	it("Stub for router get /", () => {
		router.get("/", (req, res) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			resMock.status(200).json({ message: "Welcome to Planty of Food API." });
			expect(resMock.status.calledWith(200)).to.be.ok;
			expect(
				resMock.json.calledWith({ message: "Welcome to Planty of Food API." })
			).to.be.ok;
		});
	});
	after(() => {
		router.get.restore();
	});
});

// ----------- Product tests

const stubGetAllProducts = sinon.stub(getAllProducts);

const stubProductFind = sinon.stub(Product, "find");

describe("Stub router product Get All", async () => {
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			null,
			{
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
						origin: "Italy",
						price: 23.23
					},
					{
						name: "Apples",
						quantity: 10000,
						origin: "Italy",
						price: 23.32
					}
				]
			},
			null
		);
	});
	it("Stub for product router get (all)", async () => {
		router.get("/products-storage/", async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			// importante
			sinon.assert.calledWith(router.get, "/products-storage/");
			// importante
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllProducts(reqMock, resMock, next);

			stubProductFind.withArgs({}).returns([
				{
					name: "Strawberries",
					quantity: 23000,
					origin: "Italy",
					price: 20.23
				},
				{
					name: "Pineapples",
					quantity: 10000,
					origin: "Italy",
					price: 23.23
				},
				{
					name: "Apples",
					quantity: 10000,
					origin: "Italy",
					price: 23.32
				}
			]);
			const result = await Product.find({});

			resMock.status(200).json(res.body);

			sinon.assert.calledWith(resMock.status, 200);
			sinon.assert.match(result, resMock.body);
			const elements = result;
			elements.map((elem) => {
				expect(elem).to.have.property("name");
				expect(elem).to.have.property("quantity");
				expect(elem).to.have.property("origin");
				expect(elem).to.have.property("price");
			});
		});
	});
	it("Stub for product router get (all) - Handle Error", async () => {
		router.get(`/products-storage/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllProducts(reqMock, resMock, next);
			assert.isFalse(next(new Error()));
		});
	});

	after(() => {
		router.get.restore();
	});
});

const stubProductFindOne = sinon.stub(Product, "findOne");
const stubGetOneProduct = sinon.stub(getOneProduct);
const saveStubProd = sinon.stub(Product.prototype, "save");
const stubPostOneProduct = sinon.stub(postOneProduct);

// const stubRouterProductGet = sinon.stub(router, "get")

describe("Stub router product Get One", () => {
	const testProdGet = "strawberries";
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{ params: testProdGet },
			{
				body: {
					name: "Strawberries",
					quantity: 23,
					origin: "Italy",
					price: 20.23
				}
			},
			null
		);
	});
	it("Stub for product router get (one)", async () => {
		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);

			sinon.assert.calledWith(router.get, `/products-storage/${testProdGet}`);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneProduct(reqMock, resMock, next);

			const label = `${String(testProdGet)[0].toUpperCase()}${String(
				testProdGet
			).slice(1)}`;

			stubProductFindOne.withArgs({ name: "Strawberries" }).returns(res);
			const result = await Product.findOne({ name: "Strawberries" });

			resMock.status(200).json(result);

			assert.match(res.body, {
				name: "Strawberries",
				quantity: 23,
				origin: "Italy",
				price: 20.23
			});

			expect(resMock.body).to.have.property("name");
			expect(resMock.body).to.have.property("quantity");
			expect(resMock.body).to.have.property("origin");
			expect(resMock.body).to.have.property("price");
			expect(resMock.status).to.equal(200);
		});
	});

	it("Stub for product router get (one) - Handle Error", async () => {
		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetOneProduct(reqMock, resMock, next);
			assert.isFalse(next(new Error()));
		});
	});
	after(() => {
		router.get.restore();
		stubProductFindOne.restore();
	});
});

describe("Stub router product Get One - Product not found", () => {
	const testProdGet = "strawberries";
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{ params: testProdGet },
			{
				message: `${testProdGet} not exists`
			},
			null
		);
	});
	it("Stub for product router get (one) - Product not found", async () => {
		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);

			sinon.assert.calledWith(router.get, `/products-storage/${testProdGet}`);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneProduct(reqMock, resMock, next);

			const label = `${String(testProdGet)[0].toUpperCase()}${String(
				testProdGet
			).slice(1)}`;

			stubProductFindOne.withArgs({ name: label }).returns(null);
			const existence = await Product.findOne({ name: label });
			// console.log(existence);

			resMock.status(200).json({
				message: `Strawberries not exists`
			});
		});
	});
	it("Stub for product router get (one) - Handle Error", async () => {
		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetOneProduct(reqMock, resMock, next);
			// resMock.status(500).json({...});
		});
	});
	after(() => {
		stubProductFindOne.restore();

		router.get.restore();
	});
});

describe("Stub router product Post - Not Exist in DB - Saved", async () => {
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: {
					name: "Strawberries",
					quantity: 23,
					origin: "Italy",
					price: 10.23
				}
			},
			{
				name: "Strawberries",
				quantity: 23,
				origin: "Italy",
				price: 10.23
			},
			null
		);
	});
	it("Stub for product router post - Not Exist in DB - Saved", async () => {
		router.post("/products-storage/", async (req, res, next) => {
			sinon.assert.calledWith(router.post, "/products-storage/");
			expect("Content-Type", /json/);
			expect(200);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubPostOneProduct(reqMock, resMock, next);

			const stubProductFindOne = sinon
				.stub(Product, "findOne")
				.withArgs({ name: "Strawberries" })
				.returns(null);
			const existence = Product.findOne({ name: "Strawberries" });

			saveStubProd.returnsThis();

			const newProduct = new Product(reqMock.body);

			const result = await newProduct.save();
			resMock.status(200).json(result);
			expect(saveStubProd.calledOnce).to.be.true;
			assert.strictEqual(JSON.stringify(result), JSON.stringify(newProduct));
		});
	});

	it("Stub for product router post - Not Exist in DB - Error during saving", async () => {
		router.post("/products-storage/", async (req, res, next) => {
			sinon.assert.calledWith(router.post, "/products-storage/");

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubPostOneProduct(reqMock, resMock, next);

			stubProductFindOne.withArgs({ name: "Strawberries" }).returns(null);
			const existence = Product.findOne({ name: "Strawberries" });

			saveStubProd.withArgs(new Error(), existence).rejects();

			const newProduct = new Product(reqMock.body);
			const result = newProduct.save();
			resMock.status(500).json({ message: "Error during Product saving..." });
			assert.isFalse(next(new Error()));

			// }
		});
	});
	it("Stub for product router post - Handle Error", async () => {
		router.post(`/products-storage/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubPostOneProduct(reqMock, resMock, next);
			assert.isFalse(next(new Error()));
		});
	});
	after(() => {
		stubProductFindOne.restore();
		saveStubProd.restore();
		router.post.restore();
	});
});

describe("Stub router product Post - Exist in DB - Not Saved", async () => {
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: {
					name: "Strawberries",
					quantity: 23,
					origin: "Italy",
					price: 10.23
				}
			},
			{
				message: `The product Strawberries already exists.`
			},
			null
		);
	});
	it("Stub for product router post - Exist in DB - Not Saved", async () => {
		router.post("/products-storage/", async (req, res, next) => {
			sinon.assert.calledWith(router.post, "/products-storage/");
			expect("Content-Type", /json/);
			expect(200);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubPostOneProduct(reqMock, resMock, next);

			const stubProductFindOne = sinon
				.stub(Product, "findOne")
				.withArgs({ name: "Strawberries" })
				.returns({
					name: "Strawberries",
					quantity: 23,
					origin: "Italy",
					price: 10.23
				});
			const existence = Product.findOne({ name: "Strawberries" });

			resMock.status(200).json(res);

			assert.strictEqual(res, {
				message: `The product Strawberries already exists.`
			});
		});
	});
	it("Stub for product router post - Handle Error", async () => {
		router.post(`/products-storage/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubPostOneProduct(reqMock, resMock, next);
			assert.isFalse(next(new Error()));
		});
	});
	after(() => {
		router.post.restore();
	});
});

const stubputOneProduct = sinon.stub(putOneProduct);

const stubProductFindUp = sinon.stub(Product, "findOneAndUpdate");

describe("Stub router product Put", async () => {
	const testProdPut = "Strawberries";
	const newQuantity = 23;
	before(() => {
		const stub = sinon.stub(router, "put").yields(
			{
				params: testProdPut,
				body: {
					name: testProdPut,
					quantity: newQuantity,
					origin: "Italy",
					price: 20.23
				}
			},
			JSON.stringify({
				name: testProdPut,
				quantity: newQuantity,
				origin: "Italy",
				price: 20.23
			}),
			null
		);
	});
	it("Stub for product router put", async () => {
		router.put("/products-storage/Strawberries", async (req, res, next) => {
			sinon.assert.calledWith(router.put, `/products-storage/${testProdPut}`);
			expect("Content-Type", /json/);
			expect(200);
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubputOneProduct(reqMock, resMock, next);

			stubProductFindUp
				.withArgs({ name: "Strawberries" }, { quantity: 23 })
				.returns(res);
			const result = await Product.findOneAndUpdate(
				{ name: "Strawberries" },
				{ quantity: 23 }
			);

			resMock.status(200).json(result);

			const label = `${String(testProdPut)[0].toUpperCase()}${String(
				testProdPut
			).slice(1)}`;

			assert.match(JSON.parse(res), {
				name: "Strawberries",
				quantity: 23,
				price: 20.23
			});
			expect(JSON.parse(res)).to.have.property("name");
			expect(JSON.parse(res)).to.have.property("quantity");
			expect(JSON.parse(res)).to.have.property("price");
		});
	});
	it("Stub for product router put - Handle Error", async () => {
		router.put(`/products-storage/${testProdPut}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubputOneProduct(reqMock, resMock, next);
		});
	});

	after(() => {
		router.put.restore();
	});
});

const stubdeleteOneProduct = sinon.stub(deleteOneProduct);

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
		router.delete("/products-storage/Strawberries", async (req, res, next) => {
			sinon.assert.calledWith(
				router.delete,
				`/products-storage/${testProdDelete}`
			);
			expect("Content-Type", /json/);
			expect(200);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubdeleteOneProduct(reqMock, resMock, next);

			const stubProductFindDelete = sinon
				.stub(Product, "findOneAndDelete")
				.returns({
					name: "Strawberries",
					quantity: 23000,
					origin: "Italy",
					price: 20.23
				});
			const result = await Product.findOneAndDelete({ name: "Strawberries" });

			resMock.status(200).json({
				message: "Field delete."
			});
			assert.match(JSON.parse(res), {
				message: "Field delete."
			});
			expect(JSON.parse(res)).to.have.property("message");
		});
	});
	it("Stub for product router delete - Handle Error", async () => {
		router.delete(
			`/products-storage/${testProdDelete}`,
			async (req, res, next) => {
				expect(500);
				const reqMock = mockReq(req);
				const resMock = new Error();
				stubdeleteOneProduct(reqMock, resMock, next);
			}
		);
	});

	after(() => {
		router.delete.restore();
	});
});

// ----------- Product tests

// ----------- User tests

const stubGetAllUsers = sinon.stub(getAllUsers);

describe("Stub router user Get All", async () => {
	const body = [
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
	];
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			null,
			JSON.stringify({
				body: body
			}),
			null
		);
	});
	it("Stub for user router get (all)", async () => {
		router.get("/users/", async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllUsers(reqMock, resMock, next);

			const mockUserFind = sinon
				.mock(User)
				.expects("find")
				.withArgs({})
				.resolves(body);
			const result = await User.find({});
			mockUserFind.verify();

			resMock.status(200).json(result);
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
	it("Stub for user router get (all) - handle errors", async () => {
		router.get("/users/", (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllUsers(reqMock, resMock, next);
		});
	});
	after(() => {
		router.get.restore();
	});
});

const stubUserFindOne = sinon.stub(User, "findOne");
const stubGetOneUser = sinon.stub(getOneUser);

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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneUser(req, res, next);

			stubUserFindOne.withArgs({ username: "User1" }).returns({
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
			const existence = await User.findOne({ username: "User1" });

			// console.log(res);

			// resMock.status(200).json(existence);

			// CONTINUARE CON TEST STUB TUTTI I METODI FIND...
			// E ALTERNARE ATTIVO/DISATTIVO PER VEDERE COPERTURA LINEE

			resMock.status(200).json(existence);
			expect("Content-Type", /json/);
			expect(200);
			assert.match(JSON.parse(res), {
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
			expect(JSON.parse(res)).to.have.property("firstname");
			expect(JSON.parse(res)).to.have.property("lastname");
			expect(JSON.parse(res)).to.have.property("username");
			expect(JSON.parse(res)).to.have.property("address");
			expect(JSON.parse(res)).to.have.property("orders");
		});
	});
	it("Stub for user router get (one) - Handle Error", async () => {
		router.get(`/users/${testUserGet}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetOneUser(req, res, next);
		});
	});
	after(() => {
		stubUserFindOne.restore();
		router.get.restore();
	});
});

const stubPostOneUser = sinon.stub(postOneUser);
const saveStubUser = sinon.stub(User.prototype, "save");

describe("Stub router user Post - Not Exist in DB - Saved", async () => {
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: {
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
				}
			},
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
			null
		);
	});
	it("Stub for user router post - Not Exist in DB - Saved ", async () => {
		router.post("/users/", async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubPostOneUser(reqMock, resMock, next);

			const stubUserFindOne = sinon
				.stub(User, "findOne")
				.withArgs({ username: "User1" })
				.returns(null);
			const existence = User.findOne({ username: "User1" });

			saveStubUser.returnsThis();

			const newUser = new User(reqMock.body);
			const result = await newUser.save();

			expect(saveStubUser.calledOnce).to.be.true;
			resMock.status(200).json(result);

			// Valutare
			// assert.strictEqual(result, newUser);
			// resMock.status(200).json(result);
			// Valutare

			// } catch (err) {
			// 	assert.isFalse(next(err));
			// }
			// assert.isFalse(
			// 	resMock.status(200).json({ message: `The user User1 already exists.` })
			// );
			// User.save();
			// saveStub.restore();
		});
	});

	it("Stub for user router post - Handle Error", async () => {
		router.post(`/users/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubPostOneUser(reqMock, resMock, next);
			assert.isFalse(next(resMock));
		});
	});
	after(() => {
		stubUserFindOne.restore();
		saveStubUser.restore();
		router.post.restore();
	});
});

describe("Stub router user Post - Exist in DB - Not Saved", async () => {
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: {
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
				}
			},
			{
				message: `The user User1 already exists.`
			},
			null
		);
	});
	it("Stub for user router post - Exist in DB - Not Saved ", async () => {
		router.post("/users/", async (req, res, next) => {
			// try {
			sinon.assert.calledWith(router.post, "/users/");
			expect("Content-Type", /json/);
			expect(200);
			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			stubPostOneUser(reqMock, resMock, next);
			const stubUserFindOne = sinon
				.stub(User, "findOne")
				.withArgs({ username: "User1" })
				.returns({
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
			const existence = User.findOne({ username: "User1" });

			resMock.status(200).json(res);

			assert.strictEqual(res, {
				message: `The user User1 already exists.`
			});

			// --------------------------

			// expect(JSON.parse(res)).to.have.property("lastname");
			// expect(JSON.parse(res)).to.have.property("username");
			// expect(JSON.parse(res)).to.have.property("address");
			// expect(JSON.parse(res)).to.have.property("orders");
		});
	});
	it("Stub for user router post - Handle Error", async () => {
		router.post(`/users/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubPostOneUser(reqMock, resMock, next);
			assert.isFalse(next(new Error()));
		});
	});
	after(() => {
		router.post.restore();
	});
});

const stubUserFindUp = sinon.stub(User, "findOneAndUpdate");

const stubPutOneUser = sinon.stub(putOneUser);

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

			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			stubPutOneUser(req, res, next);

			stubUserFindUp.withArgs({ username: testUserPut }, res).returns({
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
			});
			const result = await User.findOneAndUpdate({ username: testUserPut });

			resMock.status(200).json({
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
			});
			assert.match(JSON.parse(res), {
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
			});
			expect(JSON.parse(res)).to.have.property("firstname");
			expect(JSON.parse(res)).to.have.property("lastname");
			expect(JSON.parse(res)).to.have.property("username");
			expect(JSON.parse(res)).to.have.property("address");
			expect(JSON.parse(res)).to.have.property("orders");
		});
	});
	it("Stub for user router put - Handle Error", async () => {
		router.put(`/users/${testUserPut}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubPutOneUser(reqMock, resMock, next);
		});
	});
	after(() => {
		router.put.restore();
	});
});

const stubDeleteOneUser = sinon.stub(deleteOneUser);
const stubUserFindOneDelete = sinon.stub(User, "findOneAndDelete");

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
	it("Stub for user router delete", async () => {
		router.delete(
			`/products-storage/${testUserDelete}`,
			async (req, res, next) => {
				expect("Content-Type", /json/);
				expect(200);
				const reqMock = mockReq(req);
				const resMock = mockRes(res);
				stubDeleteOneUser(req, res, next);

				stubUserFindOneDelete.withArgs({ username: "User1" }).returns({
					firstname: "userTestOne",
					lastname: "for Sinon Testing",
					username: "User1",
					address: "test@sinon.com",
					orders: []
				});
				const result = await User.findOneAndDelete({ username: "User1" });

				resMock.status(200).json({
					message: "User delete."
				});
				assert.match(JSON.parse(res), {
					message: "User delete."
				});
				expect(JSON.parse(res)).to.have.property("message");
				// expect(res).to.be.equal(
				// 	JSON.stringify({
				// 		message: "User delete."
				// 	})
				// );
			}
		);
	});
	it("Stub for user router delete - Handle Error", async () => {
		router.delete(`/users/${testUserDelete}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubDeleteOneUser(reqMock, resMock, next);
		});
	});

	after(() => {
		router.delete.restore();
	});
});

// // ----------- User tests

// // ----------- Order tests

const stubGetAllOrders = sinon.stub(getAllOrders);

const stubOrderFind = sinon.stub(Order, "find");

describe("Stub router order Get All - filter: date, value: 202..., orderBy: undefined, sort: undefined", async () => {
	const results = [
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
	];
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{
				params: {
					filter: "date",
					value: "2022-09-06T21:55:50.076+00:00",
					orderBy: undefined,
					sort: undefined
				}
			},
			{
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
			},
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			stubOrderFind.withArgs({}).returns(resMock.body);

			const result = await Order.find({});

			const eightOrderStub = sinon.createStubInstance(OrderManagerClass, {
				parametersHandling: sinon.stub().returnsThis(),
				determinate: sinon.stub().returns(result),
				ordering: sinon.stub().returns(result),
				createResponse: sinon
					.stub()
					.withArgs(result)
					.returns(resMock.status(200).json(result))
			});

			const eightOrderManager = new OrderManagerClass();

			eightOrderManager.response = await result;
			eightOrderManager.data = await result;
			eightOrderManager.filterQuery = "date";
			eightOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
			eightOrderManager.orderByQuery = undefined;
			eightOrderManager.sortQuery = undefined;

			await eightOrderManager.parametersHandling();
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllOrders(reqMock, resMock, next);

			const eightOrderStub = sinon.createStubInstance(OrderManagerClass, {
				parametersHandling: sinon.stub().throws()
			});

			const eightOrderManager = new OrderManagerClass();
			await eightOrderManager.parametersHandling();
		});
	});

	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Get All - filter: orderid, value: order000001, orderBy: undefined, sort: undefined", async () => {
	const results = [
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
	];
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{
				params: {
					filter: "orderid",
					value: "order00001",
					orderBy: undefined,
					sort: undefined
				}
			},
			{
				body: results
			},
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			stubOrderFind.withArgs({}).returns(results);

			const result = await Order.find({});

			console.log(result);

			const seventhOrderStub = sinon.createStubInstance(OrderManagerClass, {
				parametersHandling: sinon.stub().returnsThis(),
				determinate: sinon.stub().returns(result),
				ordering: sinon.stub().returns(result),
				createResponse: sinon
					.stub()
					.withArgs(result)
					.returns(resMock.status(200).json(result))
			});

			const seventhOrderManager = new OrderManagerClass();

			seventhOrderManager.response = await result;
			seventhOrderManager.data = await result;
			seventhOrderManager.filterQuery = "orderid";
			seventhOrderManager.valueQuery = "order00001";
			seventhOrderManager.orderByQuery = undefined;
			seventhOrderManager.sortQuery = undefined;

			await seventhOrderManager.parametersHandling();
			// await seventhOrderManager.determinate();
			// await seventhOrderManager.ordering();
			// await seventhOrderManager.createResponse();
			// await seventhOrderManager.noProducts();
			// ---- QUI 05/10
			// console.log(response);

			// resMock.status(200).json(result);

			// stubGetAllOrders.restore();

			// console.log(thirdOrderStub);

			// secondOrderManager.determinate().then((result) => console.log(result));

			// console.log(secondOrderStub.determinate());
			// console.log(secondOrderStub.ordering());

			// expect(secondOrderStub.determinate()).to.be.equal(results);
			// expect(thirdOrderManager.determinate().response).to.be.a("array");
			// return secondOrderStub.determinate().should.eventually.equal(results);
			// assert(secondOrderStub.determinate()).returns(results);
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllOrders(null, null, next);
			assert.isFalse(next(new Error()));
		});
	});

	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Get All - filter: orderid, value: order000001, orderBy: orderid, sort: increasing", async () => {
	const results = [
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
	];
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{
				params: {
					filter: "orderid",
					value: "order00001",
					orderBy: "orderid",
					sort: "increasing"
				}
			},
			{
				body: results
			},
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			const result = await Order.find({});

			console.log(result);

			const sixthOrderStub = sinon.createStubInstance(OrderManagerClass, {
				parametersHandling: sinon.stub().returnsThis(),
				determinate: sinon.stub().returns(result),
				ordering: sinon.stub().returns(result),
				createResponse: sinon
					.stub()
					.withArgs(result)
					.returns(resMock.status(200).json(result))
			});

			const sixthOrderManager = new OrderManagerClass();

			sixthOrderManager.response = await result;
			sixthOrderManager.data = await result;
			sixthOrderManager.filterQuery = "orderid";
			sixthOrderManager.valueQuery = "order00001";
			sixthOrderManager.orderByQuery = "orderid";
			sixthOrderManager.sortQuery = "increasing";

			// sixthOrderManager.determinate();
			// sixthOrderManager.ordering();
			// sixthOrderManager.createResponse();
			// sixthOrderManager.noProducts();
			await sixthOrderManager.parametersHandling();

			// console.log(thirdOrderStub);

			// secondOrderManager.determinate().then((result) => console.log(result));

			// console.log(secondOrderStub.determinate());
			// console.log(secondOrderStub.ordering());

			// expect(secondOrderStub.determinate()).to.be.equal(results);
			// expect(thirdOrderManager.determinate().response).to.be.a("array");
			// return secondOrderStub.determinate().should.eventually.equal(results);
			// assert(secondOrderStub.determinate()).returns(results);
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllOrders(null, null, next);
			assert.isFalse(next(new Error()));
		});
	});

	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Get All - filter: shipped, value: true, orderBy: orderid, sort: increasing", async () => {
	const results = [
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
	];
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{
				params: {
					filter: "shipped",
					value: true,
					orderBy: "orderid",
					sort: "increasing"
				}
			},
			{
				body: results
			},
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			stubOrderFind.withArgs({}).returns(results);

			const result = await Order.find({});

			console.log(result);

			const fifthOrderStub = sinon.createStubInstance(OrderManagerClass, {
				parametersHandling: sinon.stub().returnsThis(),
				determinate: sinon.stub().returns(result),
				ordering: sinon.stub().returns(result),
				createResponse: sinon
					.stub()
					.withArgs(result)
					.returns(resMock.status(200).json(result))
			});

			const fifthOrderManager = new OrderManagerClass();

			fifthOrderManager.response = await result;
			fifthOrderManager.data = await result;
			fifthOrderManager.filterQuery = reqMock.params.filter;
			fifthOrderManager.valueQuery = reqMock.params.value;
			fifthOrderManager.orderByQuery = reqMock.params.orderBy;
			fifthOrderManager.sortQuery = reqMock.params.sort;

			await fifthOrderManager.parametersHandling();
			// await fifthOrderManager.determinate();
			// await fifthOrderManager.ordering();
			// await fifthOrderManager.createResponse();
			// await fifthOrderManager.noProducts();
			// resMock.status(200).json(result);

			// console.log(thirdOrderStub);

			// secondOrderManager.determinate().then((result) => console.log(result));

			// console.log(secondOrderStub.determinate());
			// console.log(secondOrderStub.ordering());

			// expect(secondOrderStub.determinate()).to.be.equal(results);
			// expect(thirdOrderManager.determinate().response).to.be.a("array");
			// return secondOrderStub.determinate().should.eventually.equal(results);
			// assert(secondOrderStub.determinate()).returns(results);
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllOrders(null, null, next);
			assert.isFalse(next(new Error()));
		});
	});

	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Get All - filter: date, value: 2022..., orderBy: orderid, sort: decreasing", async () => {
	const results = [
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
	];
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{
				params: {
					filter: "date",
					value: "2022-09-06T21:55:50.076+00:00",
					orderBy: "orderid",
					sort: "decreasing"
				}
			},
			{
				body: results
			},
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			stubOrderFind.withArgs({}).returns(results);

			const result = await Order.find({});

			const fourthOrderStub = sinon.createStubInstance(OrderManagerClass, {
				parametersHandling: sinon.stub().returnsThis(),
				determinate: sinon.stub().returns(result),
				ordering: sinon.stub().returns(result),
				createResponse: sinon
					.stub()
					.withArgs(result)
					.returns(resMock.status(200).json(result))
			});

			const fourthOrderManager = new OrderManagerClass();

			fourthOrderManager.response = await result;
			fourthOrderManager.data = await result;
			fourthOrderManager.filterQuery = "date";
			fourthOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
			fourthOrderManager.orderByQuery = "orderid";
			fourthOrderManager.sortQuery = "decreasing";

			await fourthOrderManager.parametersHandling();
			// await fourthOrderManager.determinate();
			// await fourthOrderManager.ordering();
			// await fourthOrderManager.createResponse();
			// fourthOrderManager.noProducts();

			// resMock.status(200).json(result);

			// secondOrderManager.determinate().then((result) => console.log(result));

			// console.log(secondOrderStub.determinate());
			// console.log(secondOrderStub.ordering());

			// expect(secondOrderStub.determinate()).to.be.equal(results);
			// expect(thirdOrderManager.determinate().response).to.be.a("array");
			// return secondOrderStub.determinate().should.eventually.equal(results);
			// assert(secondOrderStub.determinate()).returns(results);
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllOrders(null, null, next);
			assert.isFalse(next(new Error()));
		});
	});

	after(() => {
		stubOrderFind.restore();
		router.get.restore();
	});
});

describe("Stub router order Get All - All undefined", async () => {
	const results = [
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
	];
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{
				params: {
					filter: undefined,
					value: undefined,
					orderBy: undefined,
					sort: undefined
				}
			},
			{
				body: results
			},
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			stubOrderFind.withArgs({}).returns(results);

			const result = await Order.find({});

			// console.log(result);

			const thirdOrderStub = sinon.createStubInstance(OrderManagerClass, {
				parametersHandling: sinon.stub().returnsThis(),
				determinate: sinon.stub().returns(result),
				ordering: sinon.stub().returns(result),
				createResponse: sinon
					.stub()
					.withArgs(result)
					.returns(resMock.status(200).json(result))
			});

			const thirdOrderManager = new OrderManagerClass();

			thirdOrderManager.response = await result;
			thirdOrderManager.data = await result;
			thirdOrderManager.filterQuery = undefined;
			thirdOrderManager.valueQuery = undefined;
			thirdOrderManager.orderByQuery = undefined;
			thirdOrderManager.sortQuery = undefined;

			await thirdOrderManager.parametersHandling();

			await thirdOrderManager.determinate();
			await thirdOrderManager.ordering();
			// await thirdOrderManager.createResponse();
			// await thirdOrderManager.noProducts();

			// resMock.status(200).json(result);
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllOrders(null, null, next);
			assert.isFalse(next(new Error()));
		});
	});

	after(() => {
		stubOrderFind.restore();

		router.get.restore();
	});
});

describe("Stub router order Get All - miss sort param", async () => {
	const results = [
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
	];
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{
				params: {
					filter: "productname",
					value: "strawberries",
					orderBy: "orderid",
					sort: undefined
				}
			},
			{
				message: `Need a &sort= parameter for search...`
			},
			null
		);
	});

	it("Stub for router order get (all) - miss sort param", () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			//

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			const stubOrderFindTest = sinon
				.stub(Order, "find")
				.withArgs({})
				.returns(results);

			const savedResult = await Order.find({});

			const orderManagerStub = sinon.createStubInstance(OrderManagerClass, {
				parametersHandling: sinon.stub().returnsThis(),
				missParam: sinon
					.stub()
					.withArgs("&sort= ")
					.returns(
						resMock.status(400).json({
							message: `Need a &sort= parameter for search...`
						})
					)
				// determinate: sinon.stub().returns(result),
				// ordering: sinon.stub().returns(result),
				// createResponse: sinon
				// 	.stub()
				// 	.withArgs(result)
				// 	.returns(resMock.status(200).json(result))
			});

			const orderManager = new OrderManagerClass();

			orderManager.response = await savedResult;
			orderManager.data = await savedResult;
			orderManager.filterQuery = "productname";
			orderManager.valueQuery = "strawberries";
			orderManager.orderByQuery = "orderid";
			orderManager.sortQuery = undefined;

			orderManager.determinate();
			orderManager.ordering();
			orderManager.createResponse();
			orderManager.noProducts();
			orderManager.parametersHandling();
			orderManager.missParam();

			// expect.fail(orderManager.parametersHandling(), {
			// 	message: `Need a &sort= parameter for search...`
			// });

			// resMock.status(400).json();

			// expect(
			// 	orderManager.missParam("&sort= "),
			// 	resMock.status(400).json({
			// 		message: `Need a &sort= parameter for search...`
			// 	})
			// );
			// sinon.assert.match(resMock, {
			// 	message: `Need a &sort= parameter for search...`
			// });
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			// const reqMock = mockReq(req);
			// const resMock = new Error();
			stubGetAllOrders(null, null, next);
			assert.isFalse(next(new Error()));
		});
	});

	after(() => {
		stubOrderFind.restore();
		router.get.restore();
	});
});

describe("Stub router order Get All", async () => {
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{
				params: {
					filter: "productname",
					value: "strawberries",
					orderBy: "orderid",
					sort: "decreasing"
				}
			},
			{
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
			},
			null
		);
	});
	it("Stub for router order get (all)", async () => {
		// const results = [
		// 	{
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
		// 	},
		// 	{
		// 		orderid: "order000002",
		// 		users: [
		// 			{
		// 				username: "UserTwo",
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
		// 	}
		// ];
		router.get("/orders-archieve/", async (req, res, next) => {
			const secondOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			// modificare i vari createStubInstance con metodi
			// che facciano qualcosa

			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			// const stubGetAllOrders = sinon.stub(getAllOrders);
			stubGetAllOrders(reqMock, resMock, next);

			const stubOrderFindTwo = sinon
				.stub(Order, "find")
				.withArgs({})
				.returns([
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

			const result = await Order.find({});

			const secondOrderManager = new OrderManagerClass();

			secondOrderStub.response = await result;
			secondOrderStub.data = await result;
			secondOrderStub.filterQuery = reqMock.params.filter;
			secondOrderStub.valueQuery = reqMock.params.value;
			secondOrderStub.orderByQuery = reqMock.params.orderBy;
			secondOrderStub.sortQuery = reqMock.params.sort;

			// secondOrderStub.determinate();
			// secondOrderStub.ordering();
			// secondOrderStub.createResponse();
			// secondOrderStub.noProducts();
			await secondOrderManager.parametersHandling();
			// console.log(val);

			// expect(secondOrderStub.determinate().response).to.be.a("array");

			expect("Content-Type", /json/);
			expect(200);

			assert.isArray(res.body);
			const orders = res.body;
			orders.map((order) => {
				expect(order).to.have.property("orderid");
				expect(order).to.have.property("users");
				expect(order).to.have.property("shipped");
				expect(order).to.have.property("date");
				expect(order).to.have.property("totalcost");
			});
			resMock.status(200).json(result);
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllOrders(null, null, next);
			sinon.assert.calledWith(resMock.status, 500);
		});
	});

	after(() => {
		// stubOrderFind.restore();
		router.get.restore();
	});
});

const stubGetOneOrder = sinon.stub(getOneOrder);
const stubOrderFindOne = sinon.stub(Order, "findOne");

describe("Stub router order Get One", () => {
	const testOrderGet = "order000001";
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{ params: testOrderGet },
			{
				body: {
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
				}
			},
			null
		);
	});
	it("Stub for order router get (one)", async () => {
		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.calledWith(router.get, `/orders-archieve/${testOrderGet}`);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneOrder(reqMock, resMock, next);

			stubOrderFindOne.withArgs({ orderid: "order000001" }).returns(res);

			const result = await Order.findOne({ orderid: "order000001" });

			resMock.status(200).json(result);

			assert.match(res.body, {
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

			expect(resMock.body).to.have.property("orderid");
			expect(resMock.body).to.have.property("users");
			expect(resMock.body).to.have.property("shipped");
			expect(resMock.body).to.have.property("date");
			expect(resMock.body).to.have.property("totalcost");
			expect(resMock.status).to.equal(200);
		});
	});
	it("Stub for router order get (one) - Handle Error", async () => {
		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetOneOrder(reqMock, resMock, next);
			assert.isFalse(next(new Error()));
			// sinon.assert.called(next);

			// Qui 05/10

			// resMock.status(500).json({
			// 	message: `Error in searching order`
			// });
		});
	});

	after(() => {
		router.get.restore();
		stubOrderFindOne.restore();
	});
});

describe("Stub router order Get One - Order not found", async () => {
	const testOrderGet = "order000001";
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{ params: testOrderGet },
			{
				message: `${testOrderGet} not exists`
			},
			null
		);
	});
	it("Stub for order router get (one) - order not found", async () => {
		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);

			sinon.assert.calledWith(router.get, `/orders-archieve/${testOrderGet}`);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			stubGetOneOrder(reqMock, resMock, next);

			stubOrderFindOne.withArgs({ orderid: testOrderGet }).returns(null);
			const existence = await Order.findOne({ orderid: testOrderGet });
			resMock.status(200).json({
				message: `order000001 not exists`
			});
		});
	});
	it("Stub for router order get (one) - Handle Error", async () => {
		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetOneOrder(null, null, next);
		});
	});

	after(() => {
		stubOrderFindOne.restore();
		router.get.restore();
	});
});

// forse reinserire -->
describe("Stub router order Get One - Error", async () => {
	const testOrderGet = "order000001";
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{ params: testOrderGet },
			{
				message: `Error in searching order`
			},
			null
		);
	});
	it("Stub for order router get (one) - Error", async () => {
		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(500);

			sinon.assert.calledWith(router.get, `/orders-archieve/${testOrderGet}`);

			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetOneOrder(reqMock, resMock, new Error());
			resMock.status(500).json({
				message: `Error in searching order`
			});
		});
	});
	it("Stub for router order get (one) - Handle Error", async () => {
		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
			// expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetOneOrder(null, null, next);
		});
	});

	after(() => {
		stubOrderFindOne.restore();
		router.get.restore();
	});
});

// QUI

const stubpostOneOrder = sinon.stub(postOneOrder);

const userUpdaterStubExt = sinon.createStubInstance(UserUpdaterClass);

const prodUpStubExt = sinon.createStubInstance(ProductUpdaterClass);

describe("Stub router order Post - user not exists", async () => {
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: {
					orderid: "order00001",
					users: [
						{
							username: "User23",
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
					shipped: false
				}
			},
			{ message0: "User23 not exist." },
			null
		);
	});
	it("Stub for order router post - user not exists", async () => {
		router.post("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			stubpostOneOrder(reqMock, resMock, next);

			userUpdaterStubExt.findData = stubUserFindOne
				.withArgs({ username: "User23" })
				.returns([
					{
						name: "User23",
						data: null
					}
				]);

			userUpdaterStubExt.usersExistCheck = sinon
				.stub()
				.returns({ message0: "User23 not exist." });

			userUpdaterStubExt.updateAccountsNewOrder = sinon.stub().returns(null);
			userUpdaterStubExt.updateAccountsDelOrder = sinon.stub().returns(null);

			const userUpdater = new UserUpdaterClass();

			userUpdaterStubExt.data = req.body;
			userUpdaterStubExt.userModel = User;
			userUpdaterStubExt.orderModel = Order;
			userUpdaterStubExt.response = res;

			userUpdaterStubExt.findData();
			userUpdaterStubExt.usersExistCheck();

			console.log(userUpdaterStubExt.usersExistCheck());

			resMock.status(200).json({ message0: "User23 not exist." });

			expect("Content-Type", /json/);
			expect(200);
			assert.match(res, { message0: "User23 not exist." });
			expect(res).to.have.property("message0");

			// userUpdaterStubExt.findData.restore();
			// userUpdaterStubExt.usersExistCheck.restore();
			// stubpostOneOrder.restore();

			// userUpdaterStub.findData().restore();
			// await userUpdaterStub.usersExistCheck().restore();
			// stubpostOneOrderTest.restore();

			// userUpdaterStub.restore();
		});
	});
	it("Stub for router order post - Handle Error", async () => {
		router.post(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubpostOneOrder(null, null, next);
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
				body: {
					orderid: "order000001",
					users: [
						{
							username: "User1",
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
					shipped: false
				}
			},
			{
				body: {
					message: "OrderId already exists"
				}
			},
			null
		);
	});

	it("Stub for order router post - order just exists", async () => {
		router.post("/orders-archieve/", async (req, res, next) => {
			sinon.assert.calledWith(router.post, "/orders-archieve/");

			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			stubpostOneOrder(reqMock, resMock, next);

			userUpdaterStubExt.data = req.body;
			userUpdaterStubExt.userModel = User;
			userUpdaterStubExt.orderModel = Order;
			userUpdaterStubExt.response = res.body;

			userUpdaterStubExt.findData = sinon.stub().returns([
				{
					name: "User1",
					data: stubUserFindOne.withArgs({ username: "User1" }).returns({
						firstname: "UserFromInsomnia",
						lastname: "from req.body",
						username: "User1",
						address: "test@request.com",
						orders: [
							{
								orderid: "00001",
								url: "none"
							}
						]
					})
				}
			]);

			userUpdaterStubExt.usersExistCheck = sinon.stub().returns({});

			userUpdaterStubExt.updateAccountsNewOrder = sinon.stub().returns(null);
			userUpdaterStubExt.updateAccountsDelOrder = sinon.stub().returns(null);

			userUpdaterStubExt.findData();
			userUpdaterStubExt.usersExistCheck();

			console.log(userUpdaterStubExt.usersExistCheck());

			const userUpdater = new UserUpdaterClass();

			prodUpStubExt.orderExistsCheck = stubOrderFindOne
				.withArgs({ orderid: "order000001" })
				.returns({
					message: "OrderId already exists"
				});

			prodUpStubExt.searchProd = sinon.stub().returns(null);
			prodUpStubExt.createResults = sinon.stub().returns(null);
			prodUpStubExt.createNewOrder = sinon.stub().returns(null);
			prodUpStubExt.restoreQuantities = sinon.stub().returns(null);

			const prodUpManager = new ProductUpdaterClass();

			prodUpStubExt.data = req.body;
			prodUpStubExt.productModel = Product;
			prodUpStubExt.orderModel = Order;
			prodUpStubExt.response = res.body;

			userUpdaterStubExt.findData();
			userUpdaterStubExt.usersExistCheck();

			prodUpStubExt.orderExistsCheck();

			resMock.status(200).json({
				message: "OrderId already exists"
			});

			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.match(res.body, {
				message: "OrderId already exists"
			});
			expect(res.body).to.have.property("message");
			assert.strictEqual(res.body, {
				message: "OrderId already exists"
			});

			// prodUpStubExt.orderExistsCheck.restore();

			// userUpdaterStubExt.restore();
			// userUpdaterStubExt.findData.restore();
			// userUpdaterStubExt.usersExistCheck.restore();
			// prodUpStubExt.orderExistsCheck.restore();
		});
	});
	it("Stub for router order post - Handle Error", async () => {
		router.post(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();

			stubpostOneOrder(null, null, next);
			// res.status(404).json({ message: "Problem occured" });
		});
	});
	after(() => {
		stubOrderFindOne.restore();
		router.post.restore();
	});
});

describe("Stub router order Post - not enought products", async () => {
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: {
					orderid: "order000099",
					users: [
						{
							username: "User1",
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
					shipped: false
				}
			},
			{ message0: "Too little quantity of Watermelon" },
			null
		);
	});
	it("Stub for order router post - not enought products", async () => {
		router.post("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			// stubpostOneOrder(reqMock, resMock, next);

			userUpdaterStubExt.data = req.body;
			userUpdaterStubExt.userModel = User;
			userUpdaterStubExt.orderModel = Order;
			userUpdaterStubExt.response = res;

			userUpdaterStubExt.findData = sinon.stub().returns([
				{
					name: "User1",
					data: stubUserFindOne.withArgs({ username: "User1" }).returns({
						firstname: "UserFromInsomnia",
						lastname: "from req.body",
						username: "User1",
						address: "test@request.com",
						orders: []
					})
				}
			]);
			userUpdaterStubExt.usersExistCheck = sinon.stub().returns({});

			userUpdaterStubExt.updateAccountsNewOrder = sinon.stub().returns(null);
			userUpdaterStubExt.updateAccountsDelOrder = sinon.stub().returns(null);

			const userUpdater = new UserUpdaterClass();

			prodUpStubExt.data = req.body;
			prodUpStubExt.productModel = Product;
			prodUpStubExt.orderModel = Order;
			prodUpStubExt.response = res;

			prodUpStubExt.orderExistsCheck = stubOrderFindOne
				.withArgs({ orderid: "order000099" })
				.returns(null);

			prodUpStubExt.searchProd = sinon.stub().callsFake(function fn() {
				prodUpStubExt.permissions = [];
				for (let item of prodUpStubExt.data["users"]) {
					prodUpStubExt.prodsToUpArray = [];
					stubProductFindOne.restore();

					stubProductFindOne
						.withArgs({
							name: "Watermelon"
						})
						.returns({
							name: "Watermelon",
							quantity: 0,
							origin: "Italy",
							price: 10.23
						});
					const testOne = Product.findOne({
						name: "Watermelon"
					});

					stubProductFindOne
						.withArgs({
							name: "Strawberries"
						})
						.returns({
							name: "Strawberries",
							quantity: 230,
							origin: "Italy",
							price: 10.23
						});
					const testTwo = Product.findOne({
						name: "Strawberries"
					});
					console.log(testOne);
					console.log(testTwo);

					prodUpStubExt.prodsToUpArray[0] = {
						name: "Watermelon",
						quantity: 0,
						origin: "Italy",
						price: 10.23
					};
					prodUpStubExt.prodsToUpArray[1] = {
						name: "Strawberries",
						quantity: 230,
						origin: "Italy",
						price: 10.23
					};
				}
				prodUpStubExt.permissions.push({
					productname: "Watermelon",
					response: "negative",
					message: "Too little quantity of Watermelon"
				});
				prodUpStubExt.permissions.push({
					productname: "Strawberries",
					response: "positive",
					quantity: 23
				});
				return prodUpStubExt.permissions;
			});

			prodUpStubExt.createResults = sinon.stub().returns({
				message: "Too little quantity of Watermelon"
			});

			prodUpStubExt.createNewOrder = sinon.stub().returns(null);

			prodUpStubExt.restoreQuantities = sinon.stub().returns(null);

			const prodUpManager = new ProductUpdaterClass();

			// console.log(prodUpStubExt);

			userUpdaterStubExt.findData();
			userUpdaterStubExt.usersExistCheck();

			prodUpStubExt.orderExistsCheck();
			prodUpStubExt.searchProd();
			// console.log(prodUpStubExt.searchProd());
			// prodUpStubExt.createResults();
			// prodUpStubExt.createNewOrder();
			// prodUpStubExt.restoreQuantities();

			// ------

			resMock
				.status(200)
				.json({ message0: "Too little quantity of Watermelon" });

			expect("Content-Type", /json/);
			expect(200);
			assert.match(res, {
				message0: `Too little quantity of Watermelon`
			});
			prodUpStubExt.orderExistsCheck.restore();
		});
	});
	it("Stub for router order post - Handle Error", async () => {
		router.post(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubpostOneOrder(null, null, next);
		});
	});

	after(() => {
		stubOrderFindOne.restore();
		router.post.restore();
	});
});

describe("Stub router order Post", async () => {
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: {
					orderid: "order000098",
					users: [
						{
							username: "User1",
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
					shipped: false
				}
			},
			{
				orderid: "order000001",
				users: [
					{
						username: "User1",
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
			null
		);
		// stub.onCall(0).returns() - ?
	});
	it("Stub for order router post", async () => {
		router.post("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			stubpostOneOrder(reqMock, resMock, next);

			userUpdaterStubExt.data = req.body;
			userUpdaterStubExt.userModel = User;
			userUpdaterStubExt.orderModel = Order;
			userUpdaterStubExt.response = res;

			userUpdaterStubExt.findData = sinon.stub().returns([
				{
					name: "User1",
					data: stubUserFindOne.withArgs({ username: "User1" }).returns({
						firstname: "UserFromInsomnia",
						lastname: "from req.body",
						username: "User1",
						address: "test@request.com",
						orders: []
					})
				}
			]);
			userUpdaterStubExt.usersExistCheck = sinon.stub().returns({});

			userUpdaterStubExt.updateAccountsNewOrder = sinon.stub().returns(
				stubUserFindUp
					.withArgs(
						{ username: "User1" },
						{
							orders: [
								{
									orderid: "000098",
									url: "none"
								}
							]
						}
					)
					.returns({
						firstname: "UserFromInsomnia",
						lastname: "from req.body",
						username: "User1",
						address: "test@request.com",
						orders: [
							{
								orderid: "order000098",
								url: "none"
							}
						]
					})
			);
			userUpdaterStubExt.updateAccountsDelOrder = sinon.stub().returns(null);

			const userUpdater = new UserUpdaterClass();

			prodUpStubExt.orderExistsCheck = stubOrderFindOne
				.withArgs({ orderid: "order000098" })
				.returns(null);

			prodUpStubExt.searchProd = sinon.stub().returns([
				{ productname: "Watermelon", response: "positive", quantity: 23 },
				{ productname: "Strawberries", response: "positive", quantity: 23 }
			]);

			prodUpStubExt.createResults = sinon.stub().callsFake(function fakeFive() {
				stubProductFindUp
					.withArgs({ name: "Watermelon" }, { quantity: 23 })
					.returns({
						name: "Watermelon",
						quantity: 123,
						origin: "Italy",
						price: 10.23
					});
				stubProductFindUp
					.withArgs({ name: "Strawberries" }, { quantity: 23 })
					.returns({
						name: "Strawberries",
						quantity: 123,
						origin: "Italy",
						price: 10.23
					});
			});

			prodUpStubExt.createNewOrder = sinon.stub().returns(0);
			prodUpStubExt.restoreQuantities = sinon.stub().returns(null);

			const prodUpManager = new ProductUpdaterClass();

			prodUpStubExt.data = req.body;
			prodUpStubExt.productModel = Product;
			prodUpStubExt.orderModel = Order;
			prodUpStubExt.response = res;

			// prodUpStubExt.orderExistsCheck();
			// prodUpStubExt.searchProd();
			// prodUpStubExt.createResults();
			// prodUpStubExt.createNewOrder();
			// prodUpStubExt.restoreQuantities();

			// -------

			userUpdaterStubExt.findData();
			userUpdaterStubExt.usersExistCheck();
			prodUpStubExt.orderExistsCheck();

			prodUpStubExt.searchProd();
			// console.log(t);

			prodUpStubExt.createResults();
			prodUpStubExt.createNewOrder();

			userUpdaterStubExt.updateAccountsNewOrder();

			// await prodUpStub.restoreQuantities();

			// userUpdaterStub.updateAccountsDelOrder();

			resMock.status(200).json({
				orderid: "order000098",
				users: [
					{
						username: "User1",
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

			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.match(res, {
				orderid: "order000098",
				users: [
					{
						username: "User1",
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
			// expect(res).to.have.property("orderid");
			// expect(res).to.have.property("users");
			// expect(res).to.have.property("shipped");
			// expect(res).to.have.property("date");
			// expect(res).to.have.property("totalcost");

			// stubpostOneOrder.restore();

			// stubMethod.restore();
		});
	});

	it("Stub for router order post - Handle Error", async () => {
		router.post(`/orders-archieve/`, async (req, res, next) => {
			expect(404);
			const reqMock = mockReq(req);
			const resMock = new Error();

			stubpostOneOrder(null, null, next);
			resMock.status(404).json({ message: "Problem occured" });
		});
	});

	after(() => {
		// stubUserFindOne.restore();
		router.post.restore();
	});
});

describe("Stub router order Post - Problem Occured", async () => {
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: {
					orderid: "order000097",
					shipped: false
				}
			},
			{ message: "Problem occured" },
			null
		);
	});

	it("Stub for router order post - Problem Occured", async () => {
		router.post(`/orders-archieve/`, async (req, res, next) => {
			expect(404);
			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			stubpostOneOrder(reqMock, resMock, next);
			resMock.status(404).json({ message: "Problem occured" });
		});
	});

	after(() => {
		router.post.restore();
	});
});

const stubPutOneOrder = sinon.stub(putOneOrder);

describe("Stub router order Put", async () => {
	const testOrderPut = "order00001";
	const newShipStatus = true;
	before(() => {
		const stub = sinon.stub(router, "put").yields(
			{ params: testOrderPut },
			{
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
			},
			null
		);
	});
	it("Stub for order router put", async () => {
		router.put(`/orders-archieve/${testOrderPut}`, async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			stubPutOneOrder(reqMock, resMock, next);

			const stubUserFindUp = sinon
				.stub(Order, "findOneAndUpdate")
				.withArgs({ orderid: testOrderPut })
				.returns({
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
				});
			const result = await User.findOneAndUpdate(
				{ orderid: testOrderPut },
				{
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
				}
			);

			// testing
			resMock.status(200).json(result);
			// testing

			expect(res).to.have.property("orderid");
			expect(res).to.have.property("users");
			expect(res).to.have.property("shipped");
			expect(res).to.have.property("date");
			expect(res).to.have.property("totalcost");
			expect(resMock.status).to.equal(200);
		});
	});
	it("Stub for router order put - Handle Error", async () => {
		router.put(`/orders-archieve/${testOrderPut}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubPutOneOrder(reqMock, resMock, next);
		});
	});

	after(() => {
		router.put.restore();
	});
});

const stubDeleteOneOrder = sinon.stub(deleteOneOrder);

describe("Stub router order Delete One", async () => {
	const testOrderDelete = "order000098";

	before(() => {
		const stub = sinon.stub(router, "delete").yields(
			{ params: testOrderDelete },
			{
				message: "Order delete."
			},
			null
		);
	});

	it("Stub for order router delete", async () => {
		router.delete(
			`/orders-archieve/${testOrderDelete}`,
			async (req, res, next) => {
				const reqMock = mockReq(req);
				const resMock = mockRes(res);
				stubDeleteOneOrder(reqMock, resMock, next);

				const stubOrderFindDel = sinon
					.stub(Order, "findOneAndDelete")
					.withArgs({
						orderid: "order000098"
					})
					.returns({
						orderid: "order000098",
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
					});
				const orderRemoved = await Order.findOneAndDelete({
					orderid: "order000098"
				});
				console.log(orderRemoved);

				const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
					findData: sinon.stub().returnsThis(),
					usersExistCheck: sinon.stub().returnsThis(),
					updateAccountsNewOrder: sinon.stub().returns(null),
					updateAccountsDelOrder: sinon.stub().returnsThis()
				});

				const userUpdater = new UserUpdaterClass();

				userUpdater.data = orderRemoved;
				userUpdater.userModel = User;
				userUpdater.orderModel = Order;
				userUpdater.response = res;

				const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
					orderExistsCheck: sinon.stub().returnsThis(),
					searchProd: sinon.stub().returnsThis(),
					createResults: sinon.stub().returnsThis(),
					createNewOrder: sinon.stub().returnsThis(),
					restoreQuantities: sinon.stub().returnsThis()
				});

				const prodUdManager = new ProductUpdaterClass();

				prodUdManager.data = orderRemoved;
				prodUdManager.productModel = Product;
				prodUdManager.orderModel = Order;
				prodUdManager.response = res;

				userUpdater.findData();
				userUpdater.usersExistCheck();
				userUpdater.updateAccountsNewOrder();
				userUpdater.updateAccountsDelOrder();

				prodUdManager.orderExistsCheck();
				prodUdManager.searchProd();
				prodUdManager.createResults();
				prodUdManager.createNewOrder();
				prodUdManager.restoreQuantities();

				// for (let orders of userUpdater.fieldsToUpdate) {

				// }
				resMock.status(200).json({
					message: "Order delete."
				});

				// console.log(result);

				expect("Content-Type", /json/);
				expect(200);

				expect(res).to.have.property("message");
			}
		);
	});
	it("Stub for router order delete - Handle Error", async () => {
		router.delete(
			`/orders-archieve/${testOrderDelete}`,
			async (req, res, next) => {
				expect(500);
				const reqMock = mockReq(req);
				const resMock = new Error();
				stubDeleteOneOrder(reqMock, resMock, next);
			}
		);
	});

	after(() => {
		router.delete.restore();
	});
});

// // ----------- Order tests
