const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const {models, db} = require('./db')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req }) {
    // 相当于在这个地方可以完成鉴权， 如果没权限就直接抛出一个错误
    const jwt = req.headers.authorization;
    console.log(jwt);
    const user = models.User.findOne();
    return {
      models,
      db,
      user
    }
}})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})
