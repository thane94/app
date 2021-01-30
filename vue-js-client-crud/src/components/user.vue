<template>
	<div v-if="currentUser" class="edit-form">
		<h4>User</h4>
			<form>
				<div class="form-group">
					<label for="user">User</label>
					<input type="text" class="form-control">
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
				message: ''
			};
		},
		
		methods: {
			getUser(id){
				userServices.get(id).then(response => {
					this.currentUser = response.data;
					console.log(response.data);
				})
				.catch(e => {
					console.log(e);
				});
			}
		},
		created(){
			this.message='',
			this.getUser(this.$route.params.id);
		}
	};
</script>

<style>
	.edit-form{
		max-width: 300px;
		margin: auto;
	}
</style>