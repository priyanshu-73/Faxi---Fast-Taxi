# API Documentation: `POST /api/users/register`

## **Endpoint Description**
The `/api/users/register` endpoint allows new users to register by providing their personal details, such as first name, last name, email, and password. It validates the input, securely hashes the password, and creates a new user record in the database. Upon successful registration, it generates a JWT token for authentication.

---

## **Request**

### **HTTP Method**
`POST`

### **URL**
`/api/users/register`

### **Headers**
- `Content-Type: application/json`

### **Request Body**
The request body should be a JSON object with the following fields:

| Field             | Type   | Required | Description                                |
|-------------------|--------|----------|--------------------------------------------|
| `fullname`        | Object | Yes      | An object containing first and last names. |
| `fullname.firstname` | String | Yes   | The user's first name (min 3 characters).  |
| `fullname.lastname`  | String | Yes   | The user's last name (min 3 characters).   |
| `email`           | String | Yes      | The user's email address (must be valid).  |
| `password`        | String | Yes      | The user's password (min 6 characters).    |

#### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

## **Response**

### **Successful Response**

- **Status Code:** `201 Created`
- **Description:** User successfully registered, and a JWT token is generated.
- **Response Body:**

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "<USER_ID>",
    "createdAt": "<TIMESTAMP>",
    "updatedAt": "<TIMESTAMP>"
  }
}
```

### **Error Responses**

#### Validation Errors
- **Status Code:** `400 Bad Request`
- **Description:** One or more validation errors occurred.
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Missing Fields
- **Status Code:** `400 Bad Request`
- **Description:** Required fields are missing in the request body.
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "All fields are required"
    }
  ]
}
```

#### Server Errors
- **Status Code:** `500 Internal Server Error`
- **Description:** An unexpected error occurred on the server.
- **Response Body:**

```json
{
  "error": "An internal server error occurred. Please try again later."
}
```

---

## **Validation Rules**
- `email` must be a valid email address.
- `fullname.firstname` and `fullname.lastname` must each have at least 3 characters.
- `password` must be at least 6 characters long.

---

## **Notes**
- Ensure that the `Content-Type` header is set to `application/json` in the request.
- The `password` is securely hashed before storing in the database.
- JWT is returned for authentication, which can be used for subsequent API requests.

---

# API Documentation: `POST /api/users/login`

## **Endpoint Description**
The `/api/users/login` endpoint allows registered users to log in by providing their email and password. If the credentials are valid, the server responds with a JWT token for authentication.

---

## **Request**

### **HTTP Method**
`POST`

### **URL**
`/api/users/login`

### **Headers**
- `Content-Type: application/json`

### **Request Body**
The request body should be a JSON object with the following fields:

| Field      | Type   | Required | Description                                |
|------------|--------|----------|--------------------------------------------|
| `email`    | String | Yes      | The user's email address (must be valid).  |
| `password` | String | Yes      | The user's password (min 6 characters).    |

#### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

## **Response**

### **Successful Response**

- **Status Code:** `200 OK`
- **Description:** User successfully logged in, and a JWT token is generated.
- **Response Body:**

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "<USER_ID>",
    "createdAt": "<TIMESTAMP>",
    "updatedAt": "<TIMESTAMP>"
  }
}
```

### **Error Responses**

#### Invalid Credentials
- **Status Code:** `401 Unauthorized`
- **Description:** The provided email or password is incorrect.
- **Response Body:**

```json
{
  "message": "Invalid Credentials"
}
```

#### Validation Errors
- **Status Code:** `400 Bad Request`
- **Description:** One or more validation errors occurred.
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Server Errors
- **Status Code:** `500 Internal Server Error`
- **Description:** An unexpected error occurred on the server.
- **Response Body:**

```json
{
  "error": "An internal server error occurred. Please try again later."
}
```

---

## **Validation Rules**
- `email` must be a valid email address.
- `password` must be at least 6 characters long.

---

## **Notes**
- Ensure that the `Content-Type` header is set to `application/json` in the request.
- The server verifies the credentials and generates a JWT token upon successful authentication.
- Use the returned token for accessing protected endpoints.
