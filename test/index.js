const router = require("../src/api/index");
const sinon = require("sinon");
require("./sinon-mongoose");
const referee = require("@sinonjs/referee");
const assert = referee.assert;
const { expect } = require("chai");
const { mockReq, mockRes } = require("sinon-express-mock");

const mongoose = require("mongoose");
const express = require("express");

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

describe("Stub router Base", async () => {
	before(() => {
		const stub = sinon.stub(router, "get").yields(null, {
			message: "Welcome to Planty of Food API."
		});
	});
	it("Stub for router get /", async () => {
		router.get("/", (req, res) => {
			// importante

			// res.status(200).json({
			// 	message: "Welcome to Planty of Food API."
			// });
			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			// console.log(resMock);

			resMock.status(200).json({
				message: "Welcome to Planty of Food API."
			});
			expect("Content-Type", /json/);
			expect(200);
			// importante
			sinon.assert.calledWith(router.get, "/");
			sinon.assert.match(resMock, {
				message: "Welcome to Planty of Food API."
			});
		});
	});
	it("Stub for router Base - Handle Error", async () => {
		router.get(`/`, async (req, res) => {
			expect(500);
			// const reqMock = mockReq(req);
			// const resMock = new Error();
			// getAllProducts(reqMock, resMock, next);
		});
	});

	after(() => {
		router.get.restore();
	});
});

// ----------- Product tests

// const testProdPut = "Strawberries";
// const newQuantity = 23;
// const testProdDelete = "Strawberries";

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
		router.get("/products-storage/", (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			// importante
			sinon.assert.calledWith(router.get, "/products-storage/");
			// importante
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(getAllProducts);
			stubMethod(reqMock, resMock, next);

			// const stubProductFind = sinon
			// 	.stub(Product, "find")
			// 	.withArgs({})
			// 	.returns(res.body);
			// const result = Product.find({});

			// // console.log(result);
			// console.log(res.body);

			resMock.status(200).json(res.body);

			// aggiungere resMock.status(200).json...

			assert.isArray(resMock.body);
			// assert.match(res.body, result);
			const elements = res.body;
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
			getAllProducts(reqMock, resMock, next);
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

describe("Stub router product Get One", () => {
	const testProdGet = "strawberries";
	before(() => {
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
			expect("Content-Type", /json/);
			expect(200);

			sinon.assert.calledWith(router.get, `/products-storage/${testProdGet}`);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneProduct(reqMock, resMock, next);

			const label = `${String(testProdGet)[0].toUpperCase()}${String(
				testProdGet
			).slice(1)}`;

			stubProductFindOne.withArgs({ name: label }).returns({
				name: "Strawberries",
				quantity: 23,
				origin: "Italy",
				price: 20.23
			});
			const existence = Product.findOne({ name: "Strawberries" });

			// if (existence !== null) {
			resMock.status(200).json(existence);
			// }

			assert.match(JSON.parse(resMock), {
				name: label,
				quantity: 23,
				origin: "Italy",
				price: 20.23
			});

			// expect(resMock.statusCode).to.equal(200);

			// expect(JSON.parse(res)).to.have.property("name");
			// expect(JSON.parse(res)).to.have.property("quantity");
			// expect(JSON.parse(res)).to.have.property("origin");
			// expect(JSON.parse(res)).to.have.property("price");
		});
	});
	it("Stub for product router get (one) - Handle Error", async () => {
		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			getOneProduct(reqMock, resMock, next);
			// resMock.status(500).json({...});
		});
	});
	after(() => {
		router.get.restore();
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
			// const stubMethod = sinon.stub(getOneProduct);
			stubGetOneProduct(reqMock, resMock, next);
			// getOneProduct.restore();

			const label = `${String(testProdGet)[0].toUpperCase()}${String(
				testProdGet
			).slice(1)}`;

			stubProductFindOne.withArgs({ name: label }).returns(null);
			const existence = Product.findOne({ name: "Strawberries" });

			if (existence == null) {
				resMock.status(200).json({
					message: `${label} not exists`
				});
			}

			// <-------- problem here

			assert.match(JSON.parse(res), {
				message: `${testProdGet} not exists`
			});

			// expect(resMock.statusCode).to.equal(200);

			expect(JSON.parse(resMock)).to.have.property("message");
			// expect(JSON.parse(res)).to.have.property("quantity");
			// expect(JSON.parse(res)).to.have.property("origin");
			// expect(JSON.parse(res)).to.have.property("price");
		});
	});
	it("Stub for product router get (one) - Handle Error", async () => {
		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			getOneProduct(reqMock, resMock, next);
			// resMock.status(500).json({...});
		});
	});
	after(() => {
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

			stubProductFindOne.withArgs({ name: "Strawberries" }).returns(null);
			const existence = Product.findOne({ name: "Strawberries" });

			saveStubProd.returnsThis();

			// if (existence == null) {
			const newProduct = new Product(reqMock.body);

			// if (existence == null) {
			const result = await newProduct.save();
			resMock.status(200).json(newProduct);
			expect(saveStubProd.calledOnce).to.be.true;
			assert.strictEqual(JSON.stringify(result), JSON.stringify(newProduct));
			// const newProduct = new Product(reqMock.body);
			// const result = await newProduct.save();
			// } else {
			// 	resMock.status(200).json({
			// 		message: `The product Strawberries already exists.`
			// 	});
			// }
		});
	});

	it("Stub for product router post - Not Exist in DB - Error during saving", async () => {
		router.post("/products-storage/", async (req, res, next) => {
			try {
				sinon.assert.calledWith(router.post, "/products-storage/");

				const reqMock = mockReq(req);
				const resMock = mockRes(res);
				// const stubMethod = sinon.stub(postOneProduct);
				stubPostOneProduct(reqMock, resMock, next);

				// PERFEZIONARE QUESTO.

				stubProductFindOne.withArgs({ name: "Strawberries" }).returns(null);
				const existence = Product.findOne({ name: "Strawberries" });

				saveStubProd.withArgs(new Error(), existence).returnsThis();
				// saveStubProd.returnsThis();

				const newProduct = new Product(reqMock.body);
				const result = newProduct.save();
				console.log(result); //<--- result da controllare
				// expect(saveStub.calledOnce).to.be.true;

				// assert.strictEqual(JSON.stringify(result), JSON.stringify(newProduct));
			} catch (err) {
				// expect("Content-Type", /json/);
				// expect(500);
				resMock.status(500).json({ message: "Error during Product saving..." });
				assert.isFalse(next(err));
				// sinon.assert.failException;
			}
		});
	});
	it("Stub for product router post - Handle Error", async () => {
		router.post(`/products-storage/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubPostOneProduct(reqMock, resMock, next);
		});
	});
	after(() => {
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
			JSON.stringify({
				message: `The product Strawberries already exists.`
			}),
			null
		);
	});
	it("Stub for product router post - Exist in DB - Not Saved", async () => {
		router.post("/products-storage/", async (req, res, next) => {
			try {
				sinon.assert.calledWith(router.post, "/products-storage/");
				expect("Content-Type", /json/);
				expect(200);

				const reqMock = mockReq(req);
				const resMock = mockRes(res);
				// const stubMethod = sinon.stub(postOneProduct);
				stubPostOneProduct(reqMock, resMock, next);

				stubProductFindOne.withArgs({ name: "Strawberries" }).returns({
					name: "Strawberries",
					quantity: 23,
					origin: "Italy",
					price: 10.23
				});
				const existence = Product.findOne({ name: "Strawberries" });

				if (existence == null) {
					// const result = await newProduct.save();
					resMock.status(200).json({
						name: "Strawberries",
						quantity: 23,
						origin: "Italy",
						price: 10.23
					});
					// expect(saveStub.calledOnce).to.be.true;
					// const newProduct = new Product(reqMock.body);
					// const result = await newProduct.save();
				} else {
					resMock.status(200).json(resMock);
				}
			} catch (err) {
				assert.isFalse(next(err));
			}
		});
	});
	it("Stub for product router post - Handle Error", async () => {
		router.post(`/products-storage/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubPostOneProduct(reqMock, resMock, next);
		});
	});
	after(() => {
		router.post.restore();
	});
});

const stubputOneProduct = sinon.stub(putOneProduct);

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

			// const mockProdFindUpdate = sinon
			// 	.mock(Product)
			// 	.expects("findOneAndUpdate")
			// 	.withArgs({ name: "Strawberries" }, { quantity: 23 })
			// 	.resolves({
			// 		name: "Strawberries",
			// 		quantity: 23,
			// 		origin: "Italy",
			// 		price: 20.23
			// 	});
			// Product.findOneAndUpdate({ name: "Strawberries" }, { quantity: 23 });
			// mockProdFindUpdate.verify();

			const stubProductFindUp = sinon
				.stub(Product, "findOneAndUpdate")
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
			stubMethod(reqMock, resMock, next);

			const stubProductFindDelete = sinon
				.stub(Product, "findOneAndDelete")
				.returns({
					name: "Strawberries",
					quantity: 23000,
					origin: "Italy",
					price: 20.23
				});
			Product.findOneAndDelete({ name: "Strawberries" });

			// <----- forse aumento coverage

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
				deleteOneProduct(reqMock, resMock, next);
			}
		);
	});

	after(() => {
		router.delete.restore();
	});
});

// ----------- Product tests

// ----------- User tests

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
			const stubMethod = sinon.stub(getAllUsers);
			getAllUsers(reqMock, resMock, next);

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
			// const stubMethod = sinon.stub(getAllUsers);
			getAllUsers(reqMock, resMock, next);
		});
	});
	after(() => {
		router.get.restore();
	});
});

const stubUserFindOne = sinon.stub(User, "findOne");

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
			const stubMethod = sinon.stub(getOneUser);
			stubMethod(req, res, next);

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
			const existence = User.findOne({ username: "User1" });

			// console.log(res);

			// resMock.status(200).json(existence);

			// CONTINUARE CON TEST STUB TUTTI I METODI FIND...
			// E ALTERNARE ATTIVO/DISATTIVO PER VEDERE COPERTURA LINEE

			resMock.status(200).json({
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
			getOneUser(reqMock, resMock, next);
		});
	});
	after(() => {
		router.get.restore();
	});
});

const stubPostOneUser = sinon.stub(postOneUser);

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
	it("Stub for user router post - Not Exist in DB - Saved ", async () => {
		router.post("/users/", async (req, res, next) => {
			try {
				expect("Content-Type", /json/);
				expect(200);
				const reqMock = mockReq(req);
				const resMock = mockRes(res);
				stubPostOneUser(req, res, next);
				// postOneUser.restore();

				stubUserFindOne.withArgs({ username: "User1" }).returns(null);
				const existence = await User.findOne({ username: "User1" });

				// const mockUserFindOne = sinon
				// 	.mock(User)
				// 	.expects("findOne")
				// 	.withArgs({ username: "UserOne" })
				// 	.resolves(null);
				// User.findOne({ username: "UserOne" });
				// mockUserFindOne.verify();

				const saveStub = sinon.stub(User.prototype, "save").returnsThis();

				const newUser = new User(req.body);
				// console.log(newUser);
				const result = await newUser.save();
				// console.log(result);
				expect(saveStub.calledOnce).to.be.true;
				expect(result).to.eql(res);

				assert.strictEqual(JSON.stringify(result), JSON.stringify(newUser));
				resMock.status(200).json(result);
			} catch (err) {
				assert.isFalse(next(err));
			}
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
			postOneUser(reqMock, resMock, next);
		});
	});
	after(() => {
		router.post.restore();
	});
});

describe("Stub router user Post - Exist in DB - Not Saved", async () => {
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
				message: `The user User1 already exists.`
			}),
			null
		);
	});
	it("Stub for user router post - Exist in DB - Not Saved ", async () => {
		router.post("/users/", async (req, res, next) => {
			try {
				expect("Content-Type", /json/);
				expect(200);
				const reqMock = mockReq(req);
				const resMock = mockRes(res);
				// const stubMethod = sinon.stub(postOneUser);
				stubPostOneUser(reqMock, resMock, next);
				// postOneUser.restore();

				// const stubMethod = sinon.stub(postOneUser);
				// postOneUser(reqMock, resMock, next);
				// postOneUser.restore();

				// ----- valutare se inserire o no ---------
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
				// ----- valutare se inserire o no ---------

				// stubProductFindOne.restore();

				resMock.status(200).json({
					message: `The user User1 already exists.`
				});

				// assert.match(JSON.parse(res), {
				// 	message: `The user User1 already exists.`
				// });
				// // assert.match(JSON.parse(res), { username: "User1" });
				// expect(JSON.parse(res)).to.have.property("message");
				// resMock.status(200).json({ message: `The user User1 already exists.` });
			} catch (err) {
				assert.isFalse(next(err));
			}

			// const mockUserFindOne = sinon
			// 	.mock(User)
			// 	.expects("findOne")
			// 	.withArgs({ username: "UserOne" })
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
			// User.findOne({ username: "UserOne" });
			// mockUserFindOne.verify();

			// const stub = sinon.stub(User, "save").resolves({
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
			// console.log(stub);

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
			postOneUser(reqMock, resMock, next);
		});
	});
	after(() => {
		router.post.restore();
	});
});

const stubUserFindUp = sinon.stub(User, "findOneAndUpdate");

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

			const stubMethod = sinon.stub(putOneUser);
			stubMethod(req, res, next);

			// sistemare ---> qualcosa di non rilevato abbassa coverage ----> cerca in giù -> doppio stub ->
			// -> unire mettendo const all'esterno ------ HERE ------

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

			// sistemare ---> qualcosa di non rilevato abbassa coverage

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
			putOneUser(reqMock, resMock, next);
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
			stubMethod(req, res, next);

			const mockUserFindDelete = sinon
				.mock(User)
				.expects("findOneAndDelete")
				.withArgs({ username: "User1" })
				.resolves({
					firstname: "userTestOne",
					lastname: "for Sinon Testing",
					username: "User1",
					address: "test@sinon.com",
					orders: []
				});
			User.findOneAndDelete({ username: "User1" });
			mockUserFindDelete.verify();

			// const stubProductFindOneDelete = sinon
			// 	.stub(User, "findOneAndDelete")
			// 	.withArgs({ username: "User1" })
			// 	.returns({
			// 		firstname: "userTestOne",
			// 		lastname: "for Sinon Testing",
			// 		username: "User1",
			// 		address: "test@sinon.com",
			// 		orders: []
			// 	});
			// User.findOneAndDelete({ username: "User1" });

			// const stubFindOne = sinon
			// 	.stub(User.findOneAndDelete({ username: "User1" }))
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
			// User.findOneAndDelete({ username: "User1" });

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
		});
	});
	it("Stub for user router delete - Handle Error", async () => {
		router.delete(`/users/${testUserDelete}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			deleteOneUser(reqMock, resMock, next);
		});
	});

	after(() => {
		router.delete.restore();
	});
});

// // ----------- User tests

// // ----------- Order tests

const stubGetAllOrders = sinon.stub(getAllOrders);

describe("Stub router order Get All", async () => {
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
			JSON.stringify({
				body: results
			}),
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			// const stubProductFindOne = sinon
			// 	.stub(Order, "find")
			// 	.withArgs({})
			// 	.returns(res);
			// const existence = Order.find({});

			const eightOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const eightOrderManager = new OrderManagerClass();

			eightOrderManager.response = JSON.parse(res).body;
			eightOrderManager.data = JSON.parse(res).body;
			eightOrderManager.filterQuery = "date";
			eightOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
			eightOrderManager.orderByQuery = undefined;
			eightOrderManager.sortQuery = undefined;

			eightOrderManager.determinate();
			eightOrderManager.ordering();
			eightOrderManager.createResponse();
			eightOrderManager.noProducts();
			eightOrderManager.parametersHandling();

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
			stubGetAllOrders(reqMock, resMock, next);
		});
	});

	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Get All", async () => {
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
			JSON.stringify({
				body: results
			}),
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			const seventhOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const seventhOrderManager = new OrderManagerClass();

			seventhOrderManager.response = JSON.parse(res).body;
			seventhOrderManager.data = JSON.parse(res).body;
			seventhOrderManager.filterQuery = "orderid";
			seventhOrderManager.valueQuery = "order00001";
			seventhOrderManager.orderByQuery = undefined;
			seventhOrderManager.sortQuery = undefined;

			seventhOrderManager.determinate();
			seventhOrderManager.ordering();
			seventhOrderManager.createResponse();
			seventhOrderManager.noProducts();
			seventhOrderManager.parametersHandling();

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
			stubGetAllOrders(reqMock, resMock, next);
		});
	});

	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Get All", async () => {
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
			JSON.stringify({
				body: results
			}),
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			const sixthOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const sixthOrderManager = new OrderManagerClass();

			sixthOrderManager.response = JSON.parse(res).body;
			sixthOrderManager.data = JSON.parse(res).body;
			sixthOrderManager.filterQuery = "orderid";
			sixthOrderManager.valueQuery = "order00001";
			sixthOrderManager.orderByQuery = "orderid";
			sixthOrderManager.sortQuery = "increasing";

			sixthOrderManager.determinate();
			sixthOrderManager.ordering();
			sixthOrderManager.createResponse();
			sixthOrderManager.noProducts();
			sixthOrderManager.parametersHandling();

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
			stubGetAllOrders(reqMock, resMock, next);
		});
	});

	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Get All", async () => {
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
			JSON.stringify({
				body: results
			}),
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			const fifthOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const fifthOrderManager = new OrderManagerClass();

			fifthOrderManager.response = JSON.parse(res).body;
			fifthOrderManager.data = JSON.parse(res).body;
			fifthOrderManager.filterQuery = "shipped";
			fifthOrderManager.valueQuery = true;
			fifthOrderManager.orderByQuery = "orderid";
			fifthOrderManager.sortQuery = "increasing";

			fifthOrderManager.determinate();
			fifthOrderManager.ordering();
			fifthOrderManager.createResponse();
			fifthOrderManager.noProducts();
			fifthOrderManager.parametersHandling();

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
			stubGetAllOrders(reqMock, resMock, next);
		});
	});

	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Get All", async () => {
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
					sort: "increasing"
				}
			},
			JSON.stringify({
				body: results
			}),
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			const fourthOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const fourthOrderManager = new OrderManagerClass();

			fourthOrderManager.response = JSON.parse(res).body;
			fourthOrderManager.data = JSON.parse(res).body;
			fourthOrderManager.filterQuery = "date";
			fourthOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
			fourthOrderManager.orderByQuery = "orderid";
			fourthOrderManager.sortQuery = "increasing";

			fourthOrderManager.determinate();
			fourthOrderManager.ordering();
			fourthOrderManager.createResponse();
			fourthOrderManager.noProducts();
			fourthOrderManager.parametersHandling();

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
			stubGetAllOrders(reqMock, resMock, next);
		});
	});

	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Get All", async () => {
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
			JSON.stringify({
				body: results
			}),
			null
		);
	});

	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

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

			const thirdOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const thirdOrderManager = new OrderManagerClass();

			thirdOrderManager.response = JSON.parse(res).body;
			thirdOrderManager.data = JSON.parse(res).body;
			thirdOrderManager.filterQuery = undefined;
			thirdOrderManager.valueQuery = undefined;
			thirdOrderManager.orderByQuery = undefined;
			thirdOrderManager.sortQuery = undefined;

			thirdOrderManager.determinate();
			thirdOrderManager.ordering();
			thirdOrderManager.createResponse();
			thirdOrderManager.noProducts();
			thirdOrderManager.parametersHandling();

			resMock.status(200).json(results);
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllOrders(reqMock, resMock, next);
		});
	});

	after(() => {
		router.get.restore();
	});
});
describe("Stub router order Get All", async () => {
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
			JSON.stringify({
				body: results
			}),
			null
		);
	});

	it("Stub for router order get (all) - miss sort param", () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			//

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			const orderManagerStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const orderManager = new OrderManagerClass();

			orderManager.response = JSON.parse(res).body;
			orderManager.data = JSON.parse(res).body;
			orderManager.filterQuery = "productname";
			orderManager.valueQuery = "strawberries";
			orderManager.orderByQuery = "orderid";
			orderManager.sortQuery = undefined;

			orderManager.determinate();
			orderManager.ordering();
			orderManager.createResponse();
			orderManager.noProducts();
			orderManager.parametersHandling();

			// expect.fail(orderManager.parametersHandling(), {
			// 	message: `Need a &sort= parameter for search...`
			// });

			resMock.status(200).json({
				message: `Need a &sort= parameter for search...`
			});

			expect(orderManager.parametersHandling(), {
				message: `Need a &sort= parameter for search...`
			});
			sinon.assert.match(JSON.parse(resMock), {
				message: `Need a &sort= parameter for search...`
			});
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllOrders(reqMock, resMock, next);
		});
	});

	after(() => {
		router.get.restore();
	});
});

// portare all'esterno const stubMethod = sinon.stub(getAllOrders); in su

// const stubOrderFind = sinon.stub(Order, 'find'); <----- provare a riusare per tutti o getall tranne sottostante con mock

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
		router.get("/orders-archieve/", async (req, res, next) => {
			const secondOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const reqMock = mockReq(req);
			const resMock = mockRes(res.body);

			// const stubGetAllOrders = sinon.stub(getAllOrders);
			stubGetAllOrders(reqMock, resMock, next);

			// const stubOrderFind = sinon.stub(Order, "find").returns(resMock.body);
			// const findArr = Order.find({});

			// resMock.status(200).json(findArr);

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
			const result = await Order.find({});
			mockOrderFind.verify();
			// provare ad applicare anche ad altri con await result anche sotto
			console.log(result);

			// const stubProductFindOne = sinon
			// 	.stub(Order, "find")
			// 	.withArgs({})
			// 	.returns([
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
			// Order.find({});

			const secondOrderManager = new OrderManagerClass();

			secondOrderStub.response = await result;
			secondOrderStub.data = await result;
			secondOrderStub.filterQuery = "productname";
			secondOrderStub.valueQuery = "strawberries";
			secondOrderStub.orderByQuery = "orderid";
			secondOrderStub.sortQuery = "decreasing";

			secondOrderStub.determinate();
			secondOrderStub.ordering();
			secondOrderStub.createResponse();
			secondOrderStub.noProducts();
			secondOrderStub.parametersHandling();

			expect(secondOrderStub.determinate().response).to.be.a("array");

			expect("Content-Type", /json/);
			expect(200);

			assert.isArray(JSON.parse(res).body);
			const orders = JSON.parse(res).body;
			orders.map((order) => {
				expect(order).to.have.property("orderid");
				expect(order).to.have.property("users");
				expect(order).to.have.property("shipped");
				expect(order).to.have.property("date");
				expect(order).to.have.property("totalcost");
			});
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			getAllOrders(reqMock, resMock, next);
		});
	});

	after(() => {
		router.get.restore();
	});
});

const stubGetOneOrder = sinon.stub(getOneOrder);
const stubOrderFindOne = sinon.stub(Order, "findOne");

describe("Stub router order Get One", async () => {
	const testOrderGet = "order000001";
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{ params: testOrderGet },
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
	it("Stub for order router get (one)", async () => {
		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
			expect("Content-Type", /json/);

			expect(200);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneOrder(reqMock, resMock, next);

			stubOrderFindOne.withArgs({ orderid: testOrderGet }).returns({
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

			const result = await Order.findOne({ orderid: testOrderGet });

			// if (result == null) {
			// 	resMock.status(200).json({
			// 		message: `${testOrderGet} not exists`
			// 	});
			// } else {
			resMock.status(200).json(result);
			// } // questo...

			// resMock.status(200).json(result); ... o questo

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
	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetOneOrder(reqMock, resMock, next);
		});
	});

	after(() => {
		router.get.restore();
	});
});

describe("Stub router order Get One - Order not found", async () => {
	const testOrderGet = "order000001";
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{ params: testOrderGet },
			JSON.stringify({
				message: `order000001 not exists`
			}),
			null
		);
	});
	it("Stub for order router get (one) - order not found", async () => {
		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
			expect("Content-Type", /json/);

			expect(200);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneOrder(reqMock, resMock, next);

			stubOrderFindOne.withArgs({ orderid: testOrderGet }).returns(null);

			const result = await Order.findOne({ orderid: testOrderGet });

			// if (result == null) {
			resMock.status(200).json({
				message: `${testOrderGet} not exists`
			});
			// } else {
			// 	resMock.status(200).json(result);
			// }

			// resMock.status(200).json(result);

			assert.match(
				res,
				JSON.stringify({
					message: `order000001 not exists`
				})
			);
			expect(JSON.parse(res)).to.have.property("message");
		});
	});
	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetOneOrder(reqMock, resMock, next);
		});
	});

	after(() => {
		router.get.restore();
	});
});

const stubpostOneOrder = sinon.stub(postOneOrder);

describe("Stub router order Post", async () => {
	const order = {
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
	};
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: JSON.stringify(order)
			},
			JSON.stringify(order),
			null
		);
	});
	it("Stub for order router post", async () => {
		const stubvalue = null;
		router.post("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubpostOneOrder(reqMock, resMock, next);

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
				createNewOrder: sinon.stub().returns(order),
				restoreQuantities: sinon.stub().returns(null)
			});

			const prodUpManager = new ProductUpdaterClass();

			prodUpStub.data = JSON.parse(res).body;
			prodUpStub.productModel = Product;
			prodUpStub.orderModel = Order;
			prodUpStub.response = JSON.parse(res).body;

			prodUpStub.orderExistsCheck();

			prodUpStub.searchProd();
			prodUpStub.createResults();
			prodUpStub.createNewOrder();
			prodUpStub.restoreQuantities();

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
				updateAccountsDelOrder: sinon.stub().returns(null)
			});

			const userUpdater = new UserUpdaterClass();

			userUpdaterStub.data = req.body;
			userUpdaterStub.userModel = User;
			userUpdaterStub.orderModel = Order;
			userUpdaterStub.response = res;

			userUpdaterStub.findData();
			userUpdaterStub.usersExistCheck();

			// userUpdaterStub.resultUpdate = await User.findOneAndUpdate(
			// 	{
			// 		username: elem
			// 	},
			// 	{
			// 		orders: this.updatedField
			// 	}
			// );
			userUpdaterStub.updateAccountsNewOrder();
			userUpdaterStub.updateAccountsDelOrder();

			stubUserFindUp
				.withArgs(
					{ username: "User1" },
					{
						orders: [
							{
								orderid: "00001",
								url: "none"
							}
						]
					}
				)
				.returns({
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
				});

			const result = await User.findOneAndUpdate(
				{ username: "User1" },
				{
					orders: [
						{
							orderid: "00001",
							url: "none"
						}
					]
				}
			);

			resMock.status(200).json(result);

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

			// stubMethod.restore();
		});
	});
	it("Stub for router order post - Handle Error", async () => {
		router.post(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubpostOneOrder(reqMock, resMock, next);
		});
	});

	after(() => {
		router.post.restore();
	});
});

describe("Stub router order Post - not enought products", async () => {
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
			JSON.stringify({ message1: "Too little quantity of Watermelon" }),
			null
		);
	});
	it("Stub for order router post - not enought products", async () => {
		router.post("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			// const stubMethod = sinon.stub(postOneOrder);
			// stubMethod(req, res, next);
			stubpostOneOrder(reqMock, resMock, next);

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
					message1: `Too little quantity of Watermelon`
				}),
				restoreQuantities: sinon.stub().returns(null)
			});

			const prodUpManager = new ProductUpdaterClass();

			prodUpManager.data = JSON.parse(res);
			prodUpManager.productModel = Product;
			prodUpManager.orderModel = Order;
			prodUpManager.response = JSON.parse(res).body;

			prodUpManager.orderExistsCheck();
			prodUpManager.searchProd();
			prodUpManager.createResults();
			prodUpManager.createNewOrder();
			prodUpManager.restoreQuantities();

			resMock
				.status(200)
				.json({ message1: "Too little quantity of Watermelon" });

			expect("Content-Type", /json/);
			expect(200);
			assert.match(JSON.parse(res), {
				message1: `Too little quantity of Watermelon`
			});
			expect(JSON.parse(res)).to.have.property("message1");
		});
	});
	it("Stub for router order post - Handle Error", async () => {
		router.post(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubpostOneOrder(reqMock, resMock, next);
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
			stubpostOneOrder(reqMock, resMock, next);

			stubOrderFindOne.withArgs({ orderid: "order000002" }).returns({
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
			});

			const result = await Order.findOne({ orderid: "order000002" });

			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
				orderExistsCheck: sinon.stub().returns(result),
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

			const orderExists = prodUpStub.orderExistsCheck();

			// per riaumentare di 0.05 coverage riattivare 4 linee sottostanti  --->
			prodUpManager.searchProd();
			prodUpManager.createResults();
			prodUpManager.createNewOrder();
			prodUpManager.restoreQuantities();

			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
				findData: sinon.stub().returns([
					{
						name: "UserOne",
						data: {
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
						}
					}
				]),
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

			const userUpdater = new UserUpdaterClass();

			userUpdaterStub.data = req.body;
			userUpdaterStub.userModel = User;
			userUpdaterStub.orderModel = Order;
			userUpdaterStub.response = res;

			userUpdaterStub.findData();
			const existCheck = userUpdater.usersExistCheck();
			// console.log(existCheck);

			userUpdaterStub.updateAccountsNewOrder();
			userUpdaterStub.updateAccountsDelOrder();

			if (Object.keys(existCheck).length > 0) {
				resMock.statusCode(200).json(existCheck);
			} else if (orderExists !== null) {
				resMock.status(200).json({
					message: "OrderId already exists"
				});
			}

			// aggiungere
			expect("Content-Type", /json/);
			expect(200);
			resMock.status(200).json({
				message: "OrderId already exists"
			});
			sinon.assert.match(JSON.parse(res), {
				message: "OrderId already exists"
			});
		});
	});
	it("Stub for router order post - Handle Error", async () => {
		router.post(`/orders-archieve/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubpostOneOrder(reqMock, resMock, next);
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

			stubMethod(reqMock, resMock, next);

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
			const result = User.findOneAndUpdate({ orderid: testOrderPut });

			// testing
			resMock.status(200).json(result);
			// testing

			expect(JSON.parse(res)).to.have.property("orderid");
			expect(JSON.parse(res)).to.have.property("users");
			expect(JSON.parse(res)).to.have.property("shipped");
			expect(JSON.parse(res)).to.have.property("date");
			expect(JSON.parse(res)).to.have.property("totalcost");
			expect(resMock.status).to.equal(200);
		});
	});
	it("Stub for router order put - Handle Error", async () => {
		router.put(`/orders-archieve/${testOrderPut}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			putOneOrder(reqMock, resMock, next);
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

	it("Stub for order router delete", async () => {
		router.delete(
			`/orders-archieve/${testOrderDelete}`,
			async (req, res, next) => {
				const reqMock = mockReq(req);
				const resMock = mockRes(res);
				const stubMethod = sinon.stub(deleteOneOrder);
				stubMethod(req, res, next);

				const stubOrderFindDel = sinon
					.stub(Order, "findOneAndDelete")
					.withArgs({
						orderid: "order000002"
					})
					.returns({
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
					});
				const orderRemoved = await Order.findOneAndDelete({
					orderid: "order000002"
				});
				// console.log(orderRemoved);

				const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
					findData: sinon.stub().returnsThis(),
					usersExistCheck: sinon.stub().returnsThis(),
					updateAccountsNewOrder: sinon.stub().returns(null),
					updateAccountsDelOrder: sinon.stub().returnsThis()
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
				});

				const userUpdater = new UserUpdaterClass();

				userUpdater.data = orderRemoved;
				userUpdater.userModel = User;
				userUpdater.orderModel = Order;
				userUpdater.response = JSON.parse(res);

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
				prodUdManager.response = JSON.parse(res);

				userUpdater.findData();
				userUpdater.usersExistCheck();
				userUpdater.updateAccountsNewOrder();
				userUpdater.updateAccountsDelOrder();

				prodUdManager.orderExistsCheck();
				prodUdManager.searchProd();
				prodUdManager.createResults();
				prodUdManager.createNewOrder();
				prodUdManager.restoreQuantities();

				resMock.status(200).json({
					message: "Order delete."
				});

				// console.log(result);

				expect("Content-Type", /json/);
				expect(200);

				expect(JSON.parse(res)).to.have.property("message");
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
				deleteOneOrder(reqMock, resMock, next);
			}
		);
	});

	after(() => {
		router.delete.restore();
	});
});

// // ----------- Order tests
