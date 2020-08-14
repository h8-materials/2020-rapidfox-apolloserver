const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    age: Int
  }

  extend type Query {
    users: [User]
    user(id: ID): User
  }

  input UserInput {
    name: String!
    age: Int!
  }

  extend type Mutation {
    addUser(user: UserInput): User
  }
`;

const apiUrl = "http://localhost:3001/users";

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await axios.get(apiUrl);
        return users.data;
      } catch (error) {
        console.log(error);
      }
    },
    user: async (parent, args, contex, info) => {
      try {
        const id = args.id;
        const user = await axios.get(`${apiUrl}/${id}`);
        return user.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const newUser = args.user;
        const user = await axios.post(`${apiUrl}`, newUser);
        return user.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
