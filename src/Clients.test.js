import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Clients from './Clients';

jest.mock('axios'); // Mock Axios module

describe('Clients Component', () => {
  it('displays loading message initially', () => {
    render(<Clients />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays client data after fetching', async () => {
    // Mock Axios.get to return sample data
    axios.get.mockResolvedValueOnce({
      data: {
        clients: [
          {
            id: 100,
            first_name: 'Ana',
            last_name: 'Gomes',
            phone_number: '087695385',
            email: 'anagomes@yahoo.cm'
          },
        ],
      },
    });

    render(<Clients />);

    // Assertions for client data display
    await screen.findByText('Ana Gomes');
    // ...
  });

});





