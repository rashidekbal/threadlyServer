# ThreadlyServer (GpGram)

**ThreadlyServer** is the backend for **threadly**, a full-featured social media platform inspired by Instagram. Built with Node.js and Express, it serves a mobile client with REST APIs for auth, content, social interactions, real-time chat, stories, push notifications, and an admin panel.

---

## 🚀 Features

- **OTP-Gated Authentication** — Registration via Mobile or Email is secured by a two-step OTP flow before account creation.
- **Multi-mode Login** — Users can log in with phone number, email address, or their unique User ID.
- **Session Invalidation** — Sessions are tracked via a `sessionId` stored in Redis (with MySQL fallback), enabling instant logout and single-session enforcement.
- **Social Graph** — Follow/Unfollow with private account support; pending approval requests for private profiles.
- **Posts & Feed** — Image and video posts stored at Cloudinary. Image feed returns up to 100 posts in random order; video feed returns 15 with a deterministic shuffle. Both feeds respect account privacy.
- **Interactions** — Like/unlike posts, stories, and comments. Comment threads with nested replies.
- **Stories** — Upload image/video stories; get a full stories feed.
- **Search** — Search users by name or ID.
- **Real-time Chat** — Socket.io powered messaging with a 3-tier delivery pipeline (Socket → FCM → DB queue).
- **Push Notifications** — FCM events fired for: new follower, follow requests, accept/cancel/reject, unfollows, messages, and message lifecycle.
- **Profile Management** — Update username, User ID, bio, and profile picture.
- **Admin Panel** — Protected admin API for user management (ban/unban), content moderation, and platform-wide engagement stats.
- **Background Uploads** — Media is uploaded to Cloudinary asynchronously; the API responds immediately to avoid client timeouts.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM — `"type": "module"`) |
| Framework | Express.js v5 |
| Database | MySQL (mysql2) |
| Auth | JWT + Bcrypt |
| Session Store | Redis (ioredis) |
| Real-time | Socket.io v4 |
| Media Storage | Cloudinary |
| Push Notifications | Firebase Admin SDK (FCM) |
| Email / OTP | Nodemailer |
| File Upload | Multer (RAM buffer in production, disk path in dev) |
| Containerization | Docker |
| Deployment | Vercel |

---

## 📋 Prerequisites

- Node.js v16+
- MySQL Server
- Redis Server
- Cloudinary account
- Firebase project (for FCM)

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ThreadlyServer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration** — Create a `.env` file:
   ```env
   PORT=8000
   SECRET_KEY=your_super_secret_jwt_key

   # Database
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=gpgram

   # Redis
   REDIS_URL=redis://localhost:6379

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Upload mode: true = RAM buffer (production), false = disk path (dev)
   PRODUCTION=false
   ```

4. **Database Setup** — Create the MySQL database and import `schema.txt`.

5. **Run**
   ```bash
   npm run dev    # Development (nodemon)
   npm start      # Production
   ```

---

## 📂 Project Structure

```
ThreadlyServer/
├── index.js                    # Entry: DB connect → start server → init FCM
└── src/
    ├── App.js                  # Express app, Socket.io setup, all route mounts
    ├── Controllers/            # Business logic (15 files)
    │   └── admin/              # Admin controllers (6 files)
    ├── routes/                 # Route definitions (16 files)
    │   └── admin/              # Admin routes
    ├── middlewares/            # Auth, privacy, multer, admin guards (8 files)
    ├── db/                     # MySQL connection pool
    ├── redis/                  # Redis client
    ├── repository/             # DB access layer (UsersTableRepo)
    ├── utils/                  # Cloudinary, bcrypt, nodemailer, helpers
    ├── constants/              # Response, ApiError classes, Redis constants
    ├── Fcm/                    # Firebase FCM service
    ├── socketHandlers/         # Socket.io event handlers
    └── public/                 # Static files
```

---

## 📚 API Reference

**Base URL**: `http://localhost:8000/api`

**Auth header** (required on all protected routes):
```
Authorization: Bearer <token>
```

**Request body convention** — most POST bodies are wrapped:
```json
{ "nameValuePairs": { "key": "value" } }
```

---

### 🔑 OTP (`/otp`)

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| POST | `/otp/generateOtpMobile` | Generate & send mobile OTP | `{ phone }` |
| POST | `/otp/resendOtpMobile` | Resend mobile OTP | `{ phone }` |
| POST | `/otp/verifyOtpMobile` | Verify mobile OTP → returns JWT | `{ phone, otp }` |
| POST | `/otp/generateOtpEmail` | Generate & send email OTP | `{ email }` |
| POST | `/otp/resendOtpEmail` | Resend email OTP | `{ email }` |
| POST | `/otp/verifyOtpEmail` | Verify email OTP → returns JWT | `{ email, otp }` |
| POST | `/otp/ForgetPasswordGenerateOtpMobile` | Forgot-password OTP (mobile) | `{ phone }` |
| POST | `/otp/ForgetPasswordGenerateOtpEmail` | Forgot-password OTP (email) | `{ email }` |

---

### 🔐 Registration (`/auth/register`)

> Requires `Authorization: Bearer <otp_verified_token>`

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| POST | `/auth/register/mobile` | Register via mobile (OTP-gated) | `{ password, dob, username }` |
| POST | `/auth/register/email` | Register via email (OTP-gated) | `{ password, dob, username }` |

---

### 🔐 Login & Auth (`/auth/login`, `/auth`)

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| POST | `/auth/login/mobile` | Login with phone | `{ userid (phone), password }` |
| POST | `/auth/login/email` | Login with email | `{ userid (email), password }` |
| POST | `/auth/login/userid` | Login with User ID | `{ userid, password }` |
| GET | `/auth/login/logout` | Logout (invalidates session) | Auth required |
| POST | `/auth/resetPassword` | Change password (logged in) | `{ oldPassword, newPassword }` |

**Login response:**
```json
{
  "message": "success",
  "username": "string",
  "profile": "url | null",
  "userid": "string",
  "uuid": "string",
  "token": "jwt_string",
  "isPrivate": false
}
```

---

### 🔑 Password Reset (`/ForgetPassword`)

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| POST | `/ForgetPassword/Mobile` | Reset password via mobile OTP token | `{ password }` |
| POST | `/ForgetPassword/Email` | Reset password via email OTP token | `{ password }` |

---

### 📸 Posts (`/posts`)

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| POST | `/posts/addImagePost` | Upload image post | `multipart/form-data`: `image` (file), `caption` (text) |
| POST | `/posts/addVideoPost` | Upload video post | `multipart/form-data`: `video` (file), `caption` (text) |
| DELETE | `/posts/removePost/:postid` | Delete own post | — |
| GET | `/posts/getImagePostsFeed` | Randomized image feed (100 posts, privacy-aware) | — |
| GET | `/posts/getVideoPostsFeed` | Randomized video feed (15 posts, privacy-aware) | — |
| GET | `/posts/getUserPosts/:userid` | Get user's posts (paginated) | Query: `?page=1` |
| GET | `/posts/getPost/:postid` | Get single post with full stats | — |
| POST | `/posts/recordView/:postid` | Record a post view | `{ uuid }` |

---

### ❤️ Likes (`/like`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/like/likePost/:postid` | Like a post |
| GET | `/like/unlikePost/:postid` | Unlike a post |
| GET | `/like/likeStory/:storyid` | Like a story |
| GET | `/like/unlikeStory/:storyid` | Unlike a story |
| GET | `/like/likeAComment/:commentid` | Like a comment |
| GET | `/like/unlikeAComment/:commentid` | Unlike a comment |

---

### 💬 Comments (`/comment`)

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| POST | `/comment/addComment` | Add a comment | `{ postid, comment }` |
| POST | `/comment/removeComment` | Remove a comment | `{ postid, commentid }` |
| GET | `/comment/getComments/:postid` | Get comments for a post | — |
| POST | `/comment/replyTo/:commentId` | Reply to a comment | `{ postId, comment }` |
| GET | `/comment/getCommentReplies/:commentId` | Get replies for a comment | — |

---

### 👥 Follow (`/follow`)

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| POST | `/follow/follow` | Follow user (always approves) | `{ followingid }` |
| POST | `/follow/follow/V2` | Follow user (respects privacy — sends request if private) | `{ followingid }` |
| POST | `/follow/unfollow` | Unfollow user | `{ followingid }` |
| POST | `/follow/cancelFollowRequest` | Cancel a pending follow request | `{ followingid }` |
| POST | `/follow/acceptFollowRequest` | Accept a follow request | `{ followerId }` |
| DELETE | `/follow/rejectFollowRequest/:followerId` | Reject a follow request | — |
| GET | `/follow/getAllFollowRequests` | Get all pending follow requests | — |
| GET | `/follow/getFollowers/:userid` | Get followers list | — |
| GET | `/follow/getFollowings/:userid` | Get following list | — |

---

### 👤 Users & Profile (`/users`, `/profile`, `/privacy`)

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| GET | `/users/getUsers` | Get suggested users (excludes followed) | — |
| GET | `/users/getUser/:userid` | Get user profile with counts | — |
| GET | `/users/getUserByUUid/:uuid` | Get basic user info by UUID | — |
| GET | `/users/getMyData` | Get own profile + post/follower counts | — |
| PATCH | `/profile/edit/username` | Update display name | `{ name }` |
| PATCH | `/profile/edit/userid` | Update User ID | `{ newUserId }` |
| PATCH | `/profile/edit/bio` | Update bio | `{ bioText }` |
| POST | `/profile/edit/Profile` | Update profile picture | `multipart/form-data`: `image` |
| GET | `/privacy/setPrivate` | Make account private | — |
| GET | `/privacy/setPublic` | Make account public | — |

---

### 📖 Stories (`/story`)

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| POST | `/story/addStory` | Upload a story | `multipart/form-data`: `media` (file), `type` ("image"/"video") |
| DELETE | `/story/removeStory/:storyid` | Delete own story | — |
| GET | `/story/getStories` | Get full stories feed | — |
| GET | `/story/getMyStories` | Get your own stories | — |
| GET | `/story/getStories/:userid` | Get a specific user's stories | — |

---

### 💬 Messages (`/messages`)

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| POST | `/messages/sendMessage` | Send a message (REST fallback) | `{ MsgUid, senderUuid, receiverUuid, type, msg, timestamp, ... }` |
| POST | `/messages/uploadMedia` | Upload media for chat | `multipart/form-data`: `media` |
| GET | `/messages/getAllChats` | Get all chat conversations | — |
| GET | `/messages/checkPendingMessages` | Get count of pending messages | — |
| POST | `/messages/getPendingMessages` | Fetch pending messages from a sender | `{ senderUuid }` |
| POST | `/messages/updateMessageDeliveryStatus` | Mark messages as delivered | `{ senderUUid, receiverUUid }` |
| PATCH | `/messages/deleteMessageForMe` | Delete message for self | `{ MsgUid, Role }` |
| PATCH | `/messages/unSendMessage` | Unsend message for everyone | `{ MsgUid, receiverUUid }` |

---

### 🔔 FCM (`/fcm`)

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| PATCH | `/fcm/updateToken` | Register/update device FCM token | `{ token }` |

---

### 🔍 Search (`/search`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/search` | Search for users |

---

### 🛡️ Admin Panel (`/admin/v1`)

> Requires admin authentication token via `Authorization: Bearer <admin_token>`.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/admin/v1/auth/login` | Admin login |
| GET | `/admin/v1/users` | List all users |
| GET | `/admin/v1/users/:userid` | View user details |
| PATCH | `/admin/v1/users/ban/:userid` | Ban a user |
| PATCH | `/admin/v1/users/unban/:userid` | Unban a user |
| GET | `/admin/v1/posts` | List all posts |
| DELETE | `/admin/v1/posts/:postid` | Delete any post |
| GET | `/admin/v1/story` | List all stories |
| DELETE | `/admin/v1/story/:storyid` | Delete any story |
| GET | `/admin/v1/comments` | List all comments |
| DELETE | `/admin/v1/comments/:commentid` | Delete any comment |
| GET | `/admin/v1/stats` | Platform engagement stats (users, likes, comments, post views — with week-over-week trend) |

---

## 🏛️ Architecture Notes

### Session Management
JWT tokens embed both `userid` and `sessionId`. On each request the `sessionId` is validated:
1. **Redis first** (fast path) — cached with TTL.
2. **MySQL fallback** — if Redis miss, fetch from DB and re-cache.

Logout sets `sessionId = NULL` in DB and deletes the Redis key, instantly invalidating the session everywhere.

### OTP-Gated Registration
1. Client calls generate OTP → email/SMS is sent.
2. Client verifies OTP → server issues a short-lived JWT containing the verified phone/email.
3. Client uses that JWT as the `Authorization` header on the register endpoint.
4. Register endpoint reads the email/phone from the decoded token — not from the body — preventing spoofing.

### Background Media Uploads
API responds `201 Created` immediately after file receipt. Cloudinary upload and DB insertion run in the background (`backgroundUpload()`). This prevents mobile timeouts on slow networks.

Upload source is controlled by `PRODUCTION` env var:
- `true` → reads from `req.file.buffer` (RAM, suitable for Vercel/serverless)
- `false` → reads from `req.file.path` (disk temp file, suitable for local dev)

### Privacy-Aware Queries
Post feeds, user profiles, and social lists all enforce privacy inline using SQL `LEFT JOIN` on `followers` with `isApproved = true`. Private account content is filtered at the database level — no application-layer checks needed.

### Real-Time Messaging — 3-Tier Delivery

```
Client sends (Socket "CToS" event)
     │
     ├─ Receiver online? ──Yes──► Emit "StoC" via Socket.io
     │                            └── DB insert (deliveryStatus=1)
     │
     └─ No ─► FCM token exists? ──Yes──► sendMessage() via Firebase
                                         └── DB insert (deliveryStatus=1)
                │
                └─ No ────────────────► DB insert only (deliveryStatus=0)
                                        └── Fetched on reconnect via /messages/checkPendingMessages
```

**Delivery status codes:**
| Code | Meaning |
|---|---|
| `0` | Sent, not yet delivered |
| `1` | Delivered |
| `2` | Received (client acknowledged) |
| `3` | Seen (read) |

### FCM Notification Events
Notifications are fired (fire-and-forget) for:
- New follower / follow request sent
- Follow request accepted / cancelled / rejected
- Unfollow
- New message (when receiver is offline)
- Message unsent
- Message delivery status changes

---

## 📄 License

This project is licensed under the **ISC License**.
