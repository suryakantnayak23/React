import axios, { AxiosError } from 'axios';

// Only load dotenv in Node.js environment
let dotenv: any;
if (typeof window === 'undefined') {
  try {
    dotenv = require('dotenv');
    dotenv.config();
  } catch (err) {
    console.warn('dotenv not loaded in this environment');
  }
}

interface CrudItem {
  id?: string;
  value: number;
  txHash: string;
  [key: string]: any;
}

interface CrudResponse {
  id?: string;
  status?: string;
  value?: number;
  txHash?: string;
  [key: string]: any;
}

class Crublibrary {
  private static apiUrl: string;
  private static apiKey: string;

  private static validateCredentials(): void {
    // In browser, try to get from environment or local storage
    if (typeof window !== 'undefined') {
      // Browser environment
      this.apiUrl = (window as any).CRUD_API_URL || localStorage.getItem('CRUD_API_URL') || '';
      this.apiKey = (window as any).CRUD_API_KEY || localStorage.getItem('CRUD_API_KEY') || '';
    } else {
      // Node.js environment
      this.apiUrl = process.env.CRUD_API_URL || '';
      this.apiKey = process.env.CRUD_API_KEY || '';
    }

    if (!this.apiUrl || !this.apiKey) {
      throw new Error('Missing API URL or API Key. Please set CRUD_API_URL and CRUD_API_KEY in your environment variables or local storage.');
    }
  }

  // Set API credentials programmatically (for browser use)
  public static setCredentials(apiUrl: string, apiKey: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('CRUD_API_URL', apiUrl);
      localStorage.setItem('CRUD_API_KEY', apiKey);
    }
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  private static handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.status === 429) {
        throw new Error('Request limit exceeded. Please recharge credits.');
      }
      if (axiosError.response?.data?.message) {
        throw new Error(axiosError.response.data.message);
      }
    }
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }

  static async create(item: CrudItem): Promise<CrudResponse> {
    try {
      this.validateCredentials();
      const response = await axios.post<CrudResponse>(
        `${this.apiUrl}/crud`,
        item,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async get(id: string): Promise<CrudResponse> {
    try {
      this.validateCredentials();
      const response = await axios.get<CrudResponse>(
        `${this.apiUrl}/crud/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async update(id: string, data: Partial<CrudItem>): Promise<CrudResponse> {
    try {
      this.validateCredentials();
      const response = await axios.put<CrudResponse>(
        `${this.apiUrl}/crud/${id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async delete(id: string): Promise<CrudResponse> {
    try {
      this.validateCredentials();
      const response = await axios.delete<CrudResponse>(
        `${this.apiUrl}/crud/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export = Crublibrary; 