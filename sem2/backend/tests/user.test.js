import {createUser} from "../routes/user";
const db = require('../db');

beforeAll(async () => await db.connect())

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())

test("Create user sucessfully", async () => {
    let user = await createUser('badstudent',  'test@gmail.com', 'password123');
    expect(user.username);
})