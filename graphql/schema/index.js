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
    createdItems: [PlanItem!]
}

type PlanItem {
    _id: ID!
    habitPlan: HabitPlan!
    itemName: String!
    itemType: String!
    itemGoal: Float!
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

type RootQuery {
    HabitPlan: [HabitPlan!]
    login(email: String!, password: String!): AuthData!
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