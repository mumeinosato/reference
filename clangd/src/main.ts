import { WebSocketServer } from "ws";
import * as rpc from "vscode-ws-jsonrpc";
import * as lsp from "vscode-languageserver";
import * as server from "vscode-ws-jsonrpc/server";
import { Message } from "vscode-languageserver";

const port: number = 3030;

const wss = new WebSocketServer({
    perMessageDeflate: false,
    port: port,
});

wss.on("connection", (ws, req) => {
    console.log("connected");

    ws.on("close", () => {
        console.log("disconnected");
    });

    ws.on("error", (err) => {
        console.error(err);
    });

    launch(rpc.toSocket(ws));
});

/**
 * TypeScript言語サーバーを起動する
 * @param {rpc.IWebSocket} socket
 */
function launch(socket: rpc.IWebSocket): void {
    const reader = new rpc.WebSocketMessageReader(socket);
    const writer = new rpc.WebSocketMessageWriter(socket);

    const socketConnection = server.createConnection(reader, writer, () =>
        socket.dispose()
    );
    const serverConnection = server.createServerProcess("clangd", "--compile-commands-dir=/work");
    if (serverConnection) {
        server.forward(socketConnection, serverConnection, (message) => {
            if (Message.isRequest(message)) {
                if (message.method === lsp.InitializeRequest.type.method) {
                    const initializeParams = message.params as lsp.InitializeParams;
                    if (initializeParams) {
                        initializeParams.processId = process.pid;
                    }
                }
            }
            return message;
        });
    } else {
        console.error("Failed to create server process.");
    }
}

console.log(`launched server on ${port}`);
