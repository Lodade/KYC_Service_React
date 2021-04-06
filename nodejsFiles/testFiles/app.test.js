const request = require("supertest")
const mainPart = require(`${__dirname}\\..\\app`);

test("Checking 1 + 1 = 2", async () =>{
    expect(1 + 1).toBe(2);
});

test("Checking if get requests are answered correctly", async () =>{
    const response = await request(mainPart.app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).not.toBeUndefined();
    expect(response.type).toBe("text/html");
});


test("Checking if query requests are answered correctly", async () =>{
    const response = await request(mainPart.app).post("/query").type("text/plain").send("SELECT DISTINCT(fsrv_prod.MGMT_CODE) FROM fsrv_prod");
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeUndefined();
});

afterAll(async () =>{
    let pool = await mainPart.grabPool();
    pool.end();
});