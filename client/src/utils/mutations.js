import { gql } from 'graphql-tag';

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        saveBooks{
            author
            description
            bookId
            link
            title
            image
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: bookInput) {
    saveBook(input: $input) {
      _id
      username
      email
      bookCount
      saveBooks {
        author
        description
        bookId
        link
        title
        image
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        saveBooks {
          author
          description
          bookId
          link
          title
          image
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email:String!, $password:String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        bookCount
        saveBooks {
          author
          description
          bookId
          link
          title
          image
        }
      }
    }
  }
`;