const API_URL = 'http://localhost:8008';

// fetch logs from /api/logs and return as json
// eslint-disable-next-line import/prefer-default-export
export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}

export async function createLogEntry(entry) {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
}
