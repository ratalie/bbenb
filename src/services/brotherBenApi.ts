import { API_CONFIG } from '../config/api';

export interface ChatRequest {
  message: string;
  user_id: string;
  session_id?: string;
  user_context?: {
    role?: 'member' | 'minister' | 'teacher' | 'seeker';
    name?: string;
  };
}

export interface ChatResponse {
  response: string;
  session_id: string;
  sources?: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  escalated?: boolean;
  scripture?: {
    verse: string;
    reference: string;
  };
}

export interface AnalyzeRequest {
  action: string;
  files: Array<{
    path: string;
    metadata: {
      source_type: string;
      file_size_mb?: number;
    };
  }>;
}

class BrotherBenApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
    this.timeout = API_CONFIG.timeout;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.endpoints.chat}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data: ChatResponse = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - Brother Ben took too long to respond');
        }
        throw new Error(`Failed to connect to Brother Ben: ${error.message}`);
      }
      throw error;
    }
  }

  async analyze(request: AnalyzeRequest): Promise<any> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.endpoints.analyze}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw new Error(`Failed to analyze content: ${error.message}`);
      }
      throw error;
    }
  }
}

export const brotherBenApi = new BrotherBenApiService();
