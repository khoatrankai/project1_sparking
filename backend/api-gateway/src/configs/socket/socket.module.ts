import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway() 
export class MyGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket initialized',server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id,args},`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    console.log(`Message from client: ${payload}`);
    this.server.emit('msgToClient', payload); // Gửi tin nhắn tới tất cả các client
  }
}
