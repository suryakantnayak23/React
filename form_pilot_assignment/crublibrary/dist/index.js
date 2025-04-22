"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
// Only load dotenv in Node.js environment
let dotenv;
if (typeof window === 'undefined') {
    try {
        dotenv = require('dotenv');
        dotenv.config();
    }
    catch (err) {
        console.warn('dotenv not loaded in this environment');
    }
}
class Crublibrary {
    static validateCredentials() {
        // In browser, try to get from environment or local storage
        if (typeof window !== 'undefined') {
            // Browser environment
            this.apiUrl = window.CRUD_API_URL || localStorage.getItem('CRUD_API_URL') || '';
            this.apiKey = window.CRUD_API_KEY || localStorage.getItem('CRUD_API_KEY') || '';
        }
        else {
            // Node.js environment
            this.apiUrl = process.env.CRUD_API_URL || '';
            this.apiKey = process.env.CRUD_API_KEY || '';
        }
        if (!this.apiUrl || !this.apiKey) {
            throw new Error('Missing API URL or API Key. Please set CRUD_API_URL and CRUD_API_KEY in your environment variables or local storage.');
        }
    }
    // Set API credentials programmatically (for browser use)
    static setCredentials(apiUrl, apiKey) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('CRUD_API_URL', apiUrl);
            localStorage.setItem('CRUD_API_KEY', apiKey);
        }
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }
    static handleError(error) {
        var _a, _b, _c;
        if (axios_1.default.isAxiosError(error)) {
            const axiosError = error;
            if (((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) === 429) {
                throw new Error('Request limit exceeded. Please recharge credits.');
            }
            if ((_c = (_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) {
                throw new Error(axiosError.response.data.message);
            }
        }
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
    static create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateCredentials();
                const response = yield axios_1.default.post(`${this.apiUrl}/crud`, item, {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                });
                return response.data;
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateCredentials();
                const response = yield axios_1.default.get(`${this.apiUrl}/crud/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                });
                return response.data;
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateCredentials();
                const response = yield axios_1.default.put(`${this.apiUrl}/crud/${id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                });
                return response.data;
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateCredentials();
                const response = yield axios_1.default.delete(`${this.apiUrl}/crud/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                });
                return response.data;
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
}
module.exports = Crublibrary;
