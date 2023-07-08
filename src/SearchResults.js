/* SearchResults is a functional component that displays search results for Customers and Orders based on a search query.
It sends an HTTP GET request to the backend API with the search query, updates the state variables (clientsResults, purchaseResults), and manages the loading state.
The search results are displayed using conditional rendering: the loading state is checked, and if true, a loading message is displayed and matching results are displayed for Customers and Orders in separate sections.
If no matching results are found, in either of these sections, a "No results " message is displayed.*/

import React, { useEffect, useState } from 'react'; // React hooks to manage state and handle side effects.
import axios from 'axios'; // Axios for handling HTTP requests
import { useLocation, Link } from 'react-router-dom'; // To handle routing

function SearchResults() {
  const [clientsResults, setClientsResults] = useState([]);
  const [purchaseResults, setPurchaseResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const searchRecords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/purchases/search?query=${searchQuery}`);
        setClientsResults(response.data.clients);
        setPurchaseResults(response.data.purchases);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    searchRecords();
  }, [searchQuery]);

  return (
    <div className="container">
      <h2 className="mb-4">Search Results</h2>

      {/* Render Customers results */}
      <h3>Customers matching your search</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {clientsResults.length > 0 ? ( // Conditional rendering: if Customers results exists and it's greater than 0, display the list of customers results
            <ul className="list-group">
              {clientsResults.map((result) => (
                <li key={result.id} className="list-group-item">
                  <div>
                    <Link to={`/clients/${result.id}`}>
                      <h3>{result.first_name} {result.last_name}</h3>
                    </Link>
                    <p>Phone Number: {result.phone_number}</p>
                    <p>Email: {result.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Customers results found.</p>  // else, display the message 'no results found'
          )}
        </div>
      )}

      {/* Render Orders results */}
      <h3>Orders matching your search</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {purchaseResults && purchaseResults.length > 0 ? ( // Conditional rendering: if Purchase results exists and it's greater than 0, display the list of purchase results
            <ul className="list-group">
              {purchaseResults.map((purchase) => (
                <li key={purchase.id} className="list-group-item">
                  <div>
                    <Link to={`/purchases/${purchase.id}`}>
                      <h3>{purchase.product_name}</h3>
                    </Link>
                    <p>Client: {purchase.client && `${purchase.client.first_name} ${purchase.client.last_name}`}</p>
                    <p>Price: {purchase.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Orders results found.</p> // else, display the message 'no results found'
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;




