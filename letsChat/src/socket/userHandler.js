// src/socket/userHandler.js

const userHandler = (socket) => {
  if (!socket) return;

  // Listen when another user comes online
  socket.on('userOnline', (user) => {
    console.log(`User Online: ${user.userId}`);
    // You can update app state or UI here
    // e.g., dispatch event to update user list in your app
  });

  // Listen when another user goes offline
  socket.on('userOffline', (user) => {
    console.log(`User Offline: ${user.userId}`);
    // Update app state/UI accordingly
  });

  // Listen to when a user joins the chat (if applicable)
  socket.on('userJoined', (user) => {
    console.log(`User Joined: ${user.userId}`);
    // Handle user join event, update UI or notifications
  });

  // Listen to when a user leaves the chat
  socket.on('userLeft', (user) => {
    console.log(`User Left: ${user.userId}`);
    // Handle user leave event, update UI or notifications
  });
};

export default userHandler;
