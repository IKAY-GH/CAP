import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }

  // The run method - Populate the 'user' table with fake data
  run() {
    const users = [
      {
        firstname: "Alice",
        lastname: "Martin",
        email: "alice.martin@exemple.com",
        password: "alice123",
        refName: "user_1",
      },
      {
        firstname: "Bob",
        lastname: "Dupont",
        email: "bob.dupont@exemple.com",
        password: "bob456",
        refName: "user_2",
      },
      {
        firstname: "Claire",
        lastname: "Bernard",
        email: "claire.bernard@exemple.com",
        password: "claire789",
        refName: "user_3",
      },
      {
        firstname: "David",
        lastname: "Moreau",
        email: "david.moreau@exemple.com",
        password: "david321",
        refName: "user_4",
      },
      {
        firstname: "Emma",
        lastname: "Leroy",
        email: "emma.leroy@exemple.com",
        password: "emma654",
        refName: "user_5",
      },
    ];

    // Insert each user into the database
    for (const user of users) {
      this.insert(user);
    }
  }
}

// Export the UserSeeder class
export default UserSeeder;
