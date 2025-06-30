### Project Documentation for ThreadlyServer
This documentation describes the structure and functionality of the `ThreadlyServer` project. It is a server application designed to handle authentication, user management, post interactions, and social interactions between users like following, liking, and commenting.
## **Project Overview**
The project is built using **Node.js** with **Express.js** at its core. It utilizes a MySQL database as the primary data store. Below are the key components:
### Features:
1. **Authentication** (Registration, Login, OTP, and Password Reset)
2. **User Management** (Profiles, Following, Followers)
3. **Post Interactions** (Likes, Comments)
4. **Secure API Handling** using **JWT** (JSON Web Token) for authenticated requests.

## **Project Structure**
### Project View:
``` 
ThreadlyServer
├── .github/                      # Configuration files for GitHub
├── .idea/                        # IDE configuration files
├── constants/                    # Definitions for error handling and reusable response objects
├── Controllers/                  # Contains logic for API functionalities
├── db/                           # Database connection and configurations
├── middlewares/                  # Middleware for authentication, validation, etc.
├── public/                       # Static files and public assets
├── routes/                       # API route definitions
├── utils/                        # Helper functions (e.g., database queries)
├── node_modules/                 # Node.js dependencies
├── .env                          # Environment variables (e.g., database credentials, API keys)
├── index.js                      # Entry point for starting the server
└── package.json                  # Dependencies and start scripts
```
### **Important Files**
#### **index.js**
The entry point of the server that:
1. Sets up middleware (`bodyParser`, `CORS`, and static files).
2. Configures and connects MySQL database.
3. Registers API route handlers.
4. Starts the server on the specified port.

APIs handled in : `index.js`
- `/api/otp` - OTP verification routes.
- `/api/auth/register` - User registration.
- `/api/auth/login` - User login.
- `/api/resetPassword` - Password reset using OTP.
- `/api/posts` - Posts management API.
- `/api/like` - Post likes API.
- `/api/follow` - User follow/unfollow API.
- `/api/comment` - User comments API.
- `/api/users` - User-related API.
- `/api/profile` - User profile management.

#### **Routes**
Each functionality is modularized under its respective route files, connected to related controllers for handling logic. Example:
- handles login requests using the `jsonwebtoken` and `bcrypt` libraries for secure authentication. `loginRoute.js`
- `postsRoute.js` is responsible for managing posts and uses controllers to handle requests.
- `followRoute.js` provides APIs for user following/unfollowing.

#### **Constants:**
- `Error.js`: Encapsulates reusable error messages.
- `Response.js`: Provides a helper object for consistent API responses.
- `regex.js`: Common regular expressions (e.g., email validation).

#### **Database (`db`)**
A MySQL connection is handled dynamically in . Queries are used throughout the project and often executed asynchronously using `Promise`. `index.js`
#### **Middlewares**
Middleware functions are responsible for tasks such as:
1. Authenticating users with JWT tokens.
2. Validating request parameters and headers.

## **API Endpoints**
### **Authentication**
- **POST** `/api/auth/register`: Registers a new user.
- **POST** `/api/auth/login`: Authenticates user via username, email, or phone.
- **POST** `/api/otp`: Handles OTP generation and verification for users.
- **POST** `/api/resetPassword`: Allows password reset using OTP verification.

### **User and Profile Management**
- **GET** `/api/users`: Fetches user details.
- **GET** `/api/profile/:userid`: Retrieves a user’s profile information.
- **PATCH** `/api/profile/edit`: Allows editing user profiles.

### **Follow System**
- **POST** `/api/follow`: Allows a user to follow another user.
- **DELETE** `/api/follow`: Allows a user to unfollow a specific user.
- **GET** `/api/follow/followers/:userid`: List of followers for a user.
- **GET** `/api/follow/following/:userid`: List of users a user is following.

### **Posts**
- **POST** `/api/posts`: Creates a new post.
- **GET** `/api/posts`: Fetches all posts.
- **GET** `/api/posts/:id`: Fetch a specific post by ID.
- **PATCH** `/api/posts/:id`: Edit an existing post.
- **DELETE** `/api/posts/:id`: Delete a specific post.

### **Likes**
- **POST** `/api/like`: Adds a like to a specific post.
- **DELETE** `/api/like`: Removes a like from a specific post.

### **Comments**
- **POST** `/api/comment`: Adds a comment to a specific post.
- **GET** `/api/comment/:postid`: Fetches comments for a specific post.
- **DELETE** `/api/comment/:id`: Deletes a comment.

## **Controller Breakdown**
### **Authentication Controllers**
- Ensures security by hashing passwords with `bcrypt`.
- Utilizes `jsonwebtoken` for generating JWT tokens for session management.

### **Follow Controller**
Handles API logic for following/unfollowing users:
- : Makes a database entry linking two users (follower-following). `followController`
- : Deletes follower-to-following relationship. `unfollowController`
- : Fetches followers for a specific user. `getFollowersController`
- : Fetches the list of users a person follows. `getFollowingController`

### **Post Controllers**
Manages post creation, updates, deletion, and retrieval.
## **Technologies Used**
### **Packages**
- **express**: Core web framework.
- **bcrypt**: For password hashing.
- **jsonwebtoken**: Token-based authentication and authorization.
- **mysql2**: MySQL driver for Node.js.
- **cors**: Cross-Origin Resource Sharing support.

## **How to Run**
1. Install dependencies:
``` bash
   npm install
```
1. Set up environment variables (.env file):
``` plaintext
   PORT=<your-port>
   SECRET_KEY=<your-jwt-secret-key>
   DB_HOST=<your-database-host>
   DB_USER=<your-db-user>
   DB_PASSWORD=<your-db-password>
   DB_NAME=<your-db-name>
```
1. Start the server:
``` bash
   npm run dev
```
1. Server will run on `http://<your-host>:<port>`.

## **Future Improvements**
1. Implement detailed logging for easier debugging.
2. Add role-based authorization for restricted API access.
3. Optimize database queries for better performance under heavy load.
4. Increase test coverage using a testing tool like Jest.
