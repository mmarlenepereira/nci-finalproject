import React from 'react';
import { render, screen } from '@testing-library/react';
import Clients from './Clients';
import App from './App';
import axios from './__mocks__/axios';

jest.mock('highcharts', () => ({
  // Empty mock object for the Highcharts module
}));

jest.mock('highcharts/modules/timeline', () => () => {
  // Mock for the highcharts/modules/timeline module
});

describe('Clients', () => {
  test('displays a list of clients', async () => {
    const clients = [
      { id: 1, name: 'Client 1' },
      { id: 2, name: 'Client 2' },
    ];

    axios.get.mockResolvedValue({ data: { clients } });

    render(<Clients />);

    await screen.findByText('Client 1');

    expect(screen.getByText('Client 1')).toBeInTheDocument();
    expect(screen.getByText('Client 2')).toBeInTheDocument();
  });
});

jest.mock('./images/pottersapplogo.png', () => 'mocked-image-path');

describe('App', () => {
  test('renders without errors', () => {
    render(<App />);
  });
});


