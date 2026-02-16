const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
    designation: String
    department: String
  }

  type SignupResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type AuthResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type Query {
    login(email: String!, password: String!): AuthResponse!
    employees: [Employee]
    employee(eid: ID!): Employee
    searchEmployee(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): SignupResponse!
    addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!, designation: String, department: String): Employee!
    updateEmployee(eid: ID!, first_name: String, last_name: String, email: String, gender: String, salary: Float, designation: String, department: String): Employee!
    deleteEmployee(eid: ID!): Employee!
  }
`;

module.exports = typeDefs;
