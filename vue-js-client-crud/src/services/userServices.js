import http from "../http-common.js";

class userServices {
	getAll() {
		return http.get("/users");
	}
	create(data) {
		return http.post("/users", data);
	}
	findByUserName(name){
		return http.get(`/users?name=${name}`);
	}
	getNumbers() {
	return http.get("/numbers");
	}
}
export default new userServices(); //new je bilo 