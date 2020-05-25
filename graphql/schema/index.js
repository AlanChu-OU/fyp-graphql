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
    localID: Int
    newItems: [PlanItem!]
}

type PlanItem {
    _id: ID!
    habitPlan: HabitPlan!
    itemName: String!
    itemType: String!
    itemGoal: Float
    createdRecords: [PlanRecord!]
    localID: Int
    newRecords: [PlanRecord!]
}

type PlanRecord {
    _id: ID!
    planItem: PlanItem!
    recordDate: String!
    progress: Float
    isDone: Boolean!
    localID: Int
}

type Coach {
    _id: ID!
    user: User!    
}

type Student {
    _id: ID!
    user: User!
    coach: Coach!
}

type CoachPlan {
    _id: ID!
    habitName: String!
    habitType: String!
    startDate: String!
    endDate: String
    coach: Coach!
    student: Student!
    createdItems: [CoachItem!]
}

type CoachItem {
    _id: ID!
    coachPlan: CoachPlan!
    itemName: String!
    itemType: String!
    itemGoal: Float
}

type CoachRequest {
    _id: ID!
    coach: Coach!
    user: User!
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
    localID: Int
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

input PlansInput {
    habitName: String!
    habitType: String!
    startDate: String!
    endDate: String
    localID: Int
    Items: [ItemsInput!]
}

input ItemsInput {
    itemName: String!
    itemType: String!
    itemGoal: Float
    localID: Int
    Records: [RecordsInput!]
}

input RecordsInput {
    recordDate: String!
    progress: Float
    isDone: Boolean!
    localID: Int
}

type AuthData {
    userName: String!
    userId: ID!
    token: String!
}

type Message {
    message: String!
}

type RootQuery {
    test: String
    habitPlan: [HabitPlan!]
    login(email: String!, password: String!): AuthData!
    logout(userId: ID!, token: String!): Message!
    pullAllPlans: [HabitPlan!]
    searchPlan(keyword: String!): [HabitPlan!]
    findCoaches: [Coach!]!
}

type RootMutation {
    createUser(userInput: UserInput): User
    createHabitPlan(planInput: PlanInput): HabitPlan
    createItem(itemInput: ItemInput): PlanItem
    createRecord(recordInput: RecordInput): PlanRecord
    setPublish(plan_id: ID!, isPublish: Boolean!): Message!
    pushPlans(creator: ID!, newPlans: [PlansInput!]!): [HabitPlan!]!
    pushItems(creator: ID!, plan_id: ID!, newItems: [ItemsInput!]!): [PlanItem!]!
    pushRecords(creator: ID!, item_id: ID!, newRecords: [RecordsInput!]!): [PlanRecord!]!
    beCoach(userId: ID!): Message!
    addCoach(userId: ID!, coachId: ID!): Message
}

schema {
    query: RootQuery
    mutation: RootMutation
}`);