// const routerProduct = require("../src/api/routes/products");
// const routerOrder = require("../src/api/routes/orders");
// const routerUser = require("../src/api/routes/users");
// oppure -->
const router = require("../src/api/index");

const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const assert = referee.assert;
const { expect } = require("chai");

// ----------- Product tests

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
	});
	it("Stub for product router get (all)", async () => {
		router.get("/products-storage/", (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
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

describe("Stub router product Get One", async () => {
	const testProdGet = "Strawberries";
	before(() => {
		const stub = sinon
			.stub(router, "get")
			.yields(
				{ params: testProdGet },
				JSON.stringify({ name: "Strawberries", quantity: 23, price: 20.23 }),
				null
			);
	});
	it("Stub for product router get (one)", async () => {
		router.get(`/products-storage/${testProdGet}`, (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
			// res contiente req.params
			assert.match(JSON.parse(res), { name: testProdGet });
			expect(JSON.parse(res)).to.have.property("name");
			expect(JSON.parse(res)).to.have.property("quantity");
			expect(JSON.parse(res)).to.have.property("price");
		});
	});
	after(() => {
		router.get.restore();
	});
});

describe("Stub router product Post", async () => {
	const testProdPost = "Strawberries";
	before(() => {
		const stub = sinon.stub(router, "post").yields(
			{
				body: JSON.stringify({
					name: "Strawberries",
					quantity: 23,
					price: 10.23
				})
			},
			JSON.stringify({
				name: "Strawberries",
				quantity: 23,
				price: 10.23
			}),
			null
		);
	});
	it("Stub for product router post", async () => {
		router.post("/products-storage/", async (req, res, next) => {
			expect("Content-Type", /json/);
			expect(200);
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
			expect("Content-Type", /json/);
			expect(200);
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
			expect("Content-Type", /json/);
			expect(200);
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

// describe("Stub router user Put", async () => {
// 	before(() => {});
// 	it(() => {});
// 	after(() => {});
// });

// describe("Stub router user Delete One", async () => {
// 	before(() => {});
// 	it(() => {});
// 	after(() => {});
// });

// // ----------- User tests

// // ----------- Order tests

// describe("Stub router order Get All", async () => {
// 	before(() => {});
// 	it(() => {});
// 	after(() => {});
// });

// describe("Stub router order Get One", async () => {
// 	before(() => {});
// 	it(() => {});
// 	after(() => {});
// });

// describe("Stub router order Post", async () => {
// 	before(() => {});
// 	it(() => {});
// 	after(() => {});
// });

// describe("Stub router order Put", async () => {
// 	before(() => {});
// 	it(() => {});
// 	after(() => {});
// });

// describe("Stub router order Delete One", async () => {
// 	before(() => {});
// 	it(() => {});
// 	after(() => {});
// });

// // ----------- Order tests
