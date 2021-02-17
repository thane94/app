import http from "../http-common.js";

class userServices {
	getAll() {
		return http.get("/users");
	}
	get(id) {
		return http.get(`/users/${id}`);
	}
	create(data) {
		return http.post("/users", data);
	}
	findUser(user){
		return http.get(`/users?user=${user}`);
	}
	getNumbers() {
	return http.get("/numbers");
	}
	getNumber(id) {
		return http.get(`/numbers/${id}`);
	}
}
export default new userServices(); //new je bilo 