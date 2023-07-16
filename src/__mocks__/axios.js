//This code sets up a mock for the axios.get method and resolves it with an empty array of clients
export default {
    get: jest.fn(() => Promise.resolve({ data: { clients: [] } })),
  };
