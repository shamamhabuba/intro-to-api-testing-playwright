import { expect, test } from '@playwright/test';
import { StatusCodes } from 'http-status-codes';

const BASE_URL = 'https://backend.tallinn-learning.ee/test-orders';

test.describe('Order API Tests', () => {

  test('GET existing order should return 200 OK', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/1`);
    console.log('GET existing order response:', await response.json());
    expect(response.status()).toBe(StatusCodes.OK);
  });

  test('GET non-existent order should return 404 Not Found', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/999999`);
    console.log('GET non-existent order response:', await response.json());
    expect(response.status()).toBe(StatusCodes.NOT_FOUND);
  });

  test('PUT update existing order should return 200 OK', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/1`, {
      data: {
        customerName: 'Updated User',
        customerPhone: '+3729999999',
        comment: 'Updated comment',
      },
    });
    console.log('PUT existing order response:', await response.json());
    expect(response.status()).toBe(StatusCodes.OK);
  });

  test('PUT update non-existent order should return 404 Not Found', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/999999`, {
      data: {
        customerName: 'Non-existent',
        customerPhone: '+3721111111',
        comment: 'Should not work',
      },
    });
    console.log('PUT non-existent order response:', await response.json());
    expect(response.status()).toBe(StatusCodes.NOT_FOUND);
  });

  test('DELETE existing order should return 204 No Content', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/1`);
    console.log('DELETE existing order response:', await response.text());
    expect(response.status()).toBe(StatusCodes.NO_CONTENT);
  });

  test('DELETE non-existent order should return 404 Not Found', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/999999`);
    console.log('DELETE non-existent order response:', await response.text());
    expect(response.status()).toBe(StatusCodes.NOT_FOUND);
  });

  test('GET all orders should return 200 OK and an array', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const body = await response.json();
    console.log('GET all orders response:', body);
    expect(response.status()).toBe(StatusCodes.OK);
    expect(Array.isArray(body)).toBe(true);
  });

});
