const router = require("../src/api/index");
const sinon = require("sinon");
require("./sinon-mongoose");
const referee = require("@sinonjs/referee");
const assert = referee.assert;
const { expect } = require("chai");
const { mockReq, mockRes } = require("sinon-express-mock");

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
	before(() => {
		const stub = sinon
			.stub(router, "get")
			.yields(null, { body: { message: "Welcome to Planty of Food API." } });
	});

	it("Stub for router get /", () => {
		router.get("/", (req, res) => {
			sinon.assert.calledWith(router.get, `/`);
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			resMock.status(200).json({ message: "Welcome to Planty of Food API." });
			sinon.assert.match(resMock.body, {
				message: "Welcome to Planty of Food API."
			});
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

			sinon.assert.calledWith(router.get, "/products-storage/");
			sinon.assert.calledWith(resMock.status, 200);
			sinon.assert.match(result, resMock.body);
			expect("Content-Type", /json/);
			expect(200);
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
			stubGetAllProducts(null, null, next);
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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneProduct(reqMock, resMock, next);

			const label = `${String(testProdGet)[0].toUpperCase()}${String(
				testProdGet
			).slice(1)}`;

			stubProductFindOne.withArgs({ name: "Strawberries" }).returns(res);
			const result = await Product.findOne({ name: "Strawberries" });

			resMock.status(200).json(result);

			sinon.assert.calledWith(router.get, `/products-storage/${testProdGet}`);
			sinon.assert.match(resMock.body, {
				name: "Strawberries",
				quantity: 23,
				origin: "Italy",
				price: 20.23
			});

			expect("Content-Type", /json/);
			expect(200);
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
			stubGetOneProduct(null, null, next);
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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneProduct(reqMock, resMock, next);

			const label = `${String(testProdGet)[0].toUpperCase()}${String(
				testProdGet
			).slice(1)}`;

			stubProductFindOne.withArgs({ name: label }).returns(null);
			const existence = await Product.findOne({ name: label });

			resMock.status(404).json({
				message: `Strawberries not exists`
			});

			expect("Content-Type", /json/);
			expect(404);

			sinon.assert.calledWith(router.get, `/products-storage/${testProdGet}`);
		});
	});

	it("Stub for product router get (one) - Handle Error", async () => {
		router.get(`/products-storage/${testProdGet}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubGetOneProduct(null, null, next);
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

			sinon.assert.calledWith(router.post, "/products-storage/");
			expect("Content-Type", /json/);
			expect(200);
			expect(saveStubProd.calledOnce).to.be.true;
			assert.strictEqual(JSON.stringify(result), JSON.stringify(newProduct));
		});
	});

	it("Stub for product router post - Not Exist in DB - Error during saving", async () => {
		router.post("/products-storage/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubPostOneProduct(reqMock, resMock, next);

			stubProductFindOne.withArgs({ name: "Strawberries" }).returns(null);
			const existence = Product.findOne({ name: "Strawberries" });
			saveStubProd.withArgs(new Error(), existence).rejects();
			const newProduct = new Product(reqMock.body);
			const result = newProduct.save();
			resMock.status(500).json({ message: "Error during Product saving..." });

			sinon.assert.calledWith(router.post, "/products-storage/");
			assert.isFalse(next(new Error()));
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

			sinon.assert.calledWith(router.post, "/products-storage/");
			expect("Content-Type", /json/);
			expect(200);
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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubputOneProduct(reqMock, resMock, next);

			const label = `${String(testProdPut)[0].toUpperCase()}${String(
				testProdPut
			).slice(1)}`;

			stubProductFindUp
				.withArgs({ name: "Strawberries" }, { quantity: 23 })
				.returns(res);

			const result = await Product.findOneAndUpdate(
				{ name: "Strawberries" },
				{ quantity: 23 }
			);

			resMock.status(200).json(result);

			sinon.assert.calledWith(router.put, `/products-storage/${testProdPut}`);
			sinon.assert.match(JSON.parse(res), {
				name: "Strawberries",
				quantity: 23,
				price: 20.23
			});
			expect("Content-Type", /json/);
			expect(200);
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
				message: "Product delete."
			}),
			null
		);
	});

	it("Stub for product router delete", () => {
		router.delete("/products-storage/Strawberries", async (req, res, next) => {
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
				message: "Product delete."
			});

			sinon.assert.calledWith(
				router.delete,
				`/products-storage/${testProdDelete}`
			);
			sinon.assert.match(JSON.parse(res), {
				message: "Product delete."
			});
			expect("Content-Type", /json/);
			expect(200);
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
			{
				body: body
			},
			null
		);
	});

	it("Stub for user router get (all)", async () => {
		router.get("/users/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllUsers(reqMock, resMock, next);

			const stubUserFind = sinon.stub(User, "find").withArgs({}).resolves(body);
			const result = await User.find({});

			resMock.status(200).json(result);

			assert.isArray(res.body);
			sinon.assert.calledWith(router.get, "/users/");
			sinon.assert.match(result, resMock.body);

			expect("Content-Type", /json/);
			expect(200);
			const elements = result;
			elements.map((user) => {
				expect(user).to.have.property("firstname");
				expect(user).to.have.property("lastname");
				expect(user).to.have.property("username");
				expect(user).to.have.property("address");
				expect(user).to.have.property("orders");
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

			resMock.status(200).json(existence);

			sinon.assert.calledWith(router.get, `/users/${testUserGet}`);
			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.match(JSON.parse(res), {
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
			stubGetOneUser(null, null, next);
		});
	});

	after(() => {
		stubUserFindOne.restore();
		router.get.restore();
	});
});

describe("Stub router user Get One - User not found", async () => {
	const testUserGet = "User99";

	before(() => {
		const stub = sinon.stub(router, "get").yields(
			{ params: testUserGet },
			{
				message: `User99 not found.`
			},
			null
		);
	});

	it("Stub for user router get (one)", async () => {
		router.get(`/users/${testUserGet}`, async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(404);
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneUser(req, res, next);

			stubUserFindOne.withArgs({ username: "User99" }).returns(null);
			const existence = await User.findOne({ username: "User99" });

			resMock.status(404).json({ message: `User99 not found.` });

			sinon.assert.calledWith(router.get, `/users/${testUserGet}`);
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

			resMock.status(200).json(result);

			sinon.assert.calledWith(router.post, `/users/`);
			sinon.assert.match(res, {
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
			expect("Content-Type", /json/);
			expect(200);
			expect(saveStubUser.calledOnce).to.be.true;
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

			sinon.assert.calledWith(router.post, "/users/");
			sinon.assert.match(resMock, {
				message: `The user User1 already exists.`
			});
			expect("Content-Type", /json/);
			expect(200);
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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubPutOneUser(reqMock, resMock, next);

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

			resMock.status(200).json(result);

			sinon.assert.calledWith(router.put, `/users/${testUserPut}`);
			sinon.assert.match(JSON.parse(res), {
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
			expect("Content-Type", /json/);
			expect(200);
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
			stubPutOneUser(null, null, next);
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
			{
				body: {
					firstname: "userTestOne",
					lastname: "for Sinon Testing",
					username: "User1",
					address: "test@sinon.com",
					orders: []
				}
			},
			null
		);
	});
	it("Stub for user router delete", async () => {
		router.delete(
			`/products-storage/${testUserDelete}`,
			async (req, res, next) => {
				const reqMock = mockReq(req);
				const resMock = mockRes(res);
				stubDeleteOneUser(reqMock, resMock, next);

				stubUserFindOneDelete.withArgs({ username: "User1" }).returns({
					firstname: "userTestOne",
					lastname: "for Sinon Testing",
					username: "User1",
					address: "test@sinon.com",
					orders: []
				});
				const result = await User.findOneAndDelete({ username: "User1" });

				resMock.status(200).json(result);

				sinon.assert.calledWith(
					router.delete,
					`/products-storage/${testUserDelete}`
				);
				sinon.assert.match(resMock.body, result);
				expect("Content-Type", /json/);
				expect(200);
			}
		);
	});
	it("Stub for user router delete - Handle Error", async () => {
		router.delete(`/users/${testUserDelete}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = new Error();
			stubDeleteOneUser(null, null, next);
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

const orderClassStub = sinon.createStubInstance(OrderManagerClass);

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
			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.calledWith(router.get, "/orders-archieve/");

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			stubOrderFind.withArgs({}).returns(resMock.body);
			const result = await Order.find({});

			orderClassStub.determinate = sinon.stub().returns(result);
			orderClassStub.ordering = sinon.stub().returns(result);
			orderClassStub.createResponse = sinon
				.stub()
				.withArgs(result)
				.returns(resMock.status(200).json(result));
			orderClassStub.parametersHandling = sinon.stub().returns(result);

			const orderManagerv8 = new OrderManagerClass();

			orderManagerv8.response = await result;
			orderManagerv8.data = await result;
			orderManagerv8.filterQuery = "date";
			orderManagerv8.valueQuery = "2022-09-06T21:55:50.076+00:00";
			orderManagerv8.orderByQuery = undefined;
			orderManagerv8.sortQuery = undefined;

			await orderManagerv8.parametersHandling();
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
			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.calledWith(router.get, "/orders-archieve/");

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			stubOrderFind.withArgs({}).returns(results);

			const result = await Order.find({});

			orderClassStub.response = await result;
			orderClassStub.data = await result;
			orderClassStub.filterQuery = reqMock.params.filter;
			orderClassStub.valueQuery = reqMock.params.value;
			orderClassStub.orderByQuery = reqMock.params.orderBy;
			orderClassStub.sortQuery = reqMock.params.sort;

			orderClassStub.determinate = sinon.stub().returns(result);
			orderClassStub.ordering = sinon.stub().returns(result);
			orderClassStub.createResponse = sinon
				.stub()
				.withArgs(result)
				.returns(resMock.status(200).json(result));
			orderClassStub.parametersHandling = sinon.stub().returns(result);

			const orderManagerv7 = new OrderManagerClass();

			orderManagerv7.response = await result;
			orderManagerv7.data = await result;
			orderManagerv7.filterQuery = "orderid";
			orderManagerv7.valueQuery = "order00001";
			orderManagerv7.orderByQuery = undefined;
			orderManagerv7.sortQuery = undefined;

			await orderManagerv7.parametersHandling();
			// orderClassStub.parametersHandling();
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
			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.calledWith(router.get, "/orders-archieve/");

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			const result = await Order.find({});

			orderClassStub.response = await result;
			orderClassStub.data = await result;
			orderClassStub.filterQuery = reqMock.params.filter;
			orderClassStub.valueQuery = reqMock.params.value;
			orderClassStub.orderByQuery = reqMock.params.orderBy;
			orderClassStub.sortQuery = reqMock.params.sort;

			orderClassStub.determinate = sinon.stub().returns(result);
			orderClassStub.ordering = sinon.stub().returns(result);
			orderClassStub.createResponse = sinon
				.stub()
				.withArgs(result)
				.returns(resMock.status(200).json(result));
			orderClassStub.parametersHandling = sinon.stub().returns(result);

			const orderManagerv6 = new OrderManagerClass();

			orderManagerv6.response = await result;
			orderManagerv6.data = await result;
			orderManagerv6.filterQuery = "orderid";
			orderManagerv6.valueQuery = "order00001";
			orderManagerv6.orderByQuery = "orderid";
			orderManagerv6.sortQuery = "increasing";

			await orderManagerv6.parametersHandling();
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
			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.calledWith(router.get, "/orders-archieve/");

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			stubOrderFind.withArgs({}).returns(results);

			const result = await Order.find({});

			orderClassStub.response = await result;
			orderClassStub.data = await result;
			orderClassStub.filterQuery = reqMock.params.filter;
			orderClassStub.valueQuery = reqMock.params.value;
			orderClassStub.orderByQuery = reqMock.params.orderBy;
			orderClassStub.sortQuery = reqMock.params.sort;

			orderClassStub.determinate = sinon.stub().returns(result);
			orderClassStub.ordering = sinon.stub().returns(result);
			orderClassStub.createResponse = sinon
				.stub()
				.withArgs(result)
				.returns(resMock.status(200).json(result));
			orderClassStub.parametersHandling = sinon.stub().returns(result);

			const orderManagerv5 = new OrderManagerClass();

			orderManagerv5.response = await result;
			orderManagerv5.data = await result;
			orderManagerv5.filterQuery = reqMock.params.filter;
			orderManagerv5.valueQuery = reqMock.params.value;
			orderManagerv5.orderByQuery = reqMock.params.orderBy;
			orderManagerv5.sortQuery = reqMock.params.sort;

			await orderManagerv5.parametersHandling();
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
			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.calledWith(router.get, "/orders-archieve/");

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			stubOrderFind.withArgs({}).returns(results);
			const result = await Order.find({});

			orderClassStub.determinate = sinon.stub().returns(result);
			orderClassStub.ordering = sinon.stub().returns(result);
			orderClassStub.createResponse = sinon
				.stub()
				.withArgs(result)
				.returns(resMock.status(200).json(result));
			orderClassStub.parametersHandling = sinon.stub().returns(result);

			const orderManagerv4 = new OrderManagerClass();

			orderManagerv4.response = await result;
			orderManagerv4.data = await result;
			orderManagerv4.filterQuery = "date";
			orderManagerv4.valueQuery = "2022-09-06T21:55:50.076+00:00";
			orderManagerv4.orderByQuery = "orderid";
			orderManagerv4.sortQuery = "decreasing";

			await orderManagerv4.parametersHandling();
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
			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.calledWith(router.get, "/orders-archieve/");

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			stubOrderFind.withArgs({}).returns(results);

			const result = await Order.find({});

			orderClassStub.response = await result;
			orderClassStub.data = await result;
			orderClassStub.filterQuery = reqMock.params.filter;
			orderClassStub.valueQuery = reqMock.params.value;
			orderClassStub.orderByQuery = reqMock.params.orderBy;
			orderClassStub.sortQuery = reqMock.params.sort;

			orderClassStub.determinate = sinon.stub().returns(result);
			orderClassStub.ordering = sinon.stub().returns(result);
			orderClassStub.createResponse = sinon
				.stub()
				.withArgs(result)
				.returns(resMock.status(200).json(result));
			orderClassStub.parametersHandling = sinon
				.stub()
				.callsFake(function fakeGetAll() {
					orderClassStub.ordersArchived = orderClassStub.determinate();
					orderClassStub.ordering();
					orderClassStub.createResponse();
				});
			const orderManagerv3 = new OrderManagerClass();

			orderClassStub.determinate();
			orderClassStub.ordering();
			orderClassStub.parametersHandling();
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
				body: {
					message: `Need a &sort= parameter for search...`
				}
			},
			null
		);
	});

	it("Stub for router order get (all) - miss sort param", () => {
		router.get("/orders-archieve/", async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			sinon.assert.calledWith(router.get, "/orders-archieve/");

			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetAllOrders(reqMock, resMock, next);

			stubOrderFind.withArgs({}).returns(results);

			const savedResult = await Order.find({});

			orderClassStub.determinate = sinon.stub().returns(savedResult);
			orderClassStub.ordering = sinon.stub().returns(null);
			orderClassStub.createResponse = sinon.stub().returns(null);
			orderClassStub.missParam = sinon
				.stub()
				.withArgs("&sort= ")
				.returns(
					resMock.status(400).json({
						message: `Need a &sort= parameter for search...`
					})
				);
			orderClassStub.parametersHandling = sinon
				.stub()
				.returns(orderClassStub.missParam());

			const orderManagerv2 = new OrderManagerClass();
			orderManagerv2.response = await savedResult;
			orderManagerv2.data = await savedResult;
			orderManagerv2.filterQuery = "productname";
			orderManagerv2.valueQuery = "strawberries";
			orderManagerv2.orderByQuery = "orderid";
			orderManagerv2.sortQuery = undefined;
			orderManagerv2.determinate();
			orderManagerv2.ordering();
			orderManagerv2.createResponse();
			orderManagerv2.parametersHandling();
			orderManagerv2.missParam();
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
		router.get("/orders-archieve/", async (req, res, next) => {
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
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

			orderClassStub.response = await result;
			orderClassStub.data = await result;
			orderClassStub.filterQuery = reqMock.params.filter;
			orderClassStub.valueQuery = reqMock.params.value;
			orderClassStub.orderByQuery = reqMock.params.orderBy;
			orderClassStub.sortQuery = reqMock.params.sort;

			orderClassStub.determinate = sinon.stub().returns(result);
			orderClassStub.ordering = sinon.stub().returns(result);
			orderClassStub.createResponse = sinon
				.stub()
				.withArgs(result)
				.returns(resMock.status(200).json(result));
			orderClassStub.parametersHandling = sinon
				.stub()
				.callsFake(function fakeGetAll() {
					orderClassStub.ordersArchived = orderClassStub.determinate();
					orderClassStub.ordering();
					orderClassStub.createResponse();
				});

			await orderClassStub.parametersHandling();

			expect("Content-Type", /json/);
			expect(200);

			assert.isArray(resMock.body);
			const orders = resMock.body;
			orders.map((order) => {
				expect(order).to.have.property("orderid");
				expect(order).to.have.property("users");
				expect(order).to.have.property("shipped");
				expect(order).to.have.property("date");
				expect(order).to.have.property("totalcost");
			});

			sinon.assert.calledWith(router.get, "/orders-archieve/");
			sinon.assert.match(resMock.body, result);
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
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneOrder(reqMock, resMock, next);

			stubOrderFindOne.withArgs({ orderid: "order000001" }).returns(res);
			const result = await Order.findOne({ orderid: "order000001" });

			resMock.status(200).json(result);

			sinon.assert.calledWith(router.get, `/orders-archieve/${testOrderGet}`);
			sinon.assert.match(resMock.body, {
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

			expect("Content-Type", /json/);
			expect(200);
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
			expect(404);
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneOrder(reqMock, resMock, next);

			stubOrderFindOne.withArgs({ orderid: testOrderGet }).returns(null);
			const existence = await Order.findOne({ orderid: testOrderGet });

			resMock.status(404).json({
				message: `order000001 not exists`
			});
			sinon.assert.calledWith(router.get, `/orders-archieve/${testOrderGet}`);
		});
	});

	it("Stub for router order get (one) - Handle Error", async () => {
		router.get(`/orders-archieve/${testOrderGet}`, async (req, res, next) => {
			expect(500);
			const reqMock = mockReq(req);
			const resMock = mockRes(res);
			stubGetOneOrder(null, null, next);
			resMock.status(500).json({ message: `Error in searching order` });
		});
	});

	after(() => {
		stubOrderFindOne.restore();
		router.get.restore();
	});
});

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

			userUpdaterStubExt.findData = sinon.stub().callsFake(function fakefD() {
				userUpdaterStubExt.usersArr = [];
				userUpdaterStubExt.usersArr.push({
					name: "User23",
					data: stubUserFindOne.withArgs({ username: "User23" }).returns(null)
				});
				return userUpdaterStubExt.usersArr;
			});

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

			resMock.status(200).json({ message0: "User23 not exist." });

			sinon.assert.calledWith(router.post, "/orders-archieve/");
			sinon.assert.match(res, { message0: "User23 not exist." });
			expect("Content-Type", /json/);
			expect(200);
			expect(res).to.have.property("message0");
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

			sinon.assert.calledWith(router.post, "/orders-archieve/");
			sinon.assert.match(resMock.body, {
				message: "OrderId already exists"
			});
			expect("Content-Type", /json/);
			expect(200);
			expect(resMock.body).to.have.property("message");
			assert.strictEqual(resMock.body, {
				message: "OrderId already exists"
			});
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

			prodUpStubExt.searchProd = sinon.stub().callsFake(async function fn() {
				prodUpStubExt.permissions = [];
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
				const testOne = await Product.findOne({
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
				const testTwo = await Product.findOne({
					name: "Strawberries"
				});

				prodUpStubExt.prodsToUpArray.push(testOne);
				prodUpStubExt.prodsToUpArray.push(testTwo);

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

			prodUpStubExt.createResults = sinon
				.stub()
				.callsFake(async function fnTwo() {
					prodUpStubExt.results = [
						{
							productname: "Watermelon",
							response: "negative",
							message: "Too little quantity of Watermelon"
						},
						{
							productname: "Strawberries",
							response: "positive",
							quantity: 23
						}
					];
					prodUpStubExt.negativeArr = [];
					prodUpStubExt.negativeArr.push({
						message: "Too little quantity of Watermelon"
					});
				});

			prodUpStubExt.createNewOrder = sinon.stub().returns(1);

			prodUpStubExt.restoreQuantities = sinon.stub().returns(null);

			const prodUpManager = new ProductUpdaterClass();

			userUpdaterStubExt.findData();
			userUpdaterStubExt.usersExistCheck();

			prodUpStubExt.orderExistsCheck();
			prodUpStubExt.searchProd();
			prodUpStubExt.createResults();
			prodUpStubExt.createNewOrder();

			sinon.assert.calledWith(router.post, "/orders-archieve/");
			sinon.assert.match(res, {
				message0: `Too little quantity of Watermelon`
			});
			expect("Content-Type", /json/);
			expect(200);
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
	before(async () => {
		const delOrd = await prodUpStubExt.orderModel.findOneAndDelete({
			orderid: "order000098"
		});

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

			userUpdaterStubExt.findData();
			userUpdaterStubExt.usersExistCheck();
			prodUpStubExt.orderExistsCheck();
			prodUpStubExt.searchProd();
			prodUpStubExt.createResults();
			prodUpStubExt.createNewOrder();

			userUpdaterStubExt.updateAccountsNewOrder();

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

			sinon.assert.calledWith(router.post, "/orders-archieve/");
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
				body: {
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

			resMock.status(200).json(result);

			sinon.assert.calledWith(router.put, `/orders-archieve/${testOrderPut}`);
			sinon.assert.match(resMock.body, result);
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
	const testOrderDelete = "000098";

	before(() => {
		// stubProductFindUp.restore();

		const stub = sinon.stub(router, "delete").yields(
			{ params: { ordnum: "000098" } },
			{
				body: {
					message: "Order delete."
				}
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

				const orderNumber = req.params.ordnum;
				const orderId = `order${String(orderNumber)}`;
				const stubOrderFindDel = sinon
					.stub(Order, "findOneAndDelete")
					.withArgs({
						orderid: orderId
					})
					.returns({
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
						totalcost: 769.58
					});
				const orderRemoved = await Order.findOneAndDelete({
					orderid: "order000098"
				});

				userUpdaterStubExt.data = await orderRemoved;
				userUpdaterStubExt.userModel = User;
				userUpdaterStubExt.orderModel = Order;
				userUpdaterStubExt.response = res;

				userUpdaterStubExt.findData = sinon.stub().returns(null);
				userUpdaterStubExt.usersExistCheck = sinon.stub().returns(null);
				userUpdaterStubExt.updateAccountsNewOrder = sinon.stub().returns(null);
				userUpdaterStubExt.updateAccountsDelOrder = sinon
					.stub()
					.callsFake(function fakeUpdate() {
						stubUserFindOne.withArgs({ username: "User1" }).returns({
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
						});
						userUpdaterStubExt.usersToUpdate = User.findOne({
							username: "User1"
						});
						stubUserFindUp
							.withArgs({ username: "User1" }, { orders: [] })
							.returns({
								firstname: "UserFromInsomnia",
								lastname: "from req.body",
								username: "User1",
								address: "test@request.com",
								orders: []
							});
						userUpdaterStubExt.result = User.findOneAndUpdate(
							{ username: "User1" },
							{ orders: [] }
						);
					});

				const userUpdater = new UserUpdaterClass();

				prodUpStubExt.data = await orderRemoved;
				prodUpStubExt.productModel = Product;
				prodUpStubExt.orderModel = Order;
				prodUpStubExt.response = res;

				prodUpStubExt.orderExistsCheck = sinon.stub().returnsThis();
				prodUpStubExt.searchProd = sinon.stub().returnsThis();
				prodUpStubExt.createResults = sinon.stub().returnsThis();
				prodUpStubExt.createNewOrder = sinon.stub().returnsThis();
				prodUpStubExt.restoreQuantities = sinon
					.stub()
					.callsFake(async function fakeUpdate() {
						for (let user of prodUpStubExt.data["users"]) {
							for (let product of user["products"]) {
								stubProductFindOne.withArgs({ name: product["productname"] });
								prodUpStubExt.oldQuantity = await Product.findOne({
									name: product["productname"]
								});

								stubProductFindUp
									.withArgs(
										{ name: product["productname"] },
										{
											quantity:
												product["quantity"] +
												prodUpStubExt.oldQuantity["quantity"]
										}
									)
									.returns({
										name: product["productname"],
										quantity:
											product["quantity"] +
											prodUpStubExt.oldQuantity["quantity"],
										origin: "Italy",
										price: prodUpStubExt.oldQuantity["price"]
									});

								prodUpStubExt.productUpdate = await Product.findOneAndUpdate(
									{
										name: product["productname"]
									},
									{
										quantity:
											prodUpStubExt.oldQuantity["quantity"] +
											product["quantity"]
									}
								);
							}
						}
					});

				const prodUdManager = new ProductUpdaterClass();

				userUpdaterStubExt.updateAccountsDelOrder();

				prodUpStubExt.orderExistsCheck();
				prodUpStubExt.searchProd();
				prodUpStubExt.createResults();
				prodUpStubExt.createNewOrder();
				prodUpStubExt.restoreQuantities();

				resMock.status(200).json({
					message: "Order delete."
				});

				sinon.assert.calledWith(
					router.delete,
					`/orders-archieve/${testOrderDelete}`
				);
				sinon.assert.match(resMock.body, {
					message: "Order delete."
				});

				expect("Content-Type", /json/);
				expect(200);
				expect(resMock.body).to.have.property("message");
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
				stubDeleteOneOrder(null, null, next);
			}
		);
	});

	after(() => {
		Order.findOneAndDelete.restore();

		router.delete.restore();
	});
});

// ----------- Order tests
