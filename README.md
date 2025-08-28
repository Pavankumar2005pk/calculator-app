# Chat Application

This is a simple chat application that allows users to communicate in real-time using WebSocket technology. The application consists of a client-side interface built with HTML, CSS, and JavaScript, and a server-side component using Node.js.

## Project Structure

```
chat-app
├── public
│   ├── index.html        # Main HTML document
│   ├── styles
│   │   └── main.css      # Styles for the chat application
│   └── scripts
│       └── app.js        # JavaScript code for real-time communication
├── server
│   └── server.js         # Server-side application
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd chat-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   node server/server.js
   ```

2. Open your web browser and navigate to `http://localhost:3000` to access the chat application.

## Features

- Real-time messaging using WebSocket.
- User-friendly interface with responsive design.
- Ability to send and receive messages instantly.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.
