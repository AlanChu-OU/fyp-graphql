const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    _id: ID!
    email: String!
    password: String
    userName: String!
    height: Float
    weight: Float
    gender: String
    sessionToken: String
    createdHabits: [HabitPlan!]
}

type HabitPlan {
    _id: ID!
    habitName: String!
    habitType: String!
    startDate: String!
    endDate: String
    isPublished: Boolean!
    creator: User!
    isActive: Boolean!
    createdItems: [PlanItem!]
}

type PlanItem {
    _id: ID!
    habitPlan: HabitPlan!
    itemName: String!
    itemType: String!
    itemGoal: Float
    createdRecords: [PlanRecord!]
}

type PlanRecord {
    _id: ID!
    planItem: PlanItem!
    recordDate: String!
    progress: Float
    isDone: Boolean!
}

input UserInput {
    email: String!
    password: String!
    userName: String!
    height: Float
    weight: Float
    gender: String
}

input PlanInput {
    habitName: String!
    habitType: String!
    startDate: String!
    endDate: String
    creator: ID!
}

input ItemInput {
    habitPlan: ID!
    itemName: String!
    itemType: String!
    itemGoal: Float
}

input RecordInput {
    planItem: ID!
    recordDate: String!
    progress: Float
    isDone: Boolean!
}

type AuthData {
    userId: ID!
    token: String!
}

type Message {
    msg: String!
}

type RootQuery {
    test: String
    HabitPlan: [HabitPlan!]
    login(email: String!, password: String!): AuthData!
    logout(userId: ID!, token: String!): Message!
    pullAllPlans(userId: ID!): [HabitPlan!]
}

type RootMutation {
    createUser(userInput: UserInput): User
    createHabitPlan(planInput: PlanInput): HabitPlan
    createItem(itemInput: ItemInput): PlanItem
    createRecord(recordInput: RecordInput): PlanRecord
}

schema {
    query: RootQuery
    mutation: RootMutation
}`);