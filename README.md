# ThreadlyServer (GpGram)

**ThreadlyServer** is the robust backend for **GpGram** (a GoldenPagluGram project), a social media application inspired by Instagram. It provides a comprehensive API for user authentication, post management, social interactions (likes, comments, follows), real-time messaging, and stories.

## 🚀 Features

*   **Authentication**: Secure registration and login via Mobile, Email, or UserID using JWT.
*   **User Management**: Profile customization, bio, and privacy settings (Public/Private accounts).
*   **Social Graph**: Follow/Unfollow system with approval requests for private accounts.
*   **Content Management**:
    *   Create and delete Image and Video posts.
    *   Feed generation with complex algorithms (randomized video feed, chronological image feed).
    *   Stories with 24-hour lifecycle (implied by feature, though logic is in DB/Controller).
*   **Interactions**: Like and comment on posts and stories. Reply to comments.
*   **Real-time Messaging**: Chat functionality with text and media support.
*   **Notifications**: Firebase Cloud Messaging (FCM) integration for push notifications.
*   **Media Handling**: Cloudinary integration for efficient image and video storage.

## 🛠️ Tech Stack

*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MySQL](https://www.mysql.com/) (using `mysql2` driver)
*   **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt](https://www.npmjs.com/package/bcrypt)
*   **Real-time**: [Socket.io](https://socket.io/)
*   **Media Storage**: [Cloudinary](https://cloudinary.com/)
*   **Notifications**: [Firebase Admin SDK](https://firebase.google.com/)

## 📋 Prerequisites

*   Node.js (v16+ recommended)
*   MySQL Server
*   Cloudinary Account
*   Firebase Project (for FCM)

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd ThreadlyServer
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory with the following variables:
    ```env
    PORT=8000
    SECRET_KEY=your_super_secret_jwt_key
    
    # Database Configuration
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=gpgram
    
    # Cloudinary Configuration
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    
    # Environment
    PRODUCTION=false # Set to true for RAM upload, false for Disk upload (usually)
    ```

4.  **Database Setup**
    *   Create a MySQL database named `gpgram` (or whatever you set in `DB_NAME`).
    *   Import the schema from `schema.txt` into your database to create the necessary tables.

5.  **Run the Server**
    *   **Development**:
        ```bash
        npm run dev
        ```
    *   **Start**:
        ```bash
        npm start
        ```

## 📚 API Documentation

**Base URL**: `http://localhost:8000/api`

### 🔐 Authentication & Headers
Most endpoints require a valid JWT token.
*   **Header**: `Authorization: Bearer <your_token>`

**⚠️ Important Note on Request Body**:
Many `POST` endpoints expect the JSON body to be wrapped in a `nameValuePairs` object.
*   **Example**:
    ```json
    {
      "nameValuePairs": {
        "key": "value"
      }
    }
    ```
*   *Check specific endpoints below for details.*

---

### 1. Authentication (`/auth`)

| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register/mobile` | Register with mobile | `nameValuePairs`: `{ "phone", "password", "dob", "username" }` |
| `POST` | `/auth/register/email` | Register with email | `nameValuePairs`: `{ "email", "password", "dob", "username" }` |
| `POST` | `/auth/login/mobile` | Login with mobile | `nameValuePairs`: `{ "userid" (phone), "password" }` |
| `POST` | `/auth/login/email` | Login with email | `nameValuePairs`: `{ "userid" (email), "password" }` |
| `POST` | `/auth/login/userid` | Login with User ID | `nameValuePairs`: `{ "userid", "password" }` |
| `GET` | `/auth/login/logout` | Logout user | **Auth Required** |

### 2. OTP (`/otp`)

| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/otp/generateOtpMobile` | Send OTP to mobile | `nameValuePairs`: `{ "phone" }` |
| `POST` | `/otp/verifyOtpMobile` | Verify mobile OTP | `nameValuePairs`: `{ "phone", "otp" }` |
| `POST` | `/otp/generateOtpEmail` | Send OTP to email | `nameValuePairs`: `{ "email" }` |
| `POST` | `/otp/verifyOtpEmail` | Verify email OTP | `nameValuePairs`: `{ "email", "otp" }` |

### 3. Posts (`/posts`)

| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/posts/addImagePost` | Create image post | **Multipart/Form-Data**: `image` (file), `caption` (text) |
| `POST` | `/posts/addVideoPost` | Create video post | **Multipart/Form-Data**: `video` (file), `caption` (text) |
| `DELETE` | `/posts/removePost/:postid` | Delete a post | URL Param: `postid` |
| `GET` | `/posts/getImagePostsFeed` | Get image feed | **Auth Required** |
| `GET` | `/posts/getVideoPostsFeed` | Get video feed | **Auth Required** |
| `GET` | `/posts/getUserPosts/:userid` | Get user's posts | URL Param: `userid` |
| `GET` | `/posts/getPost/:postid` | Get single post | URL Param: `postid` |

### 4. Social Interactions (`/like`, `/comment`, `/follow`)

#### Likes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/like/likePost/:postid` | Like a post |
| `GET` | `/like/unlikePost/:postid` | Unlike a post |
| `GET` | `/like/likeStory/:storyid` | Like a story |
| `GET` | `/like/unlikeStory/:storyid` | Unlike a story |
| `GET` | `/like/likeAComment/:commentid` | Like a comment |

#### Comments
| Method | Endpoint | Description | Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/comment/addComment` | Add comment | JSON Body (check controller) |
| `POST` | `/comment/removeComment` | Delete comment | JSON Body |
| `GET` | `/comment/getComments/:postid` | Get post comments | URL Param: `postid` |
| `POST` | `/comment/replyTo/:commentId` | Reply to comment | URL Param: `commentId` |

#### Follows
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/follow/follow` | Follow a user |
| `POST` | `/follow/unfollow` | Unfollow a user |
| `GET` | `/follow/getFollowers/:userid` | List followers |
| `GET` | `/follow/getFollowings/:userid` | List following |
| `GET` | `/follow/getAllFollowRequests` | View pending requests |
| `POST` | `/follow/acceptFollowRequest` | Accept request |
| `DELETE` | `/follow/rejectFollowRequest/:followerId` | Reject request |

### 5. User & Profile (`/users`, `/profile`, `/privacy`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/users/getUsers` | Get suggested users |
| `GET` | `/users/getUser/:userid` | Get user profile |
| `GET` | `/users/getMyData` | Get own profile data |
| `PATCH` | `/profile/edit/username` | Update username |
| `PATCH` | `/profile/edit/bio` | Update bio |
| `POST` | `/profile/edit/Profile` | Update profile pic |
| `GET` | `/privacy/setPrivate` | Make account private |
| `GET` | `/privacy/setPublic` | Make account public |

### 6. Messaging (`/messages`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/messages/getAllChats` | Get chat list |
| `POST` | `/messages/sendMessage` | Send text message |
| `POST` | `/messages/uploadMedia` | Send media message |
| `GET` | `/messages/checkPendingMessages` | Sync offline messages |

### 7. Stories (`/story`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/story/addStory` | Upload story |
| `GET` | `/story/getStories` | Get stories feed |
| `DELETE` | `/story/removeStory/:storyid` | Delete story |

## 📂 Project Structure

```
ThreadlyServer
├── Controllers/       # Business logic for each feature
├── routes/            # API route definitions
├── middlewares/       # Auth, Validation, Privacy checks
├── db/                # Database connection
├── utils/             # Helper functions (Cloudinary, Queries)
├── constants/         # Error messages, Response objects
├── Fcm/               # Firebase Cloud Messaging logic
├── socketHandlers/    # Socket.io event handlers
├── public/            # Static assets
└── index.js           # Application entry point
```

## 📄 License

This project is licensed under the **ISC License**.
