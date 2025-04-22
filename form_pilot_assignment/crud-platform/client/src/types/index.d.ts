declare module 'your-formpilot-crud' {
  interface CrudResponse {
    id?: string;
    status?: string;
    error?: string;
    [key: string]: any;
  }

  interface CrudLibrary {
    create: (data: any) => Promise<CrudResponse>;
    get: (id: string) => Promise<CrudResponse>;
    update: (id: string, data: any) => Promise<CrudResponse>;
    delete: (id: string) => Promise<CrudResponse>;
  }

  const lib: CrudLibrary;
  
  export default lib;
} 