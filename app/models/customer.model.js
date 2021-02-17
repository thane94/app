const sql = require("./db.js");

const User = function(user) {
	this.Ime = user.Ime;
	this.Prezime = user.Prezime;
	this.Adresa = user.Adresa;
	this.DatumPrvogUnosa = user.DatumPrvogUnosa;
};


User.getNumber = (numberId, result) => {
	sql.query(`Select Broj AS Number FROM PhoneNumber INNER JOIN User IDkorisnik ON PhoneNumber.korisnikID = IDkorisnik WHERE korisnikID=${numberId}`,(err,res) => {
		if(err) {
			console.log("Error:", err);
			result(err, null);
			return;
		}
		if(res.length) {
			console.log("Found users number: ", res);
			result (null, res);
			return;
		}
		result({kind: "not_found"}, null);
	});

};

User.getNumbers = result => {
	sql.query("SELECT * FROM PhoneNumber", (err, res) => {
		if(err) {
			console.log("ERROR: ", err);
			result(null, err);
			return;
		} 
		
		console.log("Phone number: ", res);
		result(null, res);
	});
};

User.create = (newUser, result) => {
	sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
		if(err) {
			console.log("ERROR: ", err);
			result(err, null);
			return;
		}
		console.log("Created User: ", {id: res.insertId, ...newUser});
		result(null,{id:res.insertId, ...newUser});
	});
};

User.findById = (userId, result) => {
	sql.query(`SELECT * FROM User WHERE IDkorisnik = ${userId}`, (err, res) => {
		if(err) {
			console.log("ERROR: ", err);
			result(err, null);
			return;
		}
		
		if(res.length) {
			console.log("FOUND User: ", res[0]);
			result(null, res[0]);
			return;
		}
		reuslt({kind: "not_found"}, null);
	});
};
var now = new Date();

User.getAll = result => {
	sql.query("SELECT * FROM User", (err, res) => {
		if(err) {
			console.log("ERROR: ", err);
			result(null, err);
			return;
		} 
		console.log("User: ", res);
		result(null, res);
	});
};

User.updateById = (id, user, result) => {
	sql.query(
		"UPDATE User SET Ime = ?, Prezime = ?, Adresa = ?, DatumPrvogUnosa = ? WHERE IDkorisnik = ?",
		[user.Ime, user.Prezime, user.Adresa, user.DatumPrvogUnosa, id],
		(err, res) => {
			if(err) {
				console.log("ERROR: ", err);
				result(null, err);
				return;
			}
			
			if(res.affectedRows == 0) {
				result({kind: "not_found"}, null);
				return;
			}
			console.log("updated user: ", {id: id,...user});
			result(null, {id: id, ...user});
		}
	);
};

User.remove = (id, result) => {
	sql.query("DELETE FROM User Where IDkorisnik = ?", id, (err,res) => {
		if(err) {
			console.log("ERROR: ", err);
			result(null, err);
			return;
		}
		
		if(res.affectedRows == 0) {
			result({kind: "not_found"}, null);
			return;
		}
		
		console.log("DELETED USER WITH ID: ", id);
		result(null, res);
	});
};

User.removeAll = result => {
	sql.query("DELETE FROM User", (err, res) => {
		if(err) {
			console.log("ERROR: ", err);
			result(null, err);
			return;
		}
		console.log(`DELETED ${res.affectedRows} users`);
		result(null, res);
	});
};
module.exports = User;