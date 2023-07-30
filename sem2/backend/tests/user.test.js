const createUser = require("../routes/user");

test("Create user sucessfully", async () => {
    let user = await createUser('firstname', 'lastname', 'test@gmail.com', 'password123');
    expect(user.username);
})