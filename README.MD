# Post Management API

This project is a Node.js application for managing posts and tags. It provides endpoints to create and retrieve posts, including functionality for image uploads, sorting, pagination, and filtering by keywords and tags.

## Features

- Create posts with title, description, tags, and an image.
- Retrieve posts with sorting, pagination, keyword search, and tag filtering.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sheeshmirza/post-project.git
   cd post-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
MONGODB_URI=mongodb://localhost:27017/posts
```

Replace the MongoDB URI with your own connection string if necessary.

## Running the Application

1. Start the Node.js server:

   ```bash
   npm run start
   ```

The server will start on `http://localhost:3000`.

## API Endpoints

### Add Post

- **URL:** `/posts`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: multipart/form-data`
- **Body:**
  - `title` (string, required)
  - `desc` (string, required)
  - `tags` (string, JSON array, required)
  - `image` (file, optional)

Example Request:

```json
{
  "title": "Sample Title",
  "desc": "Sample Description",
  "tags": ["tag1", "tag2"]
}
```

### Get Posts

- **URL:** `/posts`
- **Method:** `GET`
- **Query Parameters:**
  - `sortBy` (string, optional, default: "createdAt")
  - `order` (string, optional, default: "desc")
  - `skip` (number, optional, default: 0)
  - `limit` (number, optional, default: 10)
  - `keyword` (string, optional)
  - `tag` (string, optional)

Example URL:

```
http://localhost:3000/posts?sortBy=createdAt&order=desc&skip=0&limit=10&keyword=sample&tag=tag1
```

## Error Handling

The application includes an error handler middleware that captures and responds with appropriate error messages. Errors are returned in the following format:

```json
{
  "success": false,
  "message": "Error message"
}
```
