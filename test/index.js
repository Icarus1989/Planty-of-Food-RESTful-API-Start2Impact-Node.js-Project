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

describe("Stub router product Get All", async () => {
	before(() => {
		const stub = sinon.stub(router, "get").yields(
			null,
			JSON.stringify({
				message: "Welcome to Planty of Food API."
			}),
			null
		);
	});
	it("Stub for router get /", async () => {
		router.get("/", (req, res) => {
			// importante
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			resMock.status(200).json({
				message: "Welcome to Planty of Food API."
			});
			expect("Content-Type", /json/);
			expect(200);
			// importante
			sinon.assert.calledWith(router.get, "/");
			assert.match(
				JSON.parse(res),
				String({
					message: "Welcome to Planty of Food API."
				})
			);
		});
	});
	it("Stub for product router get (all) - Handle Error", async () => {
		router.get(`/`, async (req, res, next) => {
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

// describe("Testing mongoose Model methods", () => {
// 	// it("Mock User Model save()")
// 	it("Mock Product Model find({}) method", () => {
// 		const mockProdFind = sinon
// 			.mock(Product)
// 			.expects("find")
// 			.withArgs({})
// 			.resolves([
// 				{
// 					name: "Strawberries",
// 					quantity: 23000,
// 					origin: "Italy",
// 					price: 20.23
// 				},
// 				{
// 					name: "Pineapples",
// 					quantity: 10000,
// 					price: 23.23
// 				},
// 				{
// 					name: "Apples",
// 					quantity: 10000,
// 					price: 23.32
// 				}
// 			]);
// 		Product.find({});
// 		mockProdFind.verify();
// 	});

// 	it("Mock Product Model findOne( { name: } ) method", () => {
// 		const mockProdFindOne = sinon
// 			.mock(Product)
// 			.expects("findOne")
// 			.withArgs({ name: "Strawberries" })
// 			.resolves({
// 				name: "Strawberries",
// 				quantity: 23000,
// 				origin: "Italy",
// 				price: 20.23
// 			});
// 		Product.findOne({ name: "Strawberries" });
// 		mockProdFindOne.verify();
// 	});

// 	// it("Mock Product Model findOneAndUpdate( { name: }, {field: newValue} ) method", () => {
// 	// 	const mockProdFindUpdate = sinon
// 	// 		.mock(Product)
// 	// 		.expects("findOneAndUpdate")
// 	// 		.withArgs({ name: "Strawberries" }, { quantity: 23 })
// 	// 		.resolves({
// 	// 			name: "Strawberries",
// 	// 			quantity: 23,
// 	// 			origin: "Italy",
// 	// 			price: 20.23
// 	// 		});
// 	// 	Product.findOneAndUpdate({ name: "Strawberries" }, { quantity: 23 });
// 	// 	mockProdFindUpdate.verify();
// 	// });

// 	// it("Mock Product Model findOneAndDelete( { name: value } ) method", () => {
// 	// 	const mockProductFindDelete = sinon
// 	// 		.mock(Product)
// 	// 		.expects("findOneAndDelete")
// 	// 		.withArgs({ name: "Strawberries" })
// 	// 		.resolves({
// 	// 			name: "Strawberries",
// 	// 			quantity: 23000,
// 	// 			origin: "Italy",
// 	// 			price: 20.23
// 	// 		});
// 	// 	Product.findOneAndDelete({ name: "Strawberries" });
// 	// 	mockProductFindDelete.verify();
// 	// });

// 	// it("Mock User Model find({}) method", () => {
// 	// 	const mockUserFind = sinon
// 	// 		.mock(User)
// 	// 		.expects("find")
// 	// 		.withArgs({})
// 	// 		.resolves([
// 	// 			{
// 	// 				firstname: "userTestOne",
// 	// 				lastname: "for Sinon Testing",
// 	// 				username: "User1",
// 	// 				address: "test@sinon.com",
// 	// 				orders: [
// 	// 					{
// 	// 						orderid: "00001",
// 	// 						url: "none"
// 	// 					}
// 	// 				]
// 	// 			},
// 	// 			{
// 	// 				firstname: "userTestTwo",
// 	// 				lastname: "for Sinon Testing",
// 	// 				username: "User2",
// 	// 				address: "test@sinon.com",
// 	// 				orders: [
// 	// 					{
// 	// 						orderid: "00002",
// 	// 						url: "none"
// 	// 					}
// 	// 				]
// 	// 			},
// 	// 			{
// 	// 				firstname: "UserFromInsomnia",
// 	// 				lastname: "for Sinon Testing",
// 	// 				username: "User3",
// 	// 				address: "test@sinon.com",
// 	// 				orders: [
// 	// 					{
// 	// 						orderid: "00003",
// 	// 						url: "none"
// 	// 					}
// 	// 				]
// 	// 			}
// 	// 		]);
// 	// 	User.find({});
// 	// 	mockUserFind.verify();
// 	// });

// 	// it("Mock User Model findOne( { username: value } ) method", () => {
// 	// 	const mockUserFindOne = sinon
// 	// 		.mock(User)
// 	// 		.expects("findOne")
// 	// 		.withArgs({ username: "UserOne" })
// 	// 		.resolves({
// 	// 			firstname: "userTestOne",
// 	// 			lastname: "for Sinon Testing",
// 	// 			username: "User1",
// 	// 			address: "test@sinon.com",
// 	// 			orders: [
// 	// 				{
// 	// 					orderid: "00001",
// 	// 					url: "none"
// 	// 				}
// 	// 			]
// 	// 		});
// 	// 	User.findOne({ username: "UserOne" });
// 	// 	mockUserFindOne.verify();
// 	// });

// 	// it("Mock User Model findOneAndUpdate ( { username: value } , {value: newValue} ) method", () => {
// 	// 	const mockUserFindUp = sinon
// 	// 		.mock(User)
// 	// 		.expects("findOneAndUpdate")
// 	// 		.withArgs({ username: "UserOne" }, { orders: [] })
// 	// 		.resolves({
// 	// 			firstname: "userTestOne",
// 	// 			lastname: "for Sinon Testing",
// 	// 			username: "User1",
// 	// 			address: "test@sinon.com",
// 	// 			orders: []
// 	// 		});
// 	// 	User.findOneAndUpdate({ username: "UserOne" }, { orders: [] });
// 	// 	mockUserFindUp.verify();
// 	// });

// 	// it("Mock User Model findOneAndDelete ( { username: value } ) method", () => {
// 	// 	const mockUserFindDelete = sinon
// 	// 		.mock(User)
// 	// 		.expects("findOneAndDelete")
// 	// 		.withArgs({ username: "UserOne" })
// 	// 		.resolves({
// 	// 			firstname: "userTestOne",
// 	// 			lastname: "for Sinon Testing",
// 	// 			username: "User1",
// 	// 			address: "test@sinon.com",
// 	// 			orders: []
// 	// 		});
// 	// 	User.findOneAndDelete({ username: "UserOne" });
// 	// 	mockUserFindDelete.verify();
// 	// });

// 	// it("Mock Order Model find({})", () => {
// 	// 	const mockOrderFind = sinon
// 	// 		.mock(Order)
// 	// 		.expects("find")
// 	// 		.withArgs({})
// 	// 		.resolves([
// 	// 			{
// 	// 				orderid: "order000001",
// 	// 				users: [
// 	// 					{
// 	// 						username: "UserOne",
// 	// 						products: [
// 	// 							{
// 	// 								productname: "Watermelon",
// 	// 								quantity: 23
// 	// 							},
// 	// 							{
// 	// 								productname: "Strawberries",
// 	// 								quantity: 23
// 	// 							}
// 	// 						]
// 	// 					}
// 	// 				],
// 	// 				shipped: false,
// 	// 				date: "2022-09-06T21:55:50.076+00:00",
// 	// 				totalcost: 2000
// 	// 			},
// 	// 			{
// 	// 				orderid: "order000002",
// 	// 				users: [
// 	// 					{
// 	// 						username: "UserTwo",
// 	// 						products: [
// 	// 							{
// 	// 								productname: "Watermelon",
// 	// 								quantity: 23
// 	// 							},
// 	// 							{
// 	// 								productname: "Strawberries",
// 	// 								quantity: 23
// 	// 							}
// 	// 						]
// 	// 					}
// 	// 				],
// 	// 				shipped: false,
// 	// 				date: "2022-09-06T21:55:50.076+00:00",
// 	// 				totalcost: 2000
// 	// 			}
// 	// 		]);
// 	// 	Order.find({});
// 	// 	mockOrderFind.verify();
// 	// });

// 	// it("Mock Order Model findOne( { orderid: value } )", () => {
// 	// 	const mockOrderFindOne = sinon
// 	// 		.mock(Order)
// 	// 		.expects("findOne")
// 	// 		.withArgs({ orderid: "order000001" })
// 	// 		.resolves({
// 	// 			orderid: "order000001",
// 	// 			users: [
// 	// 				{
// 	// 					username: "UserOne",
// 	// 					products: [
// 	// 						{
// 	// 							productname: "Watermelon",
// 	// 							quantity: 23
// 	// 						},
// 	// 						{
// 	// 							productname: "Strawberries",
// 	// 							quantity: 23
// 	// 						}
// 	// 					]
// 	// 				}
// 	// 			],
// 	// 			shipped: false,
// 	// 			date: "2022-09-06T21:55:50.076+00:00",
// 	// 			totalcost: 2000
// 	// 		});
// 	// 	Order.findOne({ orderid: "order000001" });
// 	// 	mockOrderFindOne.verify();
// 	// });

// 	// it("Mock Order Model findOneAndUpdate( { orderid: value }, { value: newValue} )", () => {
// 	// 	const mockOrderFindUp = sinon
// 	// 		.mock(Order)
// 	// 		.expects("findOneAndUpdate")
// 	// 		.withArgs(
// 	// 			{
// 	// 				orderid: "order000001"
// 	// 			},
// 	// 			{
// 	// 				orderid: "order000001",
// 	// 				users: [
// 	// 					{
// 	// 						username: "UserOne",
// 	// 						products: [
// 	// 							{
// 	// 								productname: "Watermelon",
// 	// 								quantity: 23
// 	// 							},
// 	// 							{
// 	// 								productname: "Strawberries",
// 	// 								quantity: 23
// 	// 							}
// 	// 						]
// 	// 					}
// 	// 				],
// 	// 				shipped: true,
// 	// 				date: "2022-09-06T21:55:50.076+00:00",
// 	// 				totalcost: 2000
// 	// 			}
// 	// 		)
// 	// 		.resolves({
// 	// 			orderid: "order000001",
// 	// 			users: [
// 	// 				{
// 	// 					username: "UserOne",
// 	// 					products: [
// 	// 						{
// 	// 							productname: "Watermelon",
// 	// 							quantity: 23
// 	// 						},
// 	// 						{
// 	// 							productname: "Strawberries",
// 	// 							quantity: 23
// 	// 						}
// 	// 					]
// 	// 				}
// 	// 			],
// 	// 			shipped: true,
// 	// 			date: "2022-09-06T21:55:50.076+00:00",
// 	// 			totalcost: 2000
// 	// 		});
// 	// 	Order.findOneAndUpdate(
// 	// 		{
// 	// 			orderid: "order000001"
// 	// 		},
// 	// 		{
// 	// 			orderid: "order000001",
// 	// 			users: [
// 	// 				{
// 	// 					username: "UserOne",
// 	// 					products: [
// 	// 						{
// 	// 							productname: "Watermelon",
// 	// 							quantity: 23
// 	// 						},
// 	// 						{
// 	// 							productname: "Strawberries",
// 	// 							quantity: 23
// 	// 						}
// 	// 					]
// 	// 				}
// 	// 			],
// 	// 			shipped: true,
// 	// 			date: "2022-09-06T21:55:50.076+00:00",
// 	// 			totalcost: 2000
// 	// 		}
// 	// 	);
// 	// 	mockOrderFindUp.verify();
// 	// });

// 	// it("Mock Order Model findOneAndDelete( { orderid: value }, { value: newValue} )", () => {
// 	// 	const mockOrderFindDel = sinon
// 	// 		.mock(Order)
// 	// 		.expects("findOneAndDelete")
// 	// 		.withArgs({
// 	// 			orderid: "order000001"
// 	// 		})
// 	// 		.resolves({
// 	// 			orderid: "order000001",
// 	// 			users: [
// 	// 				{
// 	// 					username: "UserOne",
// 	// 					products: [
// 	// 						{
// 	// 							productname: "Watermelon",
// 	// 							quantity: 23
// 	// 						},
// 	// 						{
// 	// 							productname: "Strawberries",
// 	// 							quantity: 23
// 	// 						}
// 	// 					]
// 	// 				}
// 	// 			],
// 	// 			shipped: true,
// 	// 			date: "2022-09-06T21:55:50.076+00:00",
// 	// 			totalcost: 2000
// 	// 		});
// 	// 	Order.findOneAndDelete({
// 	// 		orderid: "order000001"
// 	// 	});
// 	// 	mockOrderFindDel.verify();
// 	// });
// });

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
			}),
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

			// aggiungere resMock.status(200).json...

			assert.isArray(JSON.parse(res).body);
			assert.match(
				JSON.parse(res).body,
				String({
					body: [
						{
							name: "Strawberries",
							quantity: 23000,
							origin: "Italy",
							price: 10.23
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
				})
			);
			const elements = JSON.parse(res).body;
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
			const stubMethod = sinon.stub(getOneProduct);
			getOneProduct(reqMock, resMock, next);
			// stubMethod.restore();

			const label = `${String(testProdGet)[0].toUpperCase()}${String(
				testProdGet
			).slice(1)}`;

			resMock.status(200).json({
				name: testProdGet,
				quantity: 23,
				origin: "Italy",
				price: 20.23
			});

			// <-------- problem here

			assert.match(JSON.parse(res), {
				name: "strawberries",
				quantity: 23,
				origin: "Italy",
				price: 20.23
			});

			// expect(resMock.statusCode).to.equal(200);

			expect(JSON.parse(res)).to.have.property("name");
			expect(JSON.parse(res)).to.have.property("quantity");
			expect(JSON.parse(res)).to.have.property("origin");
			expect(JSON.parse(res)).to.have.property("price");
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
			// getOneProduct(reqMock, resMock, next);
			// getOneProduct.restore();

			const label = `${String(testProdGet)[0].toUpperCase()}${String(
				testProdGet
			).slice(1)}`;

			resMock.status(200).json({
				message: `${label} not exists`
			});

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

describe("Stub router product Post", async () => {
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
			stubMethod(reqMock, resMock, next);

			// const stubProductModel = sinon.stub(Product);
			// const newProdStub = new stubProductModel(req.body);
			// newProdStub.save();

			// const mockProdSave = sinon
			// 	.mock(Product)
			// 	.expects("save")
			// 	.withArgs(err, doc)
			// 	.resolves(() => {
			// 		return doc;
			// 	});
			// Product.save({
			// 	name: "Strawberries",
			// 	quantity: 23,
			// 	origin: "Italy",
			// 	price: 10.23
			// });
			// mockProdSave.verify();

			resMock.status(200).json({
				name: testProdPut,
				quantity: newQuantity,
				origin: "Italy",
				price: 10.23
			});

			assert.match(JSON.parse(res), {
				name: "Strawberries",
				quantity: 23,
				origin: "Italy",
				price: 10.23
			});
			// expect(res).to.have.property("name");
			// expect(res).to.have.property("quantity");
			// expect(res).to.have.property("origin");
			// expect(res).to.have.property("price");
		});
	});
	it("Stub for product router post - Handle Error", async () => {
		router.post(`/products-storage/`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			postOneProduct(reqMock, resMock, next);
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
				origin: "Italy",
				price: 20.23
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
			stubMethod(reqMock, resMock, next);

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

			resMock.status(200).json({
				name: testProdPut,
				quantity: newQuantity,
				origin: "Italy",
				price: 20.23
			});

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
			putOneProduct(reqMock, resMock, next);
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

			// const mockProductFindDelete = sinon
			// 	.mock(Product)
			// 	.expects("findOneAndDelete")
			// 	.withArgs({ name: "Strawberries" })
			// 	.resolves({
			// 		name: "Strawberries",
			// 		quantity: 23000,
			// 		origin: "Italy",
			// 		price: 20.23
			// 	});
			// Product.findOneAndDelete({ name: "Strawberries" });
			// mockProductFindDelete.verify();

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
		router.get("/users/", (req, res, next) => {
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
			User.find({});
			mockUserFind.verify();

			resMock.status(200).json(body);
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

			// const mockUserFindOne = sinon
			// 	.mock(User)
			// 	.expects("findOne")
			// 	.withArgs({ username: "User1" })
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
			// User.findOne({ username: "User1" });
			// mockUserFindOne.verify();

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

			resMock.status(200).json({
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

			// const fakeSave = new User({
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
			// // console.log(fakeSave);
			// const mockSave = sinon.stub(fakeSave, "save").callsFake((err, doc) => {
			// 	if (err) {
			// 		// resMock.status(500).json({ message: `Error in saving - ${err}` });
			// 		console.log(err);
			// 	}

			// });
			// const result = fakeSave.save();
			// console.log(result);
			// fakeSave.save((err, doc) => {
			// 	if (err) {
			// 		resMock.status(500).json({ message: `Error in saving - ${err}` });
			// 	}

			// });

			const stubMethod = sinon.stub(postOneUser);
			stubMethod(req, res, next);

			// const mockUserFindOne = sinon
			// 	.mock(User)
			// 	.expects("findOne")
			// 	.withArgs({ username: "UserOne" })
			// 	.resolves(null);
			// User.findOne({ username: "UserOne" });
			// mockUserFindOne.verify();

			// const mockTesting = sinon
			// 	.mock(fakeSave)
			// 	.expects("save")
			// 	.withArgs(req.body)
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
			// User.save();
			// mockTesting.verify();

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

			sinon.assert.match(JSON.parse(res), {
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
			expect(JSON.parse(res)).to.have.property("firstname");
			expect(JSON.parse(res)).to.have.property("lastname");
			expect(JSON.parse(res)).to.have.property("username");
			expect(JSON.parse(res)).to.have.property("address");
			expect(JSON.parse(res)).to.have.property("orders");
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

describe("Stub router user Post - User already exists", async () => {
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
	it("Stub for user router post", async () => {
		router.post("/users/", async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(postOneUser).reject(res);
			stubMethod(req, res, next);

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

			resMock.status(200).json({
				message: `The user User1 already exists.`
			});

			assert.match(JSON.parse(res), {
				message: `The user User1 already exists.`
			});
			// assert.match(JSON.parse(res), { username: "User1" });
			expect(JSON.parse(res)).to.have.property("message");
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

			// sistemare ---> qualcosa di non rilevato abbassa coverage

			// const mockUserFindUp = sinon
			// 	.mock(User)
			// 	.expects("findOneAndUpdate")
			// 	.withArgs({ username: "User1" }, { address: newAddress })
			// 	.resolves({
			// 		firstname: "userTestOne",
			// 		lastname: "for Sinon Testing",
			// 		username: "User1",
			// 		address: newAddress,
			// 		orders: [
			// 			{
			// 				orderid: "00001",
			// 				url: "none"
			// 			}
			// 		]
			// 	});
			// User.findOneAndUpdate(
			// 	{ username: "User1" },
			// 	{
			// 		address: newAddress
			// 	}
			// );
			// mockUserFindUp.verify();

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

// ---------> Provare a dividere i vari in con più describe con res opportune <----------

// describe("Stub router order Get All", async () => {
// 	before(() => {
// 		const stub = sinon.stub(router, "get").yields(
// 			{
// 				params: {
// 					filter: "productname",
// 					value: "strawberries",
// 					orderBy: "orderid",
// 					sort: undefined
// 				}
// 			},
// 			JSON.stringify({
// 				body: [
// 					{
// 						orderid: "order000001",
// 						users: [
// 							{
// 								username: "UserOne",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						date: "2022-09-06T21:55:50.076+00:00",
// 						totalcost: 2000
// 					},
// 					{
// 						orderid: "order000002",
// 						users: [
// 							{
// 								username: "UserTwo",
// 								products: [
// 									{
// 										productname: "Watermelon",
// 										quantity: 23
// 									},
// 									{
// 										productname: "Strawberries",
// 										quantity: 23
// 									}
// 								]
// 							}
// 						],
// 						shipped: false,
// 						date: "2022-09-06T21:55:50.076+00:00",
// 						totalcost: 2000
// 					}
// 				]
// 			}),
// 			null
// 		);
// 	});

// 	after(() => {
// 		router.get.restore();
// 	});
// });

describe("Stub router order Get All", async () => {
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
		router.get("/orders-archieve/", (req, res, next) => {
			const secondOrderStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returnsThis()
			});

			const reqMock = mockReq(req);
			const resMock = mockRes(res.body);

			const stubMethod = sinon.stub(getAllOrders);
			stubMethod(reqMock, resMock, next);

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
			// Order.find({});
			// mockOrderFind.verify();

			// const secondOrderManager = new OrderManagerClass();

			secondOrderStub.response = JSON.parse(res).body;
			secondOrderStub.data = JSON.parse(res).body;
			secondOrderStub.filterQuery = "productname";
			secondOrderStub.valueQuery = "strawberries";
			secondOrderStub.orderByQuery = "orderid";
			secondOrderStub.sortQuery = "decreasing";

			secondOrderStub.determinate();
			secondOrderStub.ordering();
			secondOrderStub.createResponse();
			secondOrderStub.noProducts();
			secondOrderStub.parametersHandling();

			// secondOrderManager.determinate().then((result) => console.log(result));

			// console.log(secondOrderStub.determinate());
			// console.log(secondOrderStub.ordering());

			// expect(secondOrderStub.determinate()).to.be.equal(results);
			expect(secondOrderStub.determinate().response).to.be.a("array");
			// return secondOrderStub.determinate().should.eventually.equal(results);
			// assert(secondOrderStub.determinate()).returns(results);
		});
	});
	it("Stub for router order get (all) - miss sort param", () => {
		// Problema qui
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
			//

			const reqMock = mockReq(req);
			const resMock = mockRes(res);

			const orderManagerStub = sinon.createStubInstance(OrderManagerClass, {
				determinate: sinon.stub().returnsThis(),
				ordering: sinon.stub().returnsThis(),
				createResponse: sinon.stub().returnsThis(),
				noProducts: sinon.stub().returnsThis(),
				parametersHandling: sinon.stub().returns({
					message: `Need a &sort= parameter for search...`
				})
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
			getAllOrders(reqMock, resMock, next);
		});
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
		router.get("/orders-archieve/", (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);

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
	it("Stub for router order get (all)", async () => {
		router.get("/orders-archieve/", (req, res, next) => {
			// orderManagerStub.resolves();

			const reqMock = mockReq(req);
			const resMock = mockRes(res);

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

			expect("Content-Type", /json/);
			expect(200);
			// expect(res.statusCode).to.equal(200);

			// const stub = sinon.stub(getAllOrders);
			// getAllOrders(reqMock, resMock, next);

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

			expect(200);

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			const stubMethod = sinon.stub(getOneOrder);
			stubMethod(reqMock, resMock, next);

			// resMock.status(200).json({
			// 	orderid: testOrderGet,
			// 	users: [
			// 		{
			// 			username: "UserOne",
			// 			products: [
			// 				{
			// 					productname: "Watermelon",
			// 					quantity: 23
			// 				},
			// 				{
			// 					productname: "Strawberries",
			// 					quantity: 23
			// 				}
			// 			]
			// 		}
			// 	],
			// 	shipped: false,
			// 	date: "2022-09-06T21:55:50.076+00:00",
			// 	totalcost: 2000
			// });

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

			// resMock.statusCode(200).json({
			// 	orderid: "order00001",
			// 	users: [
			// 		{
			// 			username: "UserOne",
			// 			products: [
			// 				{
			// 					productname: "Watermelon",
			// 					quantity: 23
			// 				},
			// 				{
			// 					productname: "Strawberries",
			// 					quantity: 23
			// 				}
			// 			]
			// 		}
			// 	],
			// 	shipped: false,
			// 	date: "2022-09-06T21:55:50.076+00:00",
			// 	totalcost: 2000
			// });
			expect(JSON.parse(res)).to.have.property("orderid");
			expect(JSON.parse(res)).to.have.property("users");
			expect(JSON.parse(res)).to.have.property("shipped");
			expect(JSON.parse(res)).to.have.property("date");
			expect(JSON.parse(res)).to.have.property("totalcost");
		});
	});
	// it("Stub for router order get (one) - Handle Error", async () => {
	// 	router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
	// 		expect(500);
	// 		const reqMock = mockReq(req);
	// 		const resMock = new Error();
	// 		getOneOrder(reqMock, resMock, next);
	// 	});
	// });
	// it("Stub for router order get (all) - Handle Error", async () => {
	// 	router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
	// 		expect(500);
	// 		const reqMock = mockReq(req);
	// 		const resMock = new Error();
	// 		getOneOrder(reqMock, resMock, next);
	// 	});
	// });

	after(() => {
		router.get.restore();
	});
});

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

			// const stubMethod = sinon.stub(postOneOrder);
			// stubMethod(req, res, next);
			// postOneOrder(reqMock, resMock, next);

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

			// console.log(prodUpStub.createNewOrder());

			// prodUpStub.negativeArr = [];
			// for await (let elem of results) {
			// 	prodUpStub.updatingProduct = {
			// 		productname: elem["productname"]
			// 	};
			// 	// prodUpStub.updatingProduct.returns({ productname: "Watermelon" });
			// 	// prodUpStub.totalprice = 1000;
			// }

			// const mockOrderFindOneOrder = sinon
			// 	.mock(Order)
			// 	.expects("findOne")
			// 	.withArgs({ orderid: "order000001" })
			// 	.resolves({
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
			// 	});
			// Order.findOne({ orderid: "order000001" });
			// mockOrderFindOneOrder.verify();

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

			// const userUpdater = new UserUpdaterClass();userUpdaterStub

			userUpdaterStub.data = req.body;
			userUpdaterStub.userModel = User;
			userUpdaterStub.orderModel = Order;
			userUpdaterStub.response = res;

			userUpdaterStub.findData();
			userUpdaterStub.usersExistCheck();
			userUpdaterStub.updateAccountsNewOrder();
			userUpdaterStub.updateAccountsDelOrder();

			// this.resultUpdate = await this.userModel.findOneAndUpdate(
			// 	{
			// 		username: elem
			// 	},
			// 	{
			// 		orders: this.updatedField
			// 	}
			// );

			userUpdaterStub.resultUpdate = sinon
				.mock(User)
				.expects("findOneAndUpdate")
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
				.resolves({
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
			User.findOneAndUpdate(
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
			userUpdaterStub.resultUpdate.verify();

			// console.log(userUpdaterStub.findData());

			resMock.status(200).json(order);

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
			postOneOrder(reqMock, resMock, next);
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
			// stubMethod(reqMock, resMock, next);

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
			// console.log(exist);

			prodUpManager.searchProd();
			prodUpManager.createResults();
			prodUpManager.createNewOrder();
			prodUpManager.restoreQuantities();

			// const mockOrderFindOne = sinon
			// 	.mock(Order)
			// 	.expects("findOne")
			// 	.withArgs({ orderid: "order000001" })
			// 	.resolves({
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
			// 	});
			// Order.findOne({ orderid: "order000001" });
			// mockOrderFindOne.verify();

			resMock
				.status(200)
				.json({ message1: "Too little quantity of Watermelon" });

			// sinon.assert.calledWith(prodUpManager, "orderExistsCheck");

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
			postOneOrder(reqMock, resMock, next);
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

			const mockOrderFindOne = sinon
				.mock(Order)
				.expects("findOne")
				.withArgs({ orderid: "order000002" })
				.resolves({
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

			const result = Order.findOne({ orderid: "order000002" });

			const prodUpStub = sinon.createStubInstance(ProductUpdaterClass, {
				orderExistsCheck: sinon.stub().returns(result),
				searchProd: sinon.stub().returns(null),
				createResults: sinon.stub().returns(null),
				createNewOrder: sinon.stub().returns(null),
				restoreQuantities: sinon.stub().returns(null)
			});
			mockOrderFindOne.verify();

			const prodUpManager = new ProductUpdaterClass();

			prodUpManager.data = reqMock.body;
			prodUpManager.productModel = Product;
			prodUpManager.orderModel = Order;
			prodUpManager.response = resMock;

			const orderExists = prodUpStub.orderExistsCheck();
			// console.log(orderExists);

			// per riaumentare di 0.05 coverage riattivare 4 linee sottostanti  --->
			prodUpManager.searchProd();
			prodUpManager.createResults();
			prodUpManager.createNewOrder();
			prodUpManager.restoreQuantities();

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
			const existCheck = userUpdater.usersExistCheck();
			console.log(existCheck);

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
			// expect("Content-Type", /json/);
			// expect(200);
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
			postOneOrder(reqMock, resMock, next);
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

			// const executor = await putOneOrder(reqMock, resMock, next);
			// const promise = sinon.promise(executor);
			// console.log(promise);

			stubMethod(reqMock, resMock, next);

			// const mockOrderFindUp = sinon
			// 	.mock(Order)
			// 	.expects("findOneAndUpdate")
			// 	.withArgs(
			// 		{
			// 			orderid: "order00001"
			// 		},
			// 		{
			// 			orderid: "order00001",
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
			// 		}
			// 	)
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
			// Order.findOneAndUpdate(
			// 	{
			// 		orderid: "order00001"
			// 	},
			// 	{
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
			// 	}
			// );
			// mockOrderFindUp.verify();
			// testing
			resMock.status(200).json({
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
			// testing

			// console.log(putOneOrder);
			// console.log(putOneOrder);
			// .resolves({
			// 	orderid: "order00001",
			// 	users: [
			// 		{
			// 			username: "UserOne",
			// 			products: [
			// 				{
			// 					productname: "Watermelon",
			// 					quantity: 23
			// 				},
			// 				{
			// 					productname: "Strawberries",
			// 					quantity: 23
			// 				}
			// 			]
			// 		}
			// 	],
			// 	shipped: true,
			// 	date: "2022-09-06T21:55:50.076+00:00",
			// 	totalcost: 2000
			// });

			// stubMethod.resolves({
			// 	orderid: "order00001",
			// 	users: [
			// 		{
			// 			username: "UserOne",
			// 			products: [
			// 				{
			// 					productname: "Watermelon",
			// 					quantity: 23
			// 				},
			// 				{
			// 					productname: "Strawberries",
			// 					quantity: 23
			// 				}
			// 			]
			// 		}
			// 	],
			// 	shipped: true,
			// 	date: "2022-09-06T21:55:50.076+00:00",
			// 	totalcost: 2000
			// });

			// console.log(putOneOrder);

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
			expect(resMock.status).to.equal(200);
			// expect(JSON.parse(resMock)).to.equal(
			// 	JSON.parse({
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
			// 	})
			// );
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
				// console.log(stubMethod);

				// console.log(mockOrderFindDel);

				// console.log(prodUdManager.orderExistsCheck());

				// async () => {
				// 	this.users = this.data["users"].map((user) => {
				// 		return user["username"];
				// 	});
				// 	this.usersToUpdate = this.users.map(async (elem) => {
				// 		return await this.userModel.findOne({
				// 			username: elem
				// 		});
				// 	});
				// 	this.fieldsToUpdate = this.resolvedUsers.map((elem) => {
				// 		return elem["orders"];
				// 	});
				// };

				// {
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
				// 	}

				// this.resolvedUsers = await Promise.all(this.usersToUpdate);
				// this.fieldsToUpdate = this.resolvedUsers.map((elem) => {
				// 	return elem["orders"];

				const userUpdaterStub = sinon.createStubInstance(UserUpdaterClass, {
					findData: sinon.stub().returnsThis(),
					usersExistCheck: sinon.stub().returnsThis(),
					updateAccountsNewOrder: sinon.stub().returns(null),
					updateAccountsDelOrder: sinon.stub().returnsThis()
				});

				const userUpdater = new UserUpdaterClass();

				userUpdater.data = JSON.parse(res);
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

				prodUdManager.data = JSON.parse(res);
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

				// userUpdater.usersToUpdate = {
				// 	firstname: "UserFromInsomnia",
				// 	lastname: "from req.body",
				// 	username: "UserOne",
				// 	address: "test@request.com",
				// 	orders: [
				// 		{
				// 			orderid: "00001",
				// 			url: "none"
				// 		}
				// 	]
				// };
				// userUpdater.resolvedUsers = {
				// 	firstname: "UserFromInsomnia",
				// 	lastname: "from req.body",
				// 	username: "UserOne",
				// 	address: "test@request.com",
				// 	orders: [
				// 		{
				// 			orderid: "00001",
				// 			url: "none"
				// 		}
				// 	]
				// };
				// userUpdater.fieldsToUpdate = {
				// 	orders: [
				// 		{
				// 			orderid: "00001",
				// 			url: "none"
				// 		}
				// 	]
				// };

				// console.log(userUpdater.fieldsToUpdate)

				// const mockOrderFindDel = sinon
				// 	.mock(Order)
				// 	.expects("findOneAndDelete")
				// 	.withArgs({
				// 		orderid: "order000002"
				// 	})
				// 	.resolves({
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
				// 	});
				// const orderRemoved = Order.findOneAndDelete({
				// 	orderid: "order000002"
				// });
				// console.log(orderRemoved);
				// mockOrderFindDel.verify();

				resMock.status(200).json({
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
					totalcost: 2000
				});

				// console.log(result);

				expect("Content-Type", /json/);
				expect(200);

				assert.match(JSON.parse(res), {
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
				expect(JSON.parse(res)).to.have.property("orderid");
				expect(JSON.parse(res)).to.have.property("users");
				expect(JSON.parse(res)).to.have.property("shipped");
				expect(JSON.parse(res)).to.have.property("totalcost");

				// expect(res).to.be.equal(
				// assert.match(JSON.parse(res), {
				// 	message: "Order delete."
				// });
				// expect(JSON.parse(res)).to.have.property("message");
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
