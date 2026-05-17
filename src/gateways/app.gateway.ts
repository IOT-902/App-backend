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
import {
  WEBSOCKET_APP_EVENT,
  WEBSOCKET_APP_ROOM,
} from 'src/const/gateway.constant';
import { AppStore } from 'src/store/app-store.service';

@WebSocketGateway({
  namespace: '/ws',
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server!: Server;

  constructor(private readonly store: AppStore) {}

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

    console.log(`Client ${socket.id} joined room: ${room}`);

    if (room === WEBSOCKET_APP_ROOM) {
      socket.emit(WEBSOCKET_APP_EVENT, this.store.state);
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

  public afterInit() {
    this.store.setGateway(this);
  }

  public sendState(room: string, data: unknown): void {
    this.server.to(room).emit(WEBSOCKET_APP_EVENT, data);
  }
}
