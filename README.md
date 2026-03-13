# Portfolio CMS Backend

A scalable **Node.js + Express + MongoDB backend** for managing a developer portfolio.
It allows updating profile information, skills, achievements, education, and other sections dynamically using a single update API.

This project is designed with **future scalability in mind**, allowing support for multiple users and portfolio profiles later.


## 🚀 Features

* RESTful API built with **Express.js**
* **MongoDB + Mongoose** for data modeling
* Dynamic update system using **MongoDB dot notation**
* Single API to update nested profile fields
* Structured schema for portfolio sections
* Clean modular controller architecture
* Ready for future **authentication and multi-user support**


## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Postman** (for API testing)


## 📁 Project Structure

```
portfolio-backend
│
├── controllers
│   └── userController.js
│
├── models
│   ├── userModel.js
│   ├── skillSchema.js
│   ├── educationSchema.js
│   └── achievementSchema.js
│
├── routes
│   └── userRoutes.js
│
├── config
│   └── db.js
│
├── utils
│   └── flattenObject.js
│
├── .env
├── server.js
└── package.json
```

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/portfolio-backend.git
```

Navigate into the project

```bash
cd portfolio-backend
```

Install dependencies

```bash
npm install
```


## 🔑 Environment Variables

Create a `.env` file in the root directory.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```


## ▶️ Running the Server

Start the development server

```bash
npm run dev
```

or

```bash
npm start
```

Server will run at:

```
http://localhost:5000
```


## 📡 API Endpoints

### Get User Profile

```
GET /api/user
```

Returns the portfolio user data.


### Update User Profile

```
PATCH /api/user
```

Updates profile fields dynamically.

Example payload:

```json
{
  "name": "Sayar Samanta",
  "profileImg": "https://image-url.com/profile.png",
  "about.intro.headline": "Fullstack Developer",
  "about.skills": [
    {
      "name": "React",
      "percentage": 80,
      "type": "Frontend"
    }
  ]
}
```

MongoDB automatically updates nested fields using **dot notation**.


### Delete User

```
DELETE /api/user
```

Deletes the portfolio user document.


## 📦 Example User Schema Structure

```json
{
  "name": "Sayar Samanta",
  "profileImg": "url",
  "email": "sayar@example.com",
  "about": {
    "intro": {
      "headline": "Fullstack Developer",
      "subText": "Building modern applications",
      "story": "Developer journey description"
    },
    "skills": [],
    "achievements": [],
    "education": [],
    "featuredProjects": [],
    "personalInterests": []
  }
}
```


## 🔄 Dynamic Update Strategy

The frontend flattens nested objects before sending them to the backend.

Example conversion:

Input:

```json
{
  "about": {
    "intro": {
      "headline": "Fullstack Developer"
    }
  }
}
```

Flattened payload:

```json
{
  "about.intro.headline": "Fullstack Developer"
}
```

MongoDB `$set` updates only the specified field.


## 🧪 API Testing

You can test APIs using:

* Postman
* Thunder Client
* Insomnia

Example request:

```
PATCH /api/user
```

Payload:

```json
{
  "about.intro.headline": "Modern Fullstack Engineer"
}
```

---

## 📈 Future Improvements

* User authentication (JWT)
* Login APIs
* Single-user portfolio support (Multiple User Support Future Scope)
* Portfolio templates
* Public portfolio URLs
* Image upload support
* Admin dashboard


## 👨‍💻 Author

**Sayar Samanta**

GitHub:
https://github.com/sayarsamanta


## 📄 License

This project is licensed under the **MIT License**.
