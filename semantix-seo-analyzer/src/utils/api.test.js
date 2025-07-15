import { apiRequest } from './api';

beforeEach(() => {
  global.fetch = jest.fn();
  window.semantixData = { apiUrl: 'https://example.com/', nonce: 'nonce123' };
});

afterEach(() => {
  jest.resetAllMocks();
});

test('successful fetch returns data', async () => {
  const jsonData = { foo: 'bar' };
  global.fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(jsonData),
  });

  const data = await apiRequest('endpoint');

  expect(fetch).toHaveBeenCalledWith(
    'https://example.com/endpoint',
    expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({
        'Content-Type': 'application/json',
        'X-WP-Nonce': 'nonce123',
      }),
    })
  );

  expect(data).toEqual(jsonData);
});

test('merges headers from options', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({}),
  });

  await apiRequest('endpoint', {
    method: 'POST',
    headers: { 'Custom': 'Header' },
  });

  expect(fetch).toHaveBeenCalledWith(
    'https://example.com/endpoint',
    expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': 'nonce123',
        'Custom': 'Header',
      },
    })
  );
});

test('throws an error when response is not ok', async () => {
  global.fetch.mockResolvedValue({ ok: false, status: 500 });
  jest.spyOn(console, 'error').mockImplementation(() => {});

  await expect(apiRequest('error')).rejects.toThrow('HTTP error');

  console.error.mockRestore();
});
