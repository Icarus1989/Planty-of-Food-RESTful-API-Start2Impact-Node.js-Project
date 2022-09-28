const express = require("express");

// const Order = require("../models/Order");
const Product = require("../models/Product");
// const User = require("../models/User");

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

		const prodFound = await Product.findOne({ name: label });
		// console.log(prodFound);
		// to fix --> test ok data null

		if (prodFound == null) {
			res.status(200).json({
				message: `${prodId} not exists`
			});
		} else {
			res.status(200).json(prodFound);
		}
	} catch (error) {
		// res.status(500) ?
		next(error);
	}
}
// searching bug...

async function postOneProduct(req, res, next) {
	try {
		const data = await req.body;
		const productExists = await Product.findOne({
			name: data["name"]
		});
		if (productExists == null) {
			const newProduct = new Product(await data);
			const savedProduct = await newProduct.save();
			res.status(200).json(newProduct);
		} else {
			res.status(200).json({
				message: `The product ${data["name"]} already exists.`
			});
		}
	} catch (error) {
		res.status(500).json({ message: "Error during Product saving..." });
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
