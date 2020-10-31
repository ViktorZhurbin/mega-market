import useSWR from 'swr';

const fetcher = (input: RequestInfo, init?: RequestInit) =>
    fetch(input, init).then((res) => res.json());

type Response = {
    data: any;
    isLoading: boolean;
    isError: boolean | undefined;
};

export const useData = (apiEndpoint: string): Response => {
    const { data, error } = useSWR(apiEndpoint, fetcher);

    return {
        data: data?.data,
        isLoading: !error && !data,
        isError: error,
    };
};
