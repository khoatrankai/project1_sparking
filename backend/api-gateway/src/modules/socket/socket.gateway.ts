import { Inject, SetMetadata, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { firstValueFrom } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*', // hoặc chỉ định URL frontend như 'http://localhost:3000'
    credentials: true, 
  },
})
@UseGuards(JwtAuthGuard)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
      @Inject('PROJECT') private readonly projectClient: ClientProxy,
    ) {}
    
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { user: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Received message:', data,client.id);
    this.server.emit('receiveMessage', data); // broadcast
  }

  @SubscribeMessage('joinChats')
async handleJoinGroup(
  @ConnectedSocket() client: Socket,
) {
  
  const res = await firstValueFrom(this.projectClient.send({ cmd: 'get-id_chat_by_user' }, client['user']?.sub))
  for (const chatID of res.data) {
    client.join(chatID);
    console.log(`Client ${client.id} joined group ${chatID}`);
  }

  client.emit('joinedChats', { groups: res.data });
}

@SubscribeMessage('sendGroupMessage')
handleGroupMessage(
  @MessageBody() data: { groupId: string; message: string; user: string },
  @ConnectedSocket() client: Socket,
) {
  // Emit tới tất cả user trong phòng (group)
  this.server.to(data.groupId).emit('receiveGroupMessage', {
    user: data.user,
    message: data.message,
    groupId: data.groupId,
  });
}


}
