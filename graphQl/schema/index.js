const {buildSchema} = require('graphql')



module.exports = buildSchema(`
    type Label {
      _id: ID!
      user: User!
      image: Image!
      createdAt: String!
      updatedAt: String!
      answer: Int
    }

    type Image {
      _id: ID!
      title: String!
      question: String!
      done: Boolean
      date: String!
      poster: User!
      imageLabels: [Label!]
    }

    type User {
      _id: ID!
      email: String!
      password: String
      postedImages: [Image!]
    }

    type Authentify {
      userId: ID!
      token: String!
      tokenExpiration: Int!
    }

    input LabelInput{
      image: ID!
      answer: Int!
    }

    input ImageInput {
      title: String!
      question: String!
      done: Boolean!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type Query {
        images: [Image!]!
        labels: [Label!]!
        login(email: String!, password: String!): Authentify!
    }

    type Mutation {
        postImage(imageInput: ImageInput): Image
        createUser(userInput: UserInput): User
        labelImage(labelInput: LabelInput): Label
        cancelLabel(LabelId: ID!): Image!
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);
