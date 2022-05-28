# PASPAS API

Express TS & GraphQL based blog api

## How to Use

1. Rename `.env.example` to `.env`
2. Fill the `.env` with your own configuration
3. Run `yarn` or `npm install` to install the dependencies
4. Run `yarn migrate` or `npm run migrate` to migrate your database
5. Run `yarn seed` or `npm run seed` to seed your database
6. Finally run `yarn dev` or `npm run dev` to start the server in Development Mode

## Example GraphQL queries and mutations

- Get all posts (can use optional pagination parameters)

```graphql
query {
  posts(limit: 10, page: 1, orderByFieldName: "title", orderByDirection: "ASC") {
    id
    title
    description
    content
    img
    isActive
    createdAt
    updatedAt
    category {
      id
      title
      isActive
      createdAt
      updatedAt
    }
  }
}
```

- Get post by id

```graphql
query {
  post(id: 1) {
    id
    title
    description
    content
    img
    isActive
    createdAt
    updatedAt
    category {
      id
      title
      isActive
      createdAt
      updatedAt
    }
  }
}
```

- Create post

```graphql
mutation {
  createPost(data: { title: "Post 1", description: "Description 1", content: "Content 1", categoryId: 1 }) {
    id
    title
    description
    content
    img
    isActive
    createdAt
    updatedAt
    category {
      id
      title
      isActive
      createdAt
      updatedAt
    }
  }
}
```

- Create post with file

```graphql
mutation ($file: Upload!) {
  createPost(
    file: $file
    data: { title: "Post 1", description: "Description 1", content: "Content 1", categoryId: 1 }
  ) {
    id
    title
    description
    content
    img
    isActive
    createdAt
    updatedAt
    category {
      id
      title
      isActive
      createdAt
      updatedAt
    }
  }
}
```

- Update post

```graphql
mutation {
  updatePost(
    id: 1
    data: {
      title: "Post 1 - edited"
      description: "Description 1 - edited"
      content: "Content 1 - edited"
      categoryId: 2
    }
  ) {
    id
    title
    description
    content
    img
    isActive
    createdAt
    updatedAt
    category {
      id
      title
      isActive
      createdAt
      updatedAt
    }
  }
}
```

- Delete post

```graphql
mutation {
  deletePost(id: 1) {
    id
    title
    description
    content
    img
    isActive
    createdAt
    updatedAt
    category {
      id
      title
      isActive
      createdAt
      updatedAt
    }
  }
}
```

- Get all categories

```graphql
query {
  categories {
    id
    title
    isActive
    createdAt
    updatedAt
  }
}
```

- Get category by id

```graphql
query {
  category(id: 1) {
    id
    title
    isActive
    createdAt
    updatedAt
  }
}
```

- Create category

```graphql
mutation {
  createCategory(data: { title: "Category 1" }) {
    id
    title
    isActive
    createdAt
    updatedAt
  }
}
```

- Update category

```graphql
mutation {
  updateCategory(id: 1, data: { title: "Category 1 - edited" }) {
    id
    title
    isActive
    createdAt
    updatedAt
  }
}
```

- Delete category

```graphql
mutation {
  deleteCategory(id: 1) {
    id
    title
    isActive
    createdAt
    updatedAt
  }
}
```

- Get all users

```graphql
query {
  users {
    id
    email
    password
    username
    firstname
    lastname
    isActive
    createdAt
    updatedAt
  }
}
```

- Get user by id

```graphql
query {
  user(id: 1) {
    id
    email
    password
    username
    firstname
    lastname
    isActive
    createdAt
    updatedAt
  }
}
```

- Create user

```graphql
mutation {
  createUser(
    data: { email: "test@test.com", password: "123123", username: "test", firstname: "test", lastname: "test" }
  ) {
    id
    email
    password
    username
    firstname
    lastname
    isActive
    createdAt
    updatedAt
  }
}
```

- Update user

```graphql
mutation {
  updateUser(
    id: 1
    data: { email: "test-edit@test.com", password: "123123", username: "test", firstname: "test", lastname: "test" }
  ) {
    id
    email
    password
    username
    firstname
    lastname
    isActive
    createdAt
    updatedAt
  }
}
```

- Delete user

```graphql
mutation {
  deleteUser(id: 1) {
    id
    email
    password
    username
    firstname
    lastname
    isActive
    createdAt
    updatedAt
  }
}
```

- Register user

```graphql
mutation {
  registerUser(
    data: { email: "test@test.com", password: "123123", username: "test", firstname: "test", lastname: "test" }
  ) {
    accessToken
    user {
      id
      email
      username
      firstname
      lastname
    }
  }
}
```

- Login user

```graphql
mutation {
  loginUser(data: { email: "test@test.com", password: "123123" }) {
    accessToken
    user {
      id
      email
      username
      firstname
      lastname
    }
  }
}
```

- Logout user

```graphql
mutation {
  logout
}
```

- Info user

```graphql
query {
  infoUser {
    id
    email
    username
    firstname
    lastname
    isActive
  }
}

{
  "authorization": "bearer <your access token>"
}
```
