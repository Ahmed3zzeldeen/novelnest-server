# NovelNest Server

> This repository contains the server-side (Back-end) code for the NovelNest project, an Express API designed to support the NovelNest E-commerce website for purchasing books.

## Project Overview:

The NovelNest server facilitates the communication between the client-side (Front-end) and the database, handling various functionalities required for book purchasing, user authentication, and data management.

## Getting Started:

To set up the NovelNest server locally:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your preferred code editor.
3. Install necessary dependencies by running `npm install`.
4. Configure the environment variables required for database connections, authentication, etc.
5. Start the server by running `npm start`.

## Important Notes :
**To ensure a streamlined development process, adhere to the following guidelines:**

- **1. Folder Structure Guidelines:**
> Ensure a well-organized folder structure for server-side development, distinctly arranging directories for controllers, routes, middlewares, models, and utilities
- **2. [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) Guidelines:**
> Follow a disciplined branching strategy (Example) such as using master/main for production, development for ongoing work, and feature branches for new functionalities or fixes.
- **3. JSON Response ([JSend Rules](https://github.com/omniti-labs/jsend)) Guidelines:**
>Implement a uniform response structure (Example) adhering to JSend specifications for successful and error responses, coupled with appropriate HTTP status codes.

## Tasks

- [X] Create the repo and setup the environment --> Ahmed M. Ezzeldeen
- [X] Create the folder structure. --> Ahmed M. Ezzeldeen
- [X] User Entity --> Ahmed M. Ezzeldeen 
	- [X] Create User Schema Model (from ERD). 
	- [X] Create (CRUD Operation to the Users).
	- [X] Create Authentication to users (Login , Register ) by using JWT.
	- [X] Add the avatar image to users (Handle the upload files in our server by using multer).
	- [X] Create the API Pagination to get users
	- [X] Enhancement the code over all
- [ ] Book Entity --> Youssef Amir
	- [ ] Create Book Schema Model (from ERD).
	- [ ] Create (CRUD Operation to the Books).
		-  Make Sure handle Create , Update and Delete only Allowed to Admin User
	- [ ] Create the Filters to find a book by (bookName , authorName , category  , etc)
	- [ ] Create the API Pagination to get books
- [ ] Orders (Purchase) Entity --> Mustafa Ahmed
	- [X] Create Purchase Schema Model (from ERD).
	- [ ] Create (CRUD Operation to the Purchase).
	- [X] Create Get all Purchases for a single user.
	- [ ] Create Get all Purchases for a single book.


