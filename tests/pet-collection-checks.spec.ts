import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test.skip("Check image uploaded succesfully", async ({ request }) => {
  const file = path.resolve("./", "dog-image.jpeg");
  const image = fs.readFileSync(file);

  const response = await request.post(
    `https://petstore.swagger.io/v2/pet/2/uploadImage`,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      multipart: {
        fileField: {
          name: file,
          mimeType: "image/jpeg",
          buffer: image,
        },
      },
    }
  );
  console.log(response);
  expect(response.ok()).toBeTruthy();
});

test("Check new pet created", async ({ request }) => {
  const response = await request.post(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: 5,
      category: {
        id: 1,
        name: "doggy",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    },
  });
  expect(response.status()).toBe(200);
});

test("check pet updeted", async ({ request }) => {
  const response = await request.put(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      id: 5,
      category: {
        id: 1,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    },
  });
  expect(response.status()).toBe(200);
});

test("check I can find pet by status", async ({ request }) => {
  const issues = await request.get(
    `https://petstore.swagger.io/v2/pet/findByStatus?status=available`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  expect(issues.ok()).toBeTruthy();
});

test("check pet can be deleted", async ({ request }) => {
  const issues = await request.delete(`https://petstore.swagger.io/v2/pet/5`, {
    headers: {
      accept: "application/json",
      api_key: "123",
    },
  });
  expect(issues.ok()).toBeTruthy();
});


test("{GET}Find pets array from available status", async ({ request }) => {
  const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available',
    {
      data: {
        "status": "available"
      }
    }
  )
  if (response.status() == 200) {
    expect(response.url()).toBe('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
    const body = await response.json();
    console.log(body)
    expect(body.length > 0)
  } else if (response.status() == 400) {
    return console.log('Invalid status value')
  } else {
    return console.log(`Такого значення не повинно будти: ${response.status()}`)
  }
})

test("{GET}Find pets array from PENDING status", async ({ request }) => {
  const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus?status=pending',
    {
      data: {
        "status": "pending"
      }
    }
  )
  if (response.status() == 200) {
    expect(response.url()).toBe(`https://petstore.swagger.io/v2/pet/findByStatus?status=pending`);
    const body = await response.json();
    console.log(body)
    expect(body.length > 0)
  } else if (response.status() == 400) {
    return console.log('Invalid status value')
  } else {
    return console.log(`Такого значення не повинно будти: ${response.status()} `)
  }
})

test("{GET}Find pets array from SOLD status", async ({ request }) => {
  const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus?status=sold',
    {
      data: {
        "status": "sold"
      }
    }
  )
  expect(response.url()).toBe('https://petstore.swagger.io/v2/pet/findByStatus?status=sold');
  const body = await response.json();
  console.log(body)
})

test("{GET}Find pets from petID", async ({ request }) => {
  let petID = 5;
  const response = await request.get(`https://petstore.swagger.io/v2/pet/${petID}`)
  if (response.status() == 200) {
    const body = await response.json();
    console.log(body)
  } else {
    const Errorbody = await response.json();
    console.log(`Pet not found with array:\n`, Errorbody)
  }
})

