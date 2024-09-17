import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

function generateFakeData() {
	const data = [];

	for (let i = 0; i < 5; i++) {
		data.push({
			id: i + 1,
			title: faker.lorem.sentence(),
			body: faker.lorem.paragraph(),
			tags: faker.helpers.arrayElements(
				["history", "american", "crime", "fiction", "adventure"],
				3
			),
			reactions: {
				likes: faker.number.int({ min: 100, max: 500 }),
				dislikes: faker.number.int({ min: 0, max: 50 })
			},
			views: faker.number.int({ min: 100, max: 1000 }),
			userId: faker.number.int({ min: 100, max: 200 })
		});
	}

	return data;
}

export async function GET() {
	const fakeData = generateFakeData();
	return NextResponse.json(fakeData);
}

export async function POST() {
	const fakeData = generateFakeData();
	return NextResponse.json(fakeData);
}
