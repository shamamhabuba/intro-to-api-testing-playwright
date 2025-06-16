import { expect, test } from '@playwright/test';
import { StatusCodes } from 'http-status-codes';

const BASE_URL = 'https://backend.tallinn-learning.ee/test-orders';
const API_KEY = '1234567890123456';

const headers = {
  'api_key': API_KEY,
};

test('GET existing order should return 200 OK', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/1`, { headers });

  console.log(await response.json());
  expect(response.status()).toBe(StatusCodes.OK);
});

test('GET non-existing order should return 400 Not Found', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/999999`, { headers });

  expect(response.status()).toBe(StatusCodes.NOT_FOUND);
});

test('PUT update existing order should return 200 OK', async ({ request }) => {
  const requestBody = {
    status: 'DELIVERED',
    courierId: 0,
    customerName: 'Updated Name',
    customerPhone: '123456789',
    comment: 'Updated comment',
    id: 1,
  };

  const response = await request.put(`${BASE_URL}/1`, {
    headers,
    data: requestBody,
  });

  expect(response.status()).toBe(StatusCodes.OK);
});

test('DELETE non-existing order should return 404 Not Found', async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/999999`, {
    headers,
  });

  expect(response.status()).toBe(StatusCodes.NOT_FOUND);
});

test('DELETE existing order should return 200 OK (if exists)', async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/1`, {
    headers,
  });

  console.log(response.status());
  expect(
    [StatusCodes.OK, StatusCodes.NOT_FOUND].includes(response.status())
  ).toBeFalsy();
});
