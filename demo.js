const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const sheosList = [
  {
    brand: 'NIKE', size: 41, sport:  'Basketball', user: 1
  },
  {
    brand: 'NIKE', size: 40, sport:  'football', user: 1
  },
  {
    brand: 'JORDAN', size: 40, hasGrip: true, user: 2
  },
]

const user1 = {
  id: 1,
  email: 'hawei@paypal.com',
  avatar: 'image.png',
  friends: [],
  shoes: [{
    brand: 'NIKE', size: 41, sport:  'Basketball', user: 1
  },
  {
    brand: 'JORDAN', size: 40, hasGrip: true, user: 2
  },
  ]
}


const typeDefs = gql`
  # union Footware = Sneaker | Boot
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
    shoes: [Shoe]!
  }

  interface Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    sport: String
    user: User!
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    hasGrip: Boolean
    user: User!
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
      return user1
    }
  },
  Mutation: {
    newSheo(_, { input }) {
      console.log(input);
      sheosList.push(input);
      return input;
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return 'Sneaker';
      return 'Boot';
    }
  },
  // Footware: {
  //   __resolveType(shoe) {
  //     if (shoe.sport) return 'Sneaker';
  //     return 'Boot';
  //   }
  // }
  Sneaker: {
    user(shoe) {
      return user1
    }
  },
  Boot: {
    user(shoe) {
      return user1
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