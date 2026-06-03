import { OnEvent } from '@nestjs/event-emitter';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { AppInfoService } from 'src/app-info.service';
import {
  WEBSOCKET_APP_EVENT,
  WEBSOCKET_APP_ROOM,
} from 'src/const/gateway.constant';

@WebSocketGateway({
  namespace: '/ws',
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server!: Server;

  constructor(private readonly appInfoService: AppInfoService) {}

  handleConnection(socket: Socket): void {
    console.log('Client connected:', socket.id);
  }

  handleDisconnect(socket: Socket): void {
    console.log('Client disconnected:', socket.id);
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() room: string,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    await socket.join(room);
    console.log(`Client ${socket.id} joined room ${room}`);
    
    if (room === WEBSOCKET_APP_ROOM) {
      const history = await this.appInfoService.findHistory();
      socket.emit(WEBSOCKET_APP_EVENT, history);
      console.log(`App history data sent to client ${socket.id}`);
    }
  }

  @SubscribeMessage('leave')
  async handleLeave(
    @MessageBody() room: string,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    await socket.leave(room);
    console.log(`Client left room: ${room}`);
  }

   @OnEvent('history.updated')
  async handleHistoryUpdated(): Promise<void> {
    const history = await this.appInfoService.findHistory();
    this.server.to(WEBSOCKET_APP_ROOM).emit(WEBSOCKET_APP_EVENT, history);
  }
}
