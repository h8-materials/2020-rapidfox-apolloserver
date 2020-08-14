const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const userSchema = require("./schemas/userSchema");
const postSchema = require("./schemas/postSchema");

const typeDefs = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, userSchema.typeDefs, postSchema.typeDefs],
  resolvers: [userSchema.resolvers, postSchema.resolvers],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
