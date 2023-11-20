import { ObjectId } from "mongodb";

export interface User {
	username: string;
	name: string;
	email: string;
	emailVerified: boolean;
	password: string;
	avatar: string;
	following: string[];
	counts: {
		followers: number;
		following: number;
	};
	createdAt: string;
	updatedAt: string;
}
export interface UserDocument extends User {
	_id: ObjectId;
}

export interface BasicTweet {
	type: "post" | "share";
	body?: string;
	owner: ObjectId;
	likes: ObjectId[];
	shares: ObjectId[];
  commentCount: number;
	createdAt: string;
	updatedAt: string;
}
export interface PostTweet extends BasicTweet {
	type: "post";
	body: string;
	images: string[];
}

export interface ShareTweet extends BasicTweet {
	type: "share";
	body?: string;
	origin: ObjectId;
}

export interface Comment {
	type: "comment" | "reply";
	body: string;
	owner: ObjectId;
	tweet: ObjectId;
	origin?: ObjectId;
	likes: ObjectId[];
}
