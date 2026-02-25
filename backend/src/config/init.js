import mongoose from "mongoose";
import Note from "../models/Note.js";
import dotenv from "dotenv";
dotenv.config();
const data = [
  {
    "title": "Getting Started with React",
    "content": "React is a JavaScript library for building user interfaces. It allows developers to create reusable components and manage application state efficiently."
  },
  {
    "title": "Understanding JavaScript Closures",
    "content": "A closure is created when a function remembers variables from its outer scope even after the outer function has finished execution."
  },
  {
    "title": "Introduction to Node.js",
    "content": "Node.js is a runtime environment that allows JavaScript to run on the server side. It is built on Chrome's V8 engine."
  },
  {
    "title": "Basics of MongoDB",
    "content": "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It is widely used in full-stack development."
  },
  {
    "title": "CSS Flexbox Guide",
    "content": "Flexbox is a layout model in CSS that provides an efficient way to align and distribute space among items in a container."
  },
  {
    "title": "Introduction to REST APIs",
    "content": "REST APIs allow communication between client and server using HTTP methods like GET, POST, PUT, and DELETE."
  },
  {
    "title": "Async Await in JavaScript",
    "content": "Async and Await are used to handle asynchronous operations in JavaScript in a cleaner and more readable way."
  },
  {
    "title": "Git and Version Control",
    "content": "Git is a distributed version control system that helps developers track changes in source code during software development."
  },
  {
    "title": "Understanding Data Structures",
    "content": "Data structures like arrays, linked lists, stacks, and queues help organize and store data efficiently."
  },
  {
    "title": "Introduction to Express.js",
    "content": "Express.js is a minimal and flexible Node.js web application framework that provides robust features for building web applications and APIs."
  }
];

// const MONGO_URI = "mongodb://127.0.0.1:27017/notes_db";
// for initialising the db use node src/config/init.js from \backend directory so it will fetch .env

main().then(() => {
  console.log("Connected to database");
}).catch((error) => {
  console.log(error);
});

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

const initDB = async () => {
  await Note.deleteMany({});
  try{
    await Note.insertMany(data);
    console.log("Success");
  } catch(error) {
    console.log("Fail",error);
  }
}

initDB();