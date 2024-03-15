import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import debug from 'debug';

const logRequest = debug('axios:request');
const errorRequest = debug('axios:request:error');
const logResponse = debug('axios:response');
const errorResponse = debug('axios:response:error');

export type Params = {
    protocol?: 'http' | 'https';
    host?: string;
    port?: number;
};

function addLog(despatch: AxiosInstance): AxiosInstance {
    despatch.interceptors.request.use(
        (config) => {
            logRequest(`(${config.method}) ${config.url}`);

            return config;
        },
        (error) => {
            // log the error
            errorRequest(error);

            return Promise.reject(error);
        }
    );

    despatch.interceptors.response.use(
        // 2xx
        (res) => {
            logResponse(`status: ${res.status}, data: ${res.data}`);

            return res;
        },
        // NOT 2xx
        (error) => {
            // log the error
            errorResponse(error);

            return Promise.reject(error);
        }
    );

    return despatch;
}

export function factory({
    protocol = 'http',
    host = 'localhost',
    port = 3000
}: Params) {
    // base config
    const baseConfig: AxiosRequestConfig = {
        timeout: 4000,
        baseURL: `${protocol}://${host}${port > 0 ? ':' + port : ''}`
    };

    // for data requests from the server that do not require authorization
    const baseDespatch = addLog(axios.create(baseConfig));

    /**  */
    const listAxios = new Map<string, AxiosInstance>([['', baseDespatch]]);

    return function getDespatch(token = '') {
        let despatch = listAxios.get(token);

        if (!despatch) {
            despatch = axios.create(baseConfig);

            // Before each send we add a token
            despatch.interceptors.request.use((config) => {
                if (config.headers) {
                    config.headers.authorization = `Bearer ${token}`;
                }

                return config;
            });
        }

        return addLog(despatch);
    };
}
