import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// page & layout imports
import Homepage from './pages/Homepage'

// apollo client
const client = new ApolloClient({
  uri: 'http://thefedotovs.ru:1337/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="App">

        <Homepage />
        
          <Routes>
            <Route path="/" element={<Homepage />} />

          </Routes>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App

/*<Route path="/details/:id">
<ReviewDetails />
</Route>
<Route path="/category/:id">
<Category />
</Route>*/