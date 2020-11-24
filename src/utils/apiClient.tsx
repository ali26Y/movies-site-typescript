import qs from 'qs';
import { MOVIE_API, API_KEY } from './constants';

type CustomConfig = {
    headers: any;
}

type Props = {
    body: string;
    method: string;
    headers: any;
    customConfig: any | CustomConfig;
};

type Config = {
    method?: string ;
    headers?: any | null;
    body?: null | any;
}

export const Client = async (endpoint: string, props: Partial<Props>): Promise<any> => {
    const { body, method, headers, ...customConfig } = props || {};

    const url_endpoint = qs.stringify({ ...qs.parse(endpoint), apiKey: API_KEY });

    const config: Config = {
        method,
        headers: {
            ...headers,
            ...(customConfig as CustomConfig).headers,
        },
    }
    if (body) {
        config.body = JSON.stringify(body)
    }
    return window
        .fetch(`${MOVIE_API}?${url_endpoint}`, config)
        .then(async response => {
            const json = await response.json();
            if (json.Response === 'False') {
                throw new Error(json.Error);
            } else if(json.Response === 'True') {
                return json;
            }
        })
};
