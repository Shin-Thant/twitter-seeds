import { Db } from "mongodb";
import { User } from "../types/types";
import { faker } from "@faker-js/faker";
import { USERS_COUNT } from "../config";
import bcrypt from "bcrypt";

const getMe = async () => {
	const pwd = await bcrypt.hash('password123', 10);

	return {
		username: "Shin_Thant",
		name: "Shin Thant",
		email: "shin@test.com",
		emailVerified: true,
		password: pwd,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		avatar: '',
		counts: {
			followers: 0,
			following: 0,
		},
		following: [],
	}
};

export async function createUsers(db: Db) {
	const data: User[] = [];
	const hashedPwd = await bcrypt.hash('password123', 10);

	data.push(await getMe());

	for (let i = 0; i < USERS_COUNT; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const date = faker.date.recent();

		const user: User = {
			name: `${firstName} ${lastName}`,
			username: faker.internet.userName({ firstName, lastName }),
			email: faker.internet.email({ firstName, lastName }),
			emailVerified: false,
			password: hashedPwd,
			avatar: "",
			following: [],
			counts: {
				followers: 0,
				following: 0
			},
			createdAt: date.toISOString(),
			updatedAt: date.toISOString(),
		};

		data.push(user);
	}

	const result = await db.collection("users").insertMany(data);
	console.log({ user_creation: result });
}
