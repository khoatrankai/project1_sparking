import { Inject
  , UseGuards } from '@nestjs/common';
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
import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { GetContentsDto } from '../project/dto/ContentsDto/get-content.dto';
import { GetContentsGroupDto } from '../project/dto/ContentsGroupDto/get-content_group.dto';

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
    const user = client['user']; // decode từ token

    if (user?.sub) {
      console.log(user.sub,"connect")
      client.join(user.sub);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('notify_new_chat')
  async handleAddChat(
    @MessageBody() data: { user: string }
  ) {

   this.server.to(data.user).emit('load_list_chat'); // broadcast
  }

  @SubscribeMessage('notify_new_chat_group')
  async handleAddChatGroup(
    @MessageBody() data: { user: string[] }
  ) {
    for(let i=0;i<data.user.length;i++){
      this.server.to(data.user[i]).emit('load_list_chat'); // broadcast
    }
  }
  

  @SubscribeMessage('notify_new_message')
  handleMessage(
    @MessageBody() data: {chat:string, user:string,data:GetContentsDto },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(data.user).emit('load_list_chat'); // broadcast
    // client.emit('load_list_chat'); // broadcast
    this.server.to(client['user'].sub).emit('load_list_chat');
    this.server.to(data.chat).emit('load_chat',{data:data.data}); // broadcast
  }

  @SubscribeMessage('notify_delete_message')
  handleDeleteMessage(
    @MessageBody() data: {chat:string, user:string,data:string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(data.user).emit('load_list_chat'); // broadcast
    this.server.to(client['user'].sub).emit('load_list_chat');
    this.server.to(data.chat).emit('load_delete_chat',{data:data.data}); // broadcast
  }

  @SubscribeMessage('notify_new_message_group')
  handleMessageGroup(
    @MessageBody() data: {chat_group:string,head:string,members:string[],data:GetContentsGroupDto },
    @ConnectedSocket() client: Socket,
  ) {
    for(let i = 0;i<data.members.length;i++){
      this.server.to(data.members[i]).emit('load_list_chat'); // broadcast
    }
    client.emit('load_list_chat'); // broadcast
    this.server.to(data.head).emit('load_list_chat'); // broadcast
    this.server.to(data.chat_group).emit('load_chat',{data:data.data}); // broadcast
  }

  @SubscribeMessage('notify_delete_message_group')
  handleDeleteMessageGroup(
    @MessageBody() data: {chat_group:string,head:string,members:string[],data:string },
    @ConnectedSocket() client: Socket,
  ) {
    for(let i = 0;i<data.members.length;i++){
      this.server.to(data.members[i]).emit('load_list_chat'); // broadcast
    }
    client.emit('load_list_chat'); // broadcast
    this.server.to(data.head).emit('load_list_chat'); // broadcast
    this.server.to(data.chat_group).emit('load_delete_chat',{data:data.data}); // broadcast
  }

   @SubscribeMessage('notify_delete_chat_group')
  handleDeleteChatGroup(
    @MessageBody() data: {chat_group:string,head:string,members:string[],data:string },
    @ConnectedSocket() client: Socket,
  ) {
    for(let i = 0;i<data.members.length;i++){
      this.server.to(data.members[i]).emit('load_list_chat'); // broadcast
    }
    client.emit('load_list_chat'); // broadcast
    this.server.to(data.head).emit('load_list_chat'); // broadcast
    this.server.to(data.chat_group).emit('load_delete_chat_group',{data:data.data}); // broadcast
  }

  @SubscribeMessage('notify_leave_chat_group')
  handleLeaveChatGroup(
    @MessageBody() data: {chat_group:string},
    @ConnectedSocket() client: Socket,
  ) {
   
    client.emit('load_list_chat'); // broadcast
    client.emit('load_delete_chat_group',{data:data.chat_group}); // broadcast
  }

  @SubscribeMessage('join_me')
async handleJoinMe(
  @ConnectedSocket() client: Socket,
) {
  
 const user = client['user']; // decode từ token

    if (user?.sub) {
      client.join(user.sub);
    }
}

 @SubscribeMessage('join_chat')
async handleJoinChat(
  @MessageBody() data: {chat:string },
  @ConnectedSocket() client: Socket,
) {
  client.join(data.chat);
//  const user = client['user']; // decode từ token
//     if (user?.sub) {
//       client.join(user.sub);
//     }
}

@SubscribeMessage('sendGroupMessage')
handleGroupMessage(
  @MessageBody() data: { groupId: string; message: string; user: string }
) {
  // Emit tới tất cả user trong phòng (group)
  this.server.to(data.groupId).emit('receiveGroupMessage', {
    user: data.user,
    message: data.message,
    groupId: data.groupId,
  });
}


}
