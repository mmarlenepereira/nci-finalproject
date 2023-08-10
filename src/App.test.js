import { render, screen } from '@testing-library/react';
import App from './App';
import Highcharts from 'highcharts';

jest.mock('highcharts', () => require('__mocks__/highcharts'));


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
