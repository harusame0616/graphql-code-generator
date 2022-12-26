<script setup lang="ts">
import { RouterView } from "vue-router";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { provide } from "vue";

const httpLink = new HttpLink({
  uri: "http://localhost:5173/graphql",
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

provide(DefaultApolloClient, apolloClient);
</script>

<template>
  <RouterView />
</template>
