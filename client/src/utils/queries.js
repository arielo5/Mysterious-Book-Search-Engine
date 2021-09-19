import { gql } from "graphql-tag";

export const QUERY_USER = gql`
  query user {
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
`;
