import { Db } from "mongodb";
import { User } from "../types/types";
import { faker } from "@faker-js/faker";
import { USERS_COUNT } from "../config";
import bcrypt from "bcrypt";

const getMe = () => ({
	username: "Shin_Thant",
	name: "Shin Thant",
	email: "shin@test.com",
	password: "password123",
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
});

export async function createUsers(db: Db) {
	const data: User[] = [];
	const hashedPwd = await bcrypt.hash("password123", 10);

	data.push(getMe());

	for (let i = 0; i < USERS_COUNT; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const date = faker.date.recent();

		const user: User = {
			name: `${firstName} ${lastName}`,
			username: faker.internet.userName({ firstName, lastName }),
			email: faker.internet.email({ firstName, lastName }),
			password: hashedPwd,
			avatar: "",
			createdAt: date.toISOString(),
			updatedAt: date.toISOString(),
		};

		data.push(user);
	}

	const result = await db.collection("users").insertMany(data);
	console.log({ user_creation: result });
}
