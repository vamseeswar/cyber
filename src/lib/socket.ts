
import { io } from 'socket.io-client'

// Only define the URL on the client-side
const URL = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_WS_URL || '' : '';

export const socket = io(URL, {
  autoConnect: false,
});
