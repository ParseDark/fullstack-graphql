/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    // _
    // __: from client query arguments
    pets(_, __, ctx) {
      return ctx.models.Pet.findMany();
      // return [{}, {}];
    },
    getUsers(_, __, ctx) {
      return ctx.models.User.findOne();
    }
    
  },
  // Mutation: {
    
  // },
  Pet: {
    // id(pet) {
    //   console.log(pet);
    //   return 3;
    // },
    // img(pet) {
    //   return pet.type === 'DOG'
    //     ? 'https://placedog.net/300/300'
    //     : 'http://placekitten.com/300/300'
    // }
  },
  User: {
    
  }
}
