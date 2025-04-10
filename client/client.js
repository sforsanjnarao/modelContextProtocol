import { config } from "dotenv";
import readline from "readline/promises";
import { GoogleGenAI} from "@google/genai";
import {Client} from "@modelcontextprotocol/sdk/client/client.js";
import {SSEClientTransport} from "@modelcontextprotocol/sdk/client/sse.js";


config();

const ai=new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const mcpClient = new Client({
    name: "example-client",
    version:"1.0.0",
})



const chartHistory=[];
const rl =readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

mcpClient.connect(new SSEClientTransport(new URL(`http://localhost:3001/sse`)))
    .then(async () => {
        console.log('connected to mcp server');
        const tools=(await mcpClient.listTools()).tools;
        console.log("Available Tools:",tools);
    }) 
