import { createApp, provide, h } from 'vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import router from './router';
import { store, key } from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_API_URL,
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
}).use(store, key).use(router).mount('#app');
