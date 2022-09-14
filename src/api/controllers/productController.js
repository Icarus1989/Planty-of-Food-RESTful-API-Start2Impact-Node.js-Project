const express = require("express");

const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const {
	OrderManagerClass,
	ProductUpdaterClass,
	UserUpdaterClass
} = require("../routes/classes");

async function getAllProducts(req, res, next) {
	try {
		const savedProducts = await Product.find({});
		res.status(200).json(savedProducts);
	} catch (error) {
		next(error);
	}
}

async function getOneProduct(req, res, next) {
	try {
		const prodId = await req.params.prodId;
		const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(
			1
		)}`;
		Product.find({ name: label }, (err, data) => {
			// gestire error con 404 o altro
			res.status(200).json(data);
		});
	} catch (error) {
		next(error);
	}
}

async function postOneProduct(req, res, next) {
	try {
		const data = await req.body;
		const productExists = await Product.findOne({
			name: data["name"]
		});
		if (productExists == null) {
			const newProduct = new Product(await data);
			newProduct.save((err, doc) => {
				if (err) {
					console.log(err);
				}
				console.log("Data entered");
			});
			res.status(200).json(newProduct);
		} else {
			res.status(200).json({
				message: `The product ${data["name"]} already exists.`
			});
		}
	} catch (error) {
		next(error);
	}
}

async function putOneProduct(req, res, next) {
	try {
		const data = await req.body;
		const prodId = await req.params.prodId;
		const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(
			1
		)}`;
		const productChanged = await Product.findOneAndUpdate(
			{ name: label },
			data,
			{
				new: true
			}
		);
		res.status(200).json(productChanged);
	} catch (error) {
		next(error);
	}
}

async function deleteOneProduct(req, res, next) {
	try {
		const prodId = req.params.prodId;
		const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(
			1
		)}`;
		const productRemoved = await Product.findOneAndDelete({
			name: label
		});
		res.status(200).json(productRemoved);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAllProducts,
	getOneProduct,
	postOneProduct,
	putOneProduct,
	deleteOneProduct
};
