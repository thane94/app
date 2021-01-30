<template>
	<nav class="navbar-expand navbar-dark bg-dark">
	<router-link to="/" class="navbar"></router-link>
	<div class="navbar-nav mr-auto">
		<li class="nav-item">
			<router-link to="/users" class="nav-link">Users</router-link>
		</li>
	<li class="nav-item">
		<router-link to="/add" class="nav-link">Add User</router-link>
	</li>
	<li class="nav-item">
		<router-link to="/message" class="nav-link">Send message</router-link>
	</li>
	</div>
	</nav>
	<router-view />
</template>

<script>
</script>