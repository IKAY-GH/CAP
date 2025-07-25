import argon2 from "argon2";
import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }

  // The run method - Populate the 'user' table with fake data
  async run() {
    const hashingOptions = {
      type: argon2.argon2id,
      memoryCost: 19 * 2 ** 10,
      timeCost: 2,
      parallelism: 1,
    };

    const users = [
      {
        pseudo: "alice_martin",
        first_name: "Alice",
        last_name: "Martin",
        email: "alice.martin@exemple.com",
        password_hash: await argon2.hash("alice123", hashingOptions),
        is_admin: false,
        refName: "user_1",
      },
      {
        pseudo: "bob_dupont",
        first_name: "Bob",
        last_name: "Dupont",
        email: "bob.dupont@exemple.com",
        password_hash: await argon2.hash("bob456", hashingOptions),
        is_admin: false,
        refName: "user_2",
      },
      {
        pseudo: "claire_bernard",
        first_name: "Claire",
        last_name: "Bernard",
        email: "claire.bernard@exemple.com",
        password_hash: await argon2.hash("claire789", hashingOptions),
        is_admin: true,
        refName: "user_3",
      },
      {
        pseudo: "david_moreau",
        first_name: "David",
        last_name: "Moreau",
        email: "david.moreau@exemple.com",
        password_hash: await argon2.hash("david321", hashingOptions),
        is_admin: false,
        refName: "user_4",
      },
      {
        pseudo: "emma_leroy",
        first_name: "Emma",
        last_name: "Leroy",
        email: "emma.leroy@exemple.com",
        password_hash: await argon2.hash("emma654", hashingOptions),
        is_admin: false,
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
