const { gql } = require("apollo-server-core");
module.exports = gql`
  union ChatRoomReciver = User | Group

  input CreateChatRoomInput {
    name: String!
  }
  input UpdateChatRoomInput {
    id: ID!
    name: String
  }
  input CreateMessageInput {
    chatRoomId: ID!
    content: String!
    senderId: ID!
    reciverId: ID!
  }
  input UpdateMessageInput {
    id: ID!
    content: String
  }

  type Group {
    id: ID!
    name: String!
    avatar: String!
  }

  type Message {
    roomId: ID!
    userId: ID!
    message: String!
  }

  type ChatRoomMessage {
    sender: ChatRoomReciver
    reciver: ChatRoomReciver
    message: Message
  }

  type ChatRoom {
    id: ID!
    name: String!
    messages: [ChatRoomMessage]
  }

  type Query {
    room(roomId: ID!, userId: ID!): ChatRoom
    rooms: [ChatRoom]
  }

  type Mutation {
    createRoom(input: CreateChatRoomInput!): MutationResponse
    updateRoom(input: UpdateChatRoomInput!): MutationResponse
    deleteRoom(id: ID!): MutationResponse
    createMessage(input: CreateMessageInput!): MutationResponse
    updateMessage(input: UpdateMessageInput!): MutationResponse
    deleteMessage(id: ID!): MutationResponse
  }
`;
