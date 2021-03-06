const User = require ("../models/customer.model.js");
const PhoneNumber = ("../models/customer.model.js");
// Kreiranje i spremanje novog korisnika
	exports.create=(req, res) => {
		if(!req.body) {
			res.status(400).send({
				message: "Content cant be empty!"
			});
		}
		
		const user = new User({
			Ime: req.body.Ime,
			Prezime: req.body.Prezime,
			Adresa: req.body.Adresa,
			DatumPrvogUnosa: req.body.DatumPrvogUnosa
		});
		
		User.create(user, (err,data) =>{
			if(err)
				res.status(500).send({
					message:
						err.message || "ERROR"
				});
				else res.send(data);
		});
	};
// Slanje poruke
const fs = require('fs');
const{ runInNewContext } = require("vm");
const { resolveSoa } = require("dns");
const { query } = require("express");

exports.message = (req, res) => {
	if(!req.body ||!req.body.numbers || !req.body.message || !req.body.firstName || !req.body.lastName) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	const message = 'Datum: ' + Date.now() + '\n'
				  + 'Pošiljatelj: ' + req.body.firstName + ' ' + req.body.lastName + '\n'
				  + 'Broj: ' + req.body.numbers + '\n'
				  + 'Poruka: ' + req.body.message + '\n\n';

	fs.writeFile('datoteka.txt', message, {'flag':'a'}, function(err){
		if(err) {
			return console.error(err);
		}
		res.status(200).json({
			message:
				'Succesfully wrote data in file'
		});
	});
};

// Pretraga korisnika po imenu

// Lista brojeva

exports.listNumbers = (req, res) => {
	User.getNumbers((err, data) => {
		if (err)
			res.status(500).send ({
				message: 
					err.message || "Some error occured while retrieving the numbers"
			});
			else res.send(data);
	});
};

// Vračanje svih korisnika iz baze 
	exports.findAll = (req, res) => {
		User.getAll((err, data) => {
			if(err)
				res.status(500).send ({
					message:
						err.message || "Some error occured whle retrieving the Users"
				});
			else res.send(data);
		});
	};
	
// Traženje pojedinog korisnika putem ID-a 
	exports.findOne = (req, res) => {
	User.findById(req.params.userId, (err, data)=>{
		if(err) {
			if(err.kind==="not_found") {
				res.status(404).send({
					message: `Not found User with ID ${req.params.userId}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving User with id "+req.params.userId
					});
				}
			} else res.send(data);
		});
	};

exports.number = (req, res) => {
	User.getNumber(req.params.numberId, (err,data)=>{
		if(err) {
			if(err.kind==="not_found") {
				res.status(404).send({
					message: `Not found number ${req.params.numberId}.`
				});
			} else {
				res.status(500).send ({
					message: "Error retrieveing data "+req.params.numberId
				});
			}
		} else res.send(data);
	});
};

// Update korisnika
	exports.update = (req, res) => {
		if(!req.body) {
			res.status(400).send({
				message: "Content can not be empty!"
			});
		}
		
		User.updateById(
			req.params.userId, new User(req.body), (err, data) => {
				if(err){
					if(err.kind === "not_found") {
						res.status(404).send({
							message: `NOT FOUND CUSTOMER WITH ID ${req.params.userId}.`
						});
					} else {
						res.status(500).send({
							message: "Error updating User with ID "+req.params.userId
						});
					}
				} else res.send(data);
			}
		);
	};

//Brisanje pojedinog korisnika
	exports.delete = (req, res) => {
		User.remove(req.params.userId, (err, data)=>{
			if(err) {
				if(err.kind==="not_found"){
					res.status(404).send({
						message: `Not found User with id ${req.params.userId}.`
					});
				} else {
					res.status(500).send({
						message: "Could not delete User with id: "+req.params.userId
					});
				}
			} else res.send({message: `User was deleted successfully.`});
		});
	};
	
// Brisanje svih korisnika
	exports.deleteAll = (req, res) => {
		User.removeAll((err, data) => {
			if(err)
				res.status(500).send({
					message:
						err.message || "Some error occured while removing all Users."
				});
			else res.send({message: `All users have been deleted!`});
		});
	};