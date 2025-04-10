# Conversational AI with Tool Integration

## Overview

This project is a client-server application that integrates with the Twitter API and a conversational AI model. The server provides tools for performing specific tasks, such as creating Twitter posts, while the client interacts with the server and the AI model to facilitate a conversational experience.

---

## Project Structure

- **`client`**: Contains the client-side code that interacts with the server and the AI model.
  - `client/client.js`: Implements the client logic, including connecting to the server, managing chat history, and interacting with the AI model.
  - `.env`: Stores environment variables for the client, such as API keys.

- **`server`**: Contains the server-side code that provides tools and handles client requests.
  - `server/index.js`: Implements the server logic, including tool registration, handling HTTP requests, and managing server-side events.
  - `server/mcp.tool.js`: Defines the `createPost` tool, which interacts with the Twitter API to create posts.
  - `.env`: Stores environment variables for the server, such as Twitter API credentials.

- **`.gitignore`**: Specifies files and directories to be ignored by Git, such as `node_modules` and `.env`.

---

## Flow of the Project

### 1. **Server Initialization**
   - The server is implemented in `server/index.js`.
   - It uses the `@modelcontextprotocol/sdk` to define tools and manage client-server communication.
   - Tools are registered using the `server.tool` method. For example:
     - `addTwoNumbers`: Adds two numbers and returns the result.
     - `createPost`: Posts a status update to Twitter using the `createPost` function from `server/mcp.tool.js`.
   - The server listens for incoming connections on port `3001`.

### 2. **Client Initialization**
   - The client is implemented in `client/client.js`.
   - It connects to the server using the `SSEClientTransport` from the `@modelcontextprotocol/sdk`.
   - The client retrieves the list of available tools from the server and maps them for use in the chat interface.

### 3. **Chat Interaction**
   - The client maintains a chat loop (`chatLoop` function in `client/client.js`):
     - If a tool call is required, the client sends the request to the server using `mcpClient.callTool`.
     - The server processes the tool call and returns the result.
     - The client updates the chat history with the tool result.
   - If no tool call is required, the client prompts the user for input and sends the chat history to the AI model for generating a response.

### 4. **Tool Execution**
   - When the client calls a tool, the server processes the request:
     - For example, the `createPost` tool in `server/mcp.tool.js` uses the `TwitterApi` library to post a status update to Twitter.
     - The tool returns a response, which is sent back to the client.

### 5. **AI Integration**
   - The client uses the `GoogleGenAI` library to interact with the conversational AI model.
   - The AI model generates responses based on the chat history and available tools.

---

## Key Features

- **Tool Registration and Execution**: The server provides tools that can be invoked by the client for specific tasks.
- **Twitter Integration**: The `createPost` tool allows posting status updates to Twitter.
- **Conversational AI**: The client integrates with the `GoogleGenAI` library to provide AI-generated responses.
- **Event-Driven Communication**: The client and server communicate using Server-Sent Events (SSE) for real-time interaction.

---

## How It Works

1. **Start the Server**:
   - Run the server from the `server` directory. It listens on port `3001` and registers tools.

2. **Start the Client**:
   - Run the client from the `client` directory. It connects to the server and initializes the chat interface.

3. **Interact with the Chat**:
   - The user can ask questions or invoke tools through the chat interface.
   - The client handles tool calls and AI responses seamlessly.

4. **Post to Twitter**:
   - Use the `createPost` tool to post a status update to Twitter. The tool is invoked automatically when required by the chat flow.

---

## Environment Variables

Both the client and server use `.env` files to store sensitive information:

- **Client `.env`**:
  - `GEMINI_API_KEY`: API key for the `GoogleGenAI` library.

- **Server `.env`**:
  - `TWITTER_API_KEY`, `TWITTER_API_SECRET_KEY`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_TOKEN_SECRET`: Credentials for the Twitter API.

---

## Dependencies

- **Client**:
  - `@google/genai`: For AI integration.
  - `@modelcontextprotocol/sdk`: For client-server communication.
  - `dotenv`: For environment variable management.

- **Server**:
  - `@modelcontextprotocol/sdk`: For tool registration and server logic.
  - `twitter-api-v2`: For Twitter API integration.
  - `dotenv`: For environment variable management.
  - `express`: For HTTP server functionality.
  - `zod`: For input validation.

---

## Running the Project

1. Install dependencies in both `client` and `server` directories:
   ```sh
   npm install



## Issue right now
1.  **Check API Keys and Permissions:** Make sure the API keys you are using have the necessary permissions to create posts.
2.  **Authentication:** Ensure that the authentication process is correctly implemented.
3.  **Rate Limits:** Be mindful of the rate limits imposed by the Twitter API. If you exceed these limits, you might encounter errors.
4.  **Correct API Endpoint:** Verify that you are using the correct API endpoint for creating posts.
5.  **Check Your Code:** Review your code to ensure that all parameters are correctly formatted and passed to the API.