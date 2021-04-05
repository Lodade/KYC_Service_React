const request = require("supertest");
const app = require(`${__dirname}\\..\\app`);

test("Checking 1 + 1 = 2", async () =>{
    expect(1 + 1).toBe(2);
});

test("Checking if get requests are answered correctly", async () =>{
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
});