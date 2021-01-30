<template>
	<div class="submit-form">
		<div v-if="!submitted">
			<div class="form-group">
				<label for="Ime">Name</label>
				<input
					type="text"
					class="form-control"
					id="name"
					required
					v-model="user.Ime"
					name="name"
				/>
			</div>
			<div class="form-group">
				<label for="Prezime">Last name</label>
				<input
					class="form-control"
					id="lastName"
					required
					v-model="user.Prezime"
					name="lastName"
				/>
			</div>
			<div class="form-group">
				<label for="Adresa">Address</label>
				<input
					class="form-control"
					id="address"
					required
					v-model="user.Adresa"
					name="address"
				/>
			</div>
			<div class="form-group">
				<label for="DatumPrvogUnosa">Date:</label>
				<input
					type="date"
					id="date"
					required
					v-model="user.DatumPrvogUnosa"
					name="date"
				/>
			</div>
		<button @click="saveUser" class="btn btn-success">Submit</button>
	</div>

	<div v-else>
		<h4>You have submitted User</h4>
		<button class="btn btn-success" @click="newUser">Add</button>
	</div>
</div>
</template>

<script>
	import userServices from "../services/userServices"

	export default {
		name: "add-user",
		data() {
			return {
				user: {
					id: null,
					name: "",
					lastName: "",
					address: "",
					date: "",
					published: false
				},
				submitted: false
			};
		},
		methods: {
			saveUser(){
				var data = {
					Ime: this.user.Ime,
					Prezime: this.user.Prezime,
					Adresa: this.user.Adresa,
					DatumPrvogUnosa:this.user.DatumPrvogUnosa
				};

				userServices.create(data)
				.then(response => {
					this.user.id = response.data.id;
					console.log(response.data);
					this.submitted = true;
				})

				.catch(e => {
					console.log(e);
				});
			},
			newUser() {
				this.submitted = false;
				this.user = {};
			}
		}
	};
</script>
<style>
	.submit-form {
		max-width: 300px;
		margin: auto;
	}
</style>