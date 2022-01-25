const { gql } = require("apollo-server-core");
module.exports = gql`
  enum TypeReceiver {
    user
    group
  }

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
    typeReceiver: TypeReceiver!
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
    id: ID!
    content: String!
    typeReceiver: TypeReceiver!
  }

  type ChatRoomMessage {
    sender: User
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
    message(id: ID!): ChatRoomMessage
    messages: [ChatRoomMessage]
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
