## Setup The Project

## 1. Clone The Project

    ```bash
        git clone https://github.com/ign-ace/ss_assignment
    ```

## 2. Install

```bash
    npm i
```

## 3. Setup the env as the given DEMO env

```http
    PORT = 3000
    DB_USER =
    DB_HOST =
    DB_NAME =
    DB_PASSWORD =
    DB_PORT =
    JWT_SECRET =
```

Here I used the PostgreSQL feature to get a cloud deployed DB by PostgreSQL

All the above keys were provided by it and you can use third-party service like I used TablePlus to view my tables.

## 4. Run the Project

```http
    npm run dev
```

## Deployed URL of Backend

https://ss-assignment-9h14.onrender.com

We just need to change the URL as :

```http
http://localhost:3000/api/users/login

                to

https://ss-assignment-9h14.onrender.com/api/users/login
```

## API Reference

Let's consider the PORT in .env is at 3000

#### 1. Signup User

```http
  POST http://localhost:3000/api/users/register
```

#### Json needed for signup

```http
     {
         "email": "john8@example.com",
         "password": "12345678",
         "name": "John Doe8",
         "isAdmin":<true or false>
     }
```

#### 2. Login User

```http
  POST http://localhost:3000/api/users/login
```

#### Json needed for login

```http
        {
          "email": "john8@example.com",
          "password": "12345678"
        }
```

In this we get a token which we have to use as header for any further api routes

The header should be of format :
authorization : Bearer <token>

#### 3. Get User By ID

```http
  GET http://localhost:3000/api/users/user/<id>
```

#### 4. Update User By ID

```http
  PUT http://localhost:3000/api/users/user/<id>

```

#### Json Required

```http
        {
            "name":"Alexa2", // updated data
            "email":"john4@example.com" // old data
        }
```

We need to give both name as well as email as both are set to NOT NULL

#### 5. Delete User By ID

```http
  DELETE http://localhost:3000/api/users/user/<id>
```

#### 6. Get All User (ADMIN ONLY)

```http
  GET http://localhost:3000/api/users/admin
```

#### Admin can access all above routes and make changes as they seem fit.

```http
  One of admin credentials
      {
          "email": "john5@example.com",
          "password": "12345678"
      }
```
