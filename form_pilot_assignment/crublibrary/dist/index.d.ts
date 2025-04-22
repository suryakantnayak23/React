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
declare class Crublibrary {
    private static apiUrl;
    private static apiKey;
    private static validateCredentials;
    static setCredentials(apiUrl: string, apiKey: string): void;
    private static handleError;
    static create(item: CrudItem): Promise<CrudResponse>;
    static get(id: string): Promise<CrudResponse>;
    static update(id: string, data: Partial<CrudItem>): Promise<CrudResponse>;
    static delete(id: string): Promise<CrudResponse>;
}
export = Crublibrary;
