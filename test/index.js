const routerProduct = require("../src/api/routes/products");
const routerOrder = require("../src/api/routes/orders");
const routerUser = require("../src/api/routes/users");

const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const assert = referee.assert;
const { expect } = require("chai");
