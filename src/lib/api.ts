
import { useQuery } from '@tanstack/react-query'

// MOCK DATA

export interface Session {
  id: string;
  startTime: string;
  endTime: string;
  sourceIp: string;
  user: string;
  status: 'active' | 'inactive';
  recordingUrl?: string;
  pcapUrl?: string;
}

const mockSessions: Session[] = [
  {
    id: 'session-xyz-123',
    startTime: new Date(Date.now() - 3600000).toISOString(),
    endTime: new Date().toISOString(),
    sourceIp: '192.168.1.101',
    user: 'testuser1',
    status: 'inactive',
    recordingUrl: '/downloads/rec-xyz-123.mp4',
    pcapUrl: '/downloads/pcap-xyz-123.pcap',
  },
  {
    id: 'session-abc-456',
    startTime: new Date(Date.now() - 7200000).toISOString(),
    endTime: new Date(Date.now() - 1800000).toISOString(),
    sourceIp: '10.0.0.5',
    user: 'testuser2',
    status: 'inactive',
    recordingUrl: '/downloads/rec-abc-456.mp4',
  },
  {
    id: 'session-live-789',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(),
    sourceIp: '203.0.113.42',
    user: 'admin',
    status: 'active',
  },
];

// API FUNCTIONS

async function fetchSessions(): Promise<Session[]> {
  // In a real app, you'd fetch this from your API
  // e.g., const res = await fetch('/api/sessions');
  // const data = await res.json();
  // return data;

  console.log('Fetching sessions...');
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  return mockSessions;
}

async function getSignedUrl(downloadUrl: string): Promise<string> {
    // In a real app, you would make a request to your backend to get a short-lived signed URL
    console.log(`Requesting signed URL for ${downloadUrl}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    // This is a mock signed URL
    return `${downloadUrl}?token=mock-signed-token-${Date.now()}`;
}


// REACT QUERY HOOKS

export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
  });
}

export { getSignedUrl };
