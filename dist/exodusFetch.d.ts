type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface ExodusFetchOptions {
    url: string;
    method?: HTTPMethod;
    headers?: Record<string, string>;
    body?: any;
    verbose?: boolean;
    bypassCache?: boolean;
}
declare const ExodusFetch: {
    get: (url: string, options?: Omit<ExodusFetchOptions, "url" | "method">) => Promise<[Error | null, any]>;
    post: (url: string, body: any, options?: Omit<ExodusFetchOptions, "url" | "method" | "body">) => Promise<[Error | null, any]>;
    put: (url: string, body: any, options?: Omit<ExodusFetchOptions, "url" | "method" | "body">) => Promise<[Error | null, any]>;
    delete: (url: string, options?: Omit<ExodusFetchOptions, "url" | "method">) => Promise<[Error | null, any]>;
};
export default ExodusFetch;
//# sourceMappingURL=exodusFetch.d.ts.map