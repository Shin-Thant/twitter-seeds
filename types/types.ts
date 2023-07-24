import { Document, ObjectId } from "mongodb";

export interface User {
	username: string;
	name: string;
	email: string;
	password: string;
	avatar?: string;
	createdAt: string;
	updatedAt: string;
}
export interface UserDocument extends User {
	_id: ObjectId;
}

export interface PostTweet {
	type: "post";
	body: string;
	owner: ObjectId;
	likes: ObjectId[];
	shares: ObjectId[];
}

export interface ShareTweet {
	type: "share";
	body?: string;
	owner: ObjectId;
	origin: ObjectId;
	likes: ObjectId[];
	shares: ObjectId[];
}
