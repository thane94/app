module.exports = app => {
	const users = require("../controllers/customer.controller.js");
	
	var router = require("express").Router();
	
	// Kreiranje korisnika
		app.post("/users", users.create);
		
	// Vračanje svih korisnika
		app.get("/users", users.findAll);
		
	// Vračanje pojedinačnog korisnika putem ID
		app.get("/users/:userId", users.findOne);
		
	// Update korisnika
		app.put("/users/:userId", users.update);
	
	// Brisanje korisnika
		app.delete("/users/:userId", users.delete);
	
	// Brisanje svih korisnika
		app.delete("/users", users.deleteAll);
	app.use('/users', router);
};