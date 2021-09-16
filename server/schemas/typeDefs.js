const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        saveBooks: [Book]
    }

    type Book {
        author: [String!]
        description: String!
        bookId: String!
        link: String!
        title: String!
        image: String!
    }

    type Query {
        user: User
    }

    type Auth {
        token: ID
        user: User
    }

    type Mutation {
        deleteBook(bookId: String!): User
        saveBook(input: bookInput): User
        addUser(username: String!, email:String!, password:String!): Auth
        login(email:String!, password:String!): Auth        
    }

`

module.exports = typeDefs;