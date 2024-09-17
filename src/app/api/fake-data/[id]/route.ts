import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

// Function to generate random data
function generateFakeData() {
	const data = [];
	for (let i = 0; i < 10; i++) {
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

// Function to get a single item by id
function getItemById(id: number) {
	const data = generateFakeData();
	return data.find(item => item.id === id);
}

const postDetail = {
	id: 1,
	title: "His mother had always taught him",
	body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
	tags: ["history", "american", "crime"],
	reactions: {
		likes: 192,
		dislikes: 25
	},
	views: 305,
	userId: 121
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = parseInt(searchParams.get("id") || "0", 10);

	const item = getItemById(id);

	if (item) {
		return NextResponse.json(item);
	} else {
		return NextResponse.json(postDetail, { status: 200 });
	}
}
