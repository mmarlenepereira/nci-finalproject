import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Homepage from './Homepage';
import Clients from './Clients';
import ClientRecord from './ClientRecord';
import Purchases from './Purchases';
import PurchaseRecord from './PurchaseRecord';
import NewClient from './NewClient';
import NewPurchase from './NewPurchase';
import EditClient from './EditClient';
import EditPurchase from './EditPurchase';
import DeleteClient from './DeleteClient';
import DeletePurchase from './DeletePurchase';
import SearchResults from './SearchResults';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<ClientRecord />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/purchases/:id" element={<PurchaseRecord />} />
        <Route path="/new-client" element={<NewClient />} />
        <Route path="/new-purchase" element={<NewPurchase />} />
        <Route path="/edit-client/:id" element={<EditClient />} />
        <Route path="/edit-purchase/:id" element={<EditPurchase />} />
        <Route path="/delete-client/:id" element={<DeleteClient />} />
        <Route path="/delete-purchase/:id" element={<DeletePurchase />} />
        <Route path="/search" element={<SearchResults />} /> // route to handle Search in the Navbar
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

