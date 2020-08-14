const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Post {
    id: ID
    title: String
    Destription: String
  }

  extend type Query {
    posts: [Post]
  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      try {
        const posts = await axios.get("http://localhost:3000/posts");
        return posts.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
