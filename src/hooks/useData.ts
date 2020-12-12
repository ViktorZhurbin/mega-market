import useSWR from 'swr';

const fetcher = (input: RequestInfo, init?: RequestInit) =>
    fetch(input, init).then((res) => res.json());

export interface Response<Data> {
    data: Data;
    isLoading: boolean;
    error: any;
    mutate(): void;
}

export const useData = <Data>(key: string): Response<Data> => {
    const { data, error, mutate } = useSWR<Data>(key, fetcher);

    return {
        data,
        isLoading: !error && !data,
        error,
        mutate,
    };
};
