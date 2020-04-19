<template>
	<header class="header">
		<router-link to="/">Inicio</router-link>
		<router-link to="/categorias">Categorias</router-link>
	</header>
</template>
<style>
	.header {
		display: inline-flex;
	}
	.header a {
		margin: 5px;
		color: #42b983;
		text-transform: uppercase;
		font-weight: bold;
	}
</style>