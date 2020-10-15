import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, createHttpLink } from '@apollo/client';
import {ApolloClient} from "apollo-client"
import { ApolloLink } from 'apollo-link'
import {InMemoryCache} from "apollo-cache-inmemory"
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Cookie from "js-cookie"
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
	uri: 'https://anthonygregis.com/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		console.log('graphQLErrors', graphQLErrors);
	}
	if (networkError) {
		console.log('networkError', networkError);
	}
});

const authLink = setContext((_, {headers}) => {
	const token = Cookie.get("token") || ""
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ""
		}
	}
})

const link = ApolloLink.from([errorLink, authLink.concat(httpLink)])

const client = new ApolloClient({
	link: link,
	cache: new InMemoryCache()
})

ReactDOM.render(
	<Router>
		<ApolloProvider client={client}>
			<App className="App"/>
		</ApolloProvider>
	</Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
