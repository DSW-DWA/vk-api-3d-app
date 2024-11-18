import { ResponseNodeDetail, ResponseNodes } from "./models";

const API_BASE = "http://127.0.0.1:8000";

export async function fetchNodes(): Promise<ResponseNodes> {
  const response = await fetch(`${API_BASE}/nodes/`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch nodes: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchNodeDetails(id: number): Promise<ResponseNodeDetail> {
  const response = await fetch(`${API_BASE}/nodes/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch node details for ID ${id}: ${response.statusText}`);
  }

  return response.json();
}
