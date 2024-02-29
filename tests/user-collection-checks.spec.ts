import { test, expect } from '@playwright/test';

test("{POST} Create user", async ({ request }) => {
    const response = await request.post("https://petstore.swagger.io/v2/user", {
        data: {
            "id": 5,
            "username": "ZheniaE",
            "firstName": "Yevghenii",
            "lastName": "Eremenko",
            "email": "zheniae@mailinator.com",
            "password": "!PaSSword!123",
            "phone": "+ 439 343 345",
            "userStatus": 3
        }
    })
});

test("{GET} Find user from username", async ({ request }) => {
    const response = await request.get(`https://petstore.swagger.io/v2/user/ZheniaE`)
    let respJSON = await response.json()
    expect(response.status()).toBe(200)
    expect(respJSON).toMatchObject({
        "username": "ZheniaE",
        "firstName": "Yevghenii",
        "lastName": "Eremenko",
        "email": "zheniae@mailinator.com",
        "password": "!PaSSword!123",
        "phone": "+ 439 343 345",
    });
    console.log("Json is available")
});

test("check pet updeted", async ({ request }) => {
    const response = await request.put(`https://petstore.swagger.io/v2/pet`, {
        data: {
            "id": 15,
            "username": "ZheniaE",
            "firstName": "Yevghenii",
            "lastName": "Eremenko",
            "email": "zheniae@mailinator.com",
            "password": "!PaSSword!123",
            "phone": "+ 439 343 345",
            "userStatus": 31
        },
    });
    expect(response.status()).toBe(200);
    console.log("User data has been updated")
});

test("{GET} Get Logged user", async ({ request }) => {
    const response = await request.get(`https://petstore.swagger.io/v2/user/login?username=ZheniaE&password=!PaSSword!123`)
    expect(await response.json()).toMatchObject({
        "code": 200,
        "type": "unknown"
    })
    let con = await response.json()
    console.log(con)
})

test("{DELETE} delete user", async ({ request }) => {
    const response = await request.delete(`https://petstore.swagger.io/v2/user/ZheniaE`, {
        headers: {
            accept: "application/json",
        },
    });
    expect(response.ok()).toBeTruthy();
    const text = await response.json()
    console.log(text)
});

