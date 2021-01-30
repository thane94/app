<template>
	<div class="list row">
		<div class="col-md-8">
			<div class="input-group mb-3">
				<input type="text" class="form-control" placeholder="User name"
					v-model="Name"/>
				<div class="input-group-append">
					<button class="btn btn-outline-secondary" type="button"
						@click="searchUser">
					>
					Search User
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<h4>Users</h4>
		<ul class="list-group">
			<li class="list-group-item"
				:class="{ active: index==currentIndex }"
				v-for="(user, index) in users"
				:key="index"
				@click="setActiveUser(user,index)"
				>
				{{ user.Ime }} {{ user.Prezime}}
			</li>
		</ul>
	</div>
</template>

<script>

	import userServices from "../services/userServices.js";
	
	export default {
		name: "users-list",
		data() {
			return {
				users: [],
				currentUser: null,
				Name: null,
				currentIndex: -1,
				user: ""
			};
		},
		
		
		methods: {
			retrieveUsers() {
				userServices.getAll().then(response =>{
					this.users=response.data;
					console.log(response.data);
				})
				.catch(e=>{
					console.log(e);
				});
			},
			
			refreshList() {
				this.retrieveUsers();
				this.currentUser=null;
				this.currentIndex=-1;
			},
			
			setActiveUser(user, index) {
				this.currentUser=user;
				this.currentIndex=index;
			},
			
			searchUser() {
				userServices.findByUserName(this.user).then(response=>{
					this.users=response.data;
					console.log(response.data);
				})
				.catch(e=>{
					console.log(e);
				});
			}
		},
		
		created(){
			this.retrieveUsers();
		}
	};
</script>

<style>
	.list {
		text-align: left;
		max-width: 750px;
		margin: auto;
	}
</style>