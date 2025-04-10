import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {z} from "zod";

const server = new McpServer({
  name: "example-server",
  version: "1.0.0"
});

// ... set up server resources, tools, and prompts ...

const app = express();

server.tool(
    "addTwoNumbers",
    "(a,b) => a + b)",
    {
    a: z.number(), 
    b: z.number()
    },
    async (data) => {
        const { a, b } = data;
        return [
            { 
                type: "text", 
                text: `The sum of ${a} and ${b} is ${a + b}`
            }
        ]
    }

)

// to support multiple simultaneous connections we have a lookup object from
// sessionId to transport
const transports= {};

app.get("/sse", async (req,res) => {
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;
  res.on("close", () => {
    delete transports[transport.sessionId];
  });
  await server.connect(transport);
});

app.post("/messages", async (req,res) => {
  const sessionId = req.query.sessionId ;
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});

app.listen(3001,()=>{
    console.log("Server listening on port 3001");
});