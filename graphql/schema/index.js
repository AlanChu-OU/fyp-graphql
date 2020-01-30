const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    _id: ID!
    email: String!
    password: String
    userName: String!
    height: Float
    weight: Float
    createdHabits: [HabitPlan!]
}

type HabitPlan {
    _id: ID!
    habitName: String!
    habitType: String!
    startDate: String!
    endDate: String
    creator: User!
}

input UserInput {
    email: String!
    password: String!
    userName: String!
}

input PlanInput {
    habitName: String!
    habitType: String!
    startDate: String!
    endDate: String
    creator: ID!
}

type AuthData {
    userId: ID!
    token: String!
}

type RootQuery {
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createUser(userInput: UserInput): User
    createHabitPlan(planInput: PlanInput): HabitPlan
}

schema {
    query: RootQuery
    mutation: RootMutation
}`);