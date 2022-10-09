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

describe("Stub router Base", () => {
	const msg = {
		message: "Welcome to Planty of Food API."
	};
	before(() => {
		const stub = sinon.stub(router, "get").yields(null, {
			body: { message: "Welcome to Planty of Food API." }
		});
	});

	// json.calledWith({ success: true }).should.be.ok);
	it("Stub for router get /", () => {
		router.get("/", (req, res) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			// console.log(res.status(200));
			// req = request;
			// res = response;
			resMock.status(200).json(res.body);
			expect(resMock.status.calledWith(200)).to.be.ok;
			expect(
				resMock.json.calledWith({ message: "Welcome to Planty of Food API." })
			).to.be.ok;
		});
		// expect(
		// 	res.json.calledWith({
		// 		message: "Welcome to Planty of Food API."
		// 	})
		// ).to.be.ok;
	});
	after(() => {
		router.get.restore();
	});
});

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

// ----------- Product tests

// const testProdPut = "Strawberries";
// const newQuantity = 23;
// const testProdDelete = "Strawberries";

const stubGetAllProducts = sinon.stub(getAllProducts);

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

			const stubProductFind = sinon
				.stub(Product, "find")
				.withArgs({})
				.returns([
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

			// console.log(result);
			// console.log(res.body);

			resMock.status(200).json(res.body);

			sinon.assert.calledWith(resMock.status, 200);
			sinon.assert.match(result, resMock.body);

			// res.calledWith(200).should.be.ok;

			// console.log(JSON.parse(result));

			// aggiungere resMock.status(200).json...

			// assert.isArray(result);
			// assert.match(res.body, result);
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
			// sinon.assert.calledOnce(next());
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

			// console.log(resMock);
			// if (existence !== null) {
			resMock.status(200).json(result);
			// }

			assert.match(res.body, {
				name: "Strawberries",
				quantity: 23,
				origin: "Italy",
				price: 20.23
			});

			// expect(resMock.statusCode).to.equal(200);

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

			// resMock.status(500).json({...});
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
			// const stubMethod = sinon.stub(getOneProduct);
			stubGetOneProduct(reqMock, resMock, next);
			// getOneProduct.restore();

			const label = `${String(testProdGet)[0].toUpperCase()}${String(
				testProdGet
			).slice(1)}`;

			stubProductFindOne.withArgs({ name: label }).returns(null);
			const existence = await Product.findOne({ name: label });
			// console.log(existence);

			resMock.status(200).json({
				message: `Strawberries not exists`
			});

			// <-------- problem here

			// assert.match(JSON.parse(res), {
			// 	message: `${testProdGet} not exists`
			// });

			// expect(resMock.statusCode).to.equal(200);

			// expect(resMock).to.have.property("message");
			// assert.isFalse(next(err));

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

			// if (existence == null) {
			const newProduct = new Product(reqMock.body);

			// if (existence == null) {
			const result = await newProduct.save();
			resMock.status(200).json(result);
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
			// try {
			sinon.assert.calledWith(router.post, "/products-storage/");

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			// const stubMethod = sinon.stub(postOneProduct);
			stubPostOneProduct(reqMock, resMock, next);

			// PERFEZIONARE QUESTO.

			stubProductFindOne.withArgs({ name: "Strawberries" }).returns(null);
			const existence = Product.findOne({ name: "Strawberries" });

			// console.log(existence);

			saveStubProd.withArgs(new Error(), existence).rejects();
			// saveStubProd.returnsThis();

			const newProduct = new Product(reqMock.body);
			const result = newProduct.save();
			// console.log(result); //<--- result da controllare
			// expect(saveStub.calledOnce).to.be.true;

			// assert.strictEqual(JSON.stringify(result), JSON.stringify(newProduct));
			// } catch (err) {
			// 	// expect("Content-Type", /json/);
			// 	// expect(500);
			resMock.status(500).json({ message: "Error during Product saving..." });
			assert.isFalse(next(new Error()));
			// 	// sinon.assert.failException;

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
		// soluzione ad inghippo usare .restore prima di creare un altro stub
		// come questo sopra e subito sotto stubProductFindOne
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
			// try {
			sinon.assert.calledWith(router.post, "/products-storage/");
			expect("Content-Type", /json/);
			expect(200);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			// const stubMethod = sinon.stub(postOneProduct);
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

			// console.log(existence);

			// if (existence == null) {
			// 	// const result = await newProduct.save();
			// 	resMock.status(200).json({
			// 		name: "Strawberries",
			// 		quantity: 23,
			// 		origin: "Italy",
			// 		price: 10.23
			// 	});
			// expect(saveStub.calledOnce).to.be.false;
			// const newProduct = new Product(reqMock.body);
			// const result = await newProduct.save();
			// } else {
			resMock.status(200).json(res);

			assert.strictEqual(res, {
				message: `The product Strawberries already exists.`
			});

			// assert.isFalse(next(err));
			// }
			// } catch (err) {
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
		// stubProductFindOne.restore();

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

			// console.log(result);

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
			// const stubMethod = sinon.stub(getAllUsers);
			// getAllUsers(reqMock, resMock, next);
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
			// try {
			expect("Content-Type", /json/);
			expect(200);
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubPostOneUser(reqMock, resMock, next);
			// postOneUser.restore();

			const stubUserFindOne = sinon
				.stub(User, "findOne")
				.withArgs({ username: "User1" })
				.returns(null);
			const existence = User.findOne({ username: "User1" });

			// const mockUserFindOne = sinon
			// 	.mock(User)
			// 	.expects("findOne")
			// 	.withArgs({ username: "UserOne" })
			// 	.resolves(null);
			// User.findOne({ username: "UserOne" });
			// mockUserFindOne.verify();

			saveStubUser.returnsThis();

			const newUser = new User(reqMock.body);
			// console.log(newUser);
			const result = await newUser.save();

			// console.log(result);
			expect(saveStubUser.calledOnce).to.be.true;
			resMock.status(200).json(result);
			// expect(await result).to.eql(res);

			// resMock.status(200).json(result);

			// resMock;

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
			// const stubMethod = sinon.stub(postOneUser);
			stubPostOneUser(reqMock, resMock, next);
			// postOneUser.restore();

			// const stubMethod = sinon.stub(postOneUser);
			// postOneUser(reqMock, resMock, next);
			// postOneUser.restore();

			// ----- valutare se inserire o no ---------
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
			// console.log(existence);
			// ----- valutare se inserire o no ---------

			// stubProductFindOne.restore();

			resMock.status(200).json(res);

			assert.strictEqual(res, {
				message: `The user User1 already exists.`
			});

			// assert.match(JSON.parse(res), {
			// 	message: `The user User1 already exists.`
			// });
			// // assert.match(JSON.parse(res), { username: "User1" });
			// expect(JSON.parse(res)).to.have.property("message");
			// resMock.status(200).json({ message: `The user User1 already exists.` });
			// } catch (err) {
			// assert.isFalse(next(err));
			// }

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
			stubPostOneUser(reqMock, resMock, next);
			assert.isFalse(next(new Error()));
		});
	});
	after(() => {
		// stubUserFindOne.restore();
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
			stubPutOneUser(reqMock, resMock, next);
		});
	});
	after(() => {
		router.put.restore();
	});
});

const stubDeleteOneUser = sinon.stub(deleteOneUser);
const stubProductFindOneDelete = sinon.stub(User, "findOneAndDelete");

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

				// const mockUserFindDelete = sinon
				// 	.mock(User)
				// 	.expects("findOneAndDelete")
				// 	.withArgs({ username: "User1" })
				// 	.resolves({
				// 		firstname: "userTestOne",
				// 		lastname: "for Sinon Testing",
				// 		username: "User1",
				// 		address: "test@sinon.com",
				// 		orders: []
				// 	});
				// User.findOneAndDelete({ username: "User1" });
				// mockUserFindDelete.verify();

				stubProductFindOneDelete.withArgs({ username: "User1" }).returns({
					firstname: "userTestOne",
					lastname: "for Sinon Testing",
					username: "User1",
					address: "test@sinon.com",
					orders: []
				});
				const result = await User.findOneAndDelete({ username: "User1" });

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

			// console.log(result);

			// const stubProductFindOne = sinon
			// 	.stub(Order, "find")
			// 	.withArgs({})
			// 	.returns(res);
			// const existence = Order.find({});

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

			// await eightOrderManager.determinate();
			// await eightOrderManager.ordering();
			// await eightOrderManager.createResponse();
			// await eightOrderManager.noProducts();
			await eightOrderManager.parametersHandling();

			// resMock.status(200).json(res.body);

			// console.log(thirdOrderStub);

			// secondOrderManager.determinate().then((result) => console.log(result));

			// console.log(secondOrderStub.determinate());
			// console.log(secondOrderStub.ordering());

			// expect(secondOrderStub.determinate()).to.be.equal(results);
			// expect(thirdOrderManager.determinate().response).to.be.a("array");
			// return secondOrderStub.determinate().should.eventually.equal(results);
			// assert(secondOrderStub.determinate()).returns(results);
			// stubGetAllOrders.restore();
		});
	});

	it("Stub for router order get (all) - Handle Error", async () => {
		router.get(`/orders-archieve/`, async (req, res, next) => {
			// try {
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllOrders(reqMock, resMock, next);

			const eightOrderStub = sinon.createStubInstance(OrderManagerClass, {
				parametersHandling: sinon.stub().throws()
			});

			const eightOrderManager = new OrderManagerClass();

			// eightOrderManager.response = new Error();
			// eightOrderManager.data = res.body;
			// eightOrderManager.filterQuery = "date";
			// eightOrderManager.valueQuery = "2022-09-06T21:55:50.076+00:00";
			// eightOrderManager.orderByQuery = undefined;
			// eightOrderManager.sortQuery = undefined;

			// eightOrderManager.determinate();
			await eightOrderManager.parametersHandling();
			// } catch (error) {
			// 	next(error);
			// }
			// next(eightOrderManager.determinate());

			// console.log(detError);
			// const stubPar = sinon
			// 	.stub(OrderManagerClass, "parametersHandling")
			// 	.throws();
			// console.log(stubPar);

			// assert.isFalse(next(new Error()));

			// resMock.status(500);

			// expect(next(error)).to.be.calledOnce;
			// sinon.assert.calledOnce(next);
			// stubGetAllOrders.restore();
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
			stubGetAllOrders(reqMock, resMock, next);
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
			stubGetAllOrders(reqMock, resMock, next);
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
			stubGetAllOrders(reqMock, resMock, next);
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
			stubGetAllOrders(reqMock, resMock, next);
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
			stubGetAllOrders(reqMock, resMock, next);
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
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetAllOrders(reqMock, resMock, next);
			assert.isFalse(next(new Error()));
		});
	});

	after(() => {
		stubOrderFind.restore();
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
			stubGetAllOrders(reqMock, resMock, next);
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

			console.log(result);
			// if (result == null) {
			// 	resMock.status(200).json({
			// 		message: `${testOrderGet} not exists`
			// 	});
			// } else {
			resMock.status(200).json(result);

			// } // questo...

			// resMock.status(200).json(result); ... o questo

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
			// stubGetOneOrder(reqMock, resMock, next).then((result) =>
			// 	console.log(result)
			// );
			stubGetOneOrder(reqMock, resMock, next);

			stubOrderFindOne.withArgs({ orderid: testOrderGet }).returns(null);

			// console.log(data);

			const existence = await Order.findOne({ orderid: testOrderGet });
			// ok result null
			// console.log(existence);

			// if (result == null) {
			resMock.status(200).json({
				message: `order000001 not exists`
			});
			// } else {
			// 	resMock.status(200).json(result);
			// }

			// resMock.status(200).json(result);

			// assert.match(res, {
			// 	message: `order000001 not exists`
			// });
			// expect(resMock).to.have.property("message");
		});
	});
	it("Stub for router order get (one) - Handle Error", async () => {
		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetOneOrder(reqMock, resMock, next).returns(resMock);

			// assert.isFalse(next(new Error()));
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
			stubGetOneOrder(reqMock, resMock, next);
			// resMock.status(500).json({
			// 	message: `Error in searching order`
			// });
			// return next(new Error()).then(() => {
			// 	sinon.assert.calledOnce(next);
			// });
			// assert.isFalse(next(new Error()));
		});
	});

	after(() => {
		stubOrderFindOne.restore();
		router.get.restore();
	});
});

// QUI

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
				findData: sinon.stub().returns([
					{
						name: "UserOne",
						data: stubUserFindOne.withArgs({ username: "UserOne" }).returns({
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
						})
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

			// userUpdaterStub.resultUpdate = await this.userModel.findOneAndUpdate(
			// 	{
			// 		username: elem
			// 	},
			// 	{
			// 		orders: this.updatedField
			// 	}
			// );

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
					shipped: false,
					date: "2022-09-06T21:55:50.076+00:00",
					totalcost: 2000
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
			// const stubMethod = sinon.stub(postOneOrder);
			// stubMethod(req, res, next);
			stubpostOneOrder(reqMock, resMock, next);

			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
				findData: sinon.stub().returns([
					{
						name: "User23",
						data: stubUserFindOne.withArgs({ username: "User23" }).returns(null)
					}
				]),
				usersExistCheck: sinon
					.stub()
					.returns({ message0: "User23 not exist." }),
				updateAccountsNewOrder: sinon.stub().returns(null),
				updateAccountsDelOrder: sinon.stub().returns(null)
			});

			const userUpdater = new UserUpdaterClass();

			userUpdaterStub.data = req.body;
			userUpdaterStub.userModel = User;
			userUpdaterStub.orderModel = Order;
			userUpdaterStub.response = res;

			userUpdaterStub.findData();
			userUpdaterStub.usersExistCheck();

			resMock.status(200).json({ message0: "User23 not exist." });

			expect("Content-Type", /json/);
			expect(200);
			assert.match(res, { message0: "User23 not exist." });
			expect(JSON.parse(res)).to.have.property("message0");
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

			// const result = await Order.findOne({ orderid: "order000002" });

			const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
				findData: sinon.stub().returns([
					{
						name: "UserOne",
						data: stubUserFindOne.withArgs({ username: "UserOne" }).returns({
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
						})
					}
				]),
				usersExistCheck: sinon.stub().returns({}),
				updateAccountsNewOrder: sinon.stub().returns(null),
				updateAccountsDelOrder: sinon.stub().returns(null)
			});

			const userUpdater = new UserUpdaterClass();

			userUpdaterStub.data = reqMock.body;
			userUpdaterStub.userModel = User;
			userUpdaterStub.orderModel = Order;
			userUpdaterStub.response = resMock;

			userUpdaterStub.findData();
			userUpdaterStub.usersExistCheck();

			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
				orderExistsCheck: sinon.stub().returns(
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
					})
				),
				searchProd: sinon.stub().returns(null),
				createResults: sinon.stub().returns(null),
				createNewOrder: sinon.stub().returns(null),
				restoreQuantities: sinon.stub().returns(null)
			});

			const prodUpManager = new ProductUpdaterClass();

			prodUpStub.data = reqMock.body;
			prodUpStub.productModel = Product;
			prodUpStub.orderModel = Order;
			prodUpStub.response = resMock;

			const check = await prodUpStub.orderExistsCheck();
			console.log(check);

			resMock.status(200).json({
				message: "OrderId already exists"
			});

			// qui 09/10

			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.match(res, {
				message: "OrderId already exists"
			});
			expect(res).to.have.property("message");

			// console.log(orderExists);

			// per riaumentare di 0.05 coverage riattivare 4 linee sottostanti  --->
			// prodUpManager.searchProd();
			// prodUpManager.createResults();
			// prodUpManager.createNewOrder();
			// prodUpManager.restoreQuantities();

			// const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
			// 	findData: sinon.stub().returns([
			// 		{
			// 			name: "UserOne",
			// 			data: {
			// 				firstname: "UserFromInsomnia",
			// 				lastname: "from req.body",
			// 				username: "UserOne",
			// 				address: "test@request.com",
			// 				orders: [
			// 					{
			// 						orderid: "00001",
			// 						url: "none"
			// 					}
			// 				]
			// 			}
			// 		}
			// 	]),
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
			// 	updateAccountsDelOrder: sinon.stub().returns(null)
			// });

			// const userUpdater = new UserUpdaterClass();

			// userUpdater.data = req.body;
			// userUpdater.userModel = User;
			// userUpdater.orderModel = Order;
			// userUpdater.response = res;

			// // userUpdater.findData();
			// userUpdater.usersExistCheck();
			// console.log(existCheck);

			// userUpdater.updateAccountsNewOrder();
			// userUpdaterStub.updateAccountsDelOrder();

			// if (Object.keys(existCheck).length > 0) {
			// 	resMock.statusCode(200).json(existCheck);
			// } else if (orderExists !== null) {
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
		stubOrderFindOne.restore();
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

const stubPutOneOrder = sinon.stub(putOneOrder);

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
			const result = await User.findOneAndUpdate({ orderid: testOrderPut });

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
			stubPutOneOrder(reqMock, resMock, next);
		});
	});

	after(() => {
		router.put.restore();
	});
});

const stubDeleteOneOrder = sinon.stub(deleteOneOrder);

describe("Stub router order Delete One", async () => {
	const testOrderDelete = "order00001";

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
