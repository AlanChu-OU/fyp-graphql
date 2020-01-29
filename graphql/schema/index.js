const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    _id: ID!
    email: String!
    password: String
    userName: String!
    height: Float
    weight: Float
    createdHabits: [HabbitPlan!]
}

type HabbitPlan {
    _id: ID!
    habitName: String!
    habitType: String!
    startDate: String!
    endDate: String
}

input UserInput {
    email: String!
    password: String!
    userName: String!
}

type AuthData {
    token: String
}

type RootQuery {
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}`);