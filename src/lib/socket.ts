
import { io } from 'socket.io-client'

// Replace with your actual server URL
const URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000'

export const socket = io(URL, {
  autoConnect: false,
});
