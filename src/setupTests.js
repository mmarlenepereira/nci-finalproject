// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock the image imports
jest.mock('./images/pottersapplogo.png', () => 'mocked-pottersapplogo');
jest.mock('./images/NCI_logo.png', () => 'mocked-NCI_logo');
