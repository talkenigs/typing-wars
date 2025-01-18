import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { defaultRoom, User } from '@typing-wars/types';

let room = defaultRoom;

const isUserExist = (user: User) =>
  room.users.find((roomUser) => user.name === roomUser.name);

@WebSocketGateway({ cors: { origin: '*' } })
export class ProgressGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('connected');
  }

  handleDisconnect() {
    room = { users: [] };
  }

  async sendUpdate(message) {
    this.server.emit('updateProgress', { message });
  }

  async addRoomUser(user: User) {
    console.log(room);
    if (!isUserExist(user)) {
      room.users.push(user);
    }

    this.server.emit('userLoggedIn', room);
    this.server.emit('roomUpdated', room);
  }

  async createUser(user: User) {
    if (!isUserExist(user)) {
      room.users.push(user);
    }

    this.server.emit('roomUpdated', room);
  }

  @SubscribeMessage('joined')
  async joinRoom(
    @MessageBody()
    user: User
  ) {
    this.addRoomUser(user);
  }

  @SubscribeMessage('updateProgress')
  async updateProgress(
    @MessageBody()
    payload: string
  ) {
    this.sendUpdate(payload);
  }
}
