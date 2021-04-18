const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const sheosList = []


const typeDefs = gql`
  """
  ShoeType list
  """
  enum ShoeType {
    JORDAN
    NIKE
    ADIDDAS
  }

  type User {
    email: String!
    avatar: String!
    friends: [User]!
  }

  type Shoe {
    brand: ShoeType!
    size: Int!
  }

  input ShoeInput {
    brand: ShoeType!
    size: Int!
  }


  type Query {
    me: User!
    shoes(input: ShoeInput): [Shoe]!
  }

  type Mutation{
    newSheo(input: ShoeInput): Shoe
  }
`

const resolvers = {
  Query: {
    shoes(_, { input }) {
      console.log(input);
      return sheosList;
    },
    me() {
      return {
        email: 'hawei@paypal.com',
        avatar: 'image.png',
        friends: []
      }
    }
  },
  Mutation: {
    newSheo(_, { input }) {
      console.log(input);
      sheosList.push(input);
      return input;
    },
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4000).then(() => {
  console.log('Apollo Server runing on 4000 port. ');
})