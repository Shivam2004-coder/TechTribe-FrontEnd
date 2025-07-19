import { io } from "socket.io-client";

export const createSocketConnection = () => {
  const backendURL = import.meta.env.VITE_BASE_URL ;
      
  return io(backendURL, {
    transports: ["websocket"],
    withCredentials: true,
  });
};

// import io from "socket.io-client";

// export const createSocketConnection = () => {
//   if (location.hostname === "localhost") {
//     return io(import.meta.env.VITE_BASE_URL);
//   } else {
//     return io("/", { path: "/api/socket.io" });
//   }
// };