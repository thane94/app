<template>
	<div v-if = "currentUser" class="edit-form">
		<h4>User</h4>
			<form>
				<div class = "form-group">
					<label for = "name">Name</label>
					<input type = "text" class = "form-control" id = "name"
					v-model = "currentUser.Ime"
					/>
				</div>
				<div class = "form-group">
					<label for = "lastName">Last name</label>
					<input type = "text" class = "form-control" id = "lastName"
					v-model = "currentUser.Prezime" 
					/>
				</div>
				<div class = "form-group">
					<label for = "address">Address</label>
					<input type="text" class = "form-control" id="address"
						v-model = "currentUser.Adresa"
					/>
				</div>
				<div class = "form-group">
					<label for = "phoneNumber">Phone number</label>
					<input type = "text" class = "form-control" id = "phoneNumber"
						v-model = "currentUser.Broj"
					/>
				</div>
			</form>
	</div>

</template>

<script>
	import userServices from "../services/userServices.js";
	export default {
		name: "user",
		data() {
			return {
				currentUser: null,
				phoneNumber: null
			};
		},

		methods: {
			getUser(id) {
				userServices.get(id)
				.then(response => {
					this.currentUser = response.data;
					console.log(response.data);
				})
				.catch(e => {
					console.log(e);
				});
			},
			getForUser(id) {
				userServices.getNumber(id)
					.then(response => {
						this.phoneNumber = response.data;
						console.log(response.data);
					})
				.catch(e => {
					console.log(e);
				});
			}
		},
		created() {
			this.getUser(this.$route.params.id);
			this.getForUser(this.$route.params.id);
		}
	};
</script>

<style>
	.edit-form {
		max.width: 300px;
		margin: auto;
	}
</style>