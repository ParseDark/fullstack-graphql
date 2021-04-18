/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    // _
    // __: from client query arguments define from schema
    // 参数的来源有两种：内置类型，输入类型：
    // 内置类型:
    // 输入类型：通过input关键字定义输入字段的shape 
    pets(_, { input }, ctx) {
      return ctx.models.Pet.findMany(input);
      // return [{}, {}];
    },
    pet(_, { input }, ctx) {
      return ctx.models.Pet.findOne(input);
    },
    getUsers(_, __, ctx) {
      return ctx.models.User.findOne();
    }
    
  },
  Mutation: {
    newPet(_, { input }, ctx) {
      return ctx.models.Pet.create(input)
    },
    newUser(_, { input }, ctx) {
      return ctx.models.User.create(input)
    },
  },
  Pet: {
    // id(pet) {
    //   console.log(pet);
    //   return 3;
    // },
    img(pet) {
      return pet.type === 'DOG'
        ? 'https://placedog.net/300/300'
        : 'http://placekitten.com/300/300'
    }
  },
  User: {
    
  }
}
