const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');



const typeDefs = gql`
  type User {
    email: String!
    avatar: String!
    friends: [User]!
  }

  type Shoe {
    brand: String!
    size: Int!
  }

  input ShoeInput {
    brand: String!
    size: Int!
  }


  type Query {
    me: User!
    shoes(input: ShoeInput): [Shoe]!
  }
`

const resolvers = {
  Query: {
    shoes(_, { input }) {
      console.log(input);
      return [
        {brand: 'nike',size: 41},
        {brand: 'nike',size: 42},
        {brand: 'nike',size: 43},
        {brand: 'nike',size: 44},
        input
      ]
    },
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