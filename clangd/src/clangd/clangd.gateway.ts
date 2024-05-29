import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { exec } from 'child_process';

@WebSocketGateway()
export class ClangdGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  hendleMessage(client: Socket, payload: string): void {
    console.log('Received:', payload);

    exec(`echo ${payload} | clangd`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        client.emit('response', `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        client.emit('response', `Stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      client.emit('response', `Result: ${stdout}`);
    });
  }
}
