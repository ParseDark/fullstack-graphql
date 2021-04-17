const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');



const typeDefs = gql`
  type User {
    email: String!
    avatar: String!
    friends: [User]!
  }

  type Query {
    me: User!
  }
`

const resolvers = {
  Query: {
    me() {
      return {
        email: 'hawei@paypal.com',
        avatar: 'image.png',
        friends: []
      }
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4000).then(() => {
  console.log('Apollo Server runing on 4000 port. ');
})