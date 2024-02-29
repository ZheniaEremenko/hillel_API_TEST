import { test, expect } from "@playwright/test";

test("Check new pet created", async ({ request }) => {
  const response = await request.post(`https://petstore.swagger.io/v2/store/order`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: 1,
      petId: 5,
      quantity: 100,
      status: "placed",
      complete: true,
    },
  });
  expect(response.status()).toBe(200);
});

test("check I can find pet by status", async ({ request }) => {
  const issues = await request.get(
    `https://petstore.swagger.io/v2/store/order/1`,
    {
      headers: {
        accept: "application/json",
      }
    }
  );
  if (issues.status() === 200) {
    console.log(`Status: ${issues.status()}`)
    const body = await issues.json()
    expect(await issues.json()).toEqual(expect.objectContaining({
      id: 1,
      petId: 5,
      quantity: 100,
      status: "placed",
      complete: true,
    }));
    console.log(body)
  } else if (issues.status() === 404) {
    console.log("Error!! NOT FOUND")
  }
});

test("{DELETE} delete user", async ({ request }) => {
  const response = await request.delete(`https://petstore.swagger.io/v2/store/order/1`, {
    data: {
      "code": 404,
      "type": "unknown",
      "message": "Order Not Found"
    },
  });
  if (response.status() === 404) {
    console.log("Error: response status is 404")
    expect(await response.json()).toEqual(expect.objectContaining({
      "code": 404,
      "type": "unknown",
      "message": "Order Not Found"
    }));
  } else if (response.status() === 400) {
    console.log("Invalid ID supplied")
  }
});

test("{GET} Check inventory", async ({ request }) => {
  const response = await request.get(`https://petstore.swagger.io/v2/store/inventory`, {
    data: {
      "totvs": 6,
      "sold": 5,
      "string": 613,
      "old": 1,
      "pending": 24,
      "available": 318,
      "not available": 1,
      "Available": 1,
      "peric": 4,
      "Not available": 1
    },
  });
  expect(response.status()).toBe(200);
  console.log(await response.json())
});