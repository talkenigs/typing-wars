import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { defaultRoom, User } from '@typing-wars/types';
import { Logger } from '@nestjs/common';

const room = defaultRoom;

const isUserExist = (user: User) =>
  room.users.find((roomUser) => user.name === roomUser.name);

@WebSocketGateway({ cors: { origin: '*' } })
export class ProgressGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ProgressGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('connected');
  }

  handleDisconnect() {
    console.log('disconnected');
  }

  async updateRoomProgress({ progress, user }) {
    room.users.map((dbUser) => {
      if (!user || !user.name) {
        return dbUser;
      }
      if (dbUser.name === user.name) {
        dbUser.progress = progress;
        return;
      }
    });
    this.server.emit('roomUpdated', room);
  }

  async addUser(name: string, client: Socket) {
    const user: User = {
      name,
      clientId: client.id,
      progress: 0,
    };

    this.logger.log(isUserExist(user));
    if (!isUserExist(user)) {
      room.users.push(user);
    }

    client.emit('userLoggedIn', user);
    this.server.emit('roomUpdated', room);
  }

  @SubscribeMessage('joined')
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    { name }: { name: string }
  ) {
    this.addUser(name, client);
  }

  @SubscribeMessage('updateProgress')
  async updateProgress(
    @MessageBody()
    { progress, user }: { progress: number; user: User }
  ) {
    this.updateRoomProgress({ progress, user });
  }
}
