import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ProgressGateway {
  @WebSocketServer()
  server: Server;

  async sendUpdate() {
    this.server.emit('updateProgress', { message: 'hello' });
  }

  @SubscribeMessage('updateProgress')
  async updateProgress() {
    console.log('updateProgress');
    this.sendUpdate();
  }
}
