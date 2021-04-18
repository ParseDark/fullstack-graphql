const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
    type User {
        id: ID!
        username: String!
    }

    type Pet {
        id: ID!
        createdAt: String! 
        name: String!
        type: String!
        img: String!
    }

    # 输入类型：通过input关键字定义输入字段的shape 
    input PetInput {
        name: String!
        type: String
    }

    type Query {
        pets(input: PetInput): [Pet]!
        pet(input: PetInput): Pet
        getUsers: User!
    }

    input UserInput {
        username: String!
    }

    type Mutation{
        newPet(input: PetInput): Pet!
        newUser(input: UserInput): User!
    }
`;

module.exports = typeDefs
