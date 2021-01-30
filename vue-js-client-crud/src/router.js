import { createWebHistory, createRouter } from "vue-router";
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			alias: "/users",
			name: "users",
			component: () => import("./components/usersList")
		},
		{
		path: "/add",
		name: "add",
		component: () => import("./components/addUser")
		},
		{
			path: "/message",
			name: "message",
			component: () => import("./components/message")
		}
	]
});
export default router;