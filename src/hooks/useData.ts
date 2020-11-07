import useSWR from 'swr';

const fetcher = (input: RequestInfo, init?: RequestInit) =>
    fetch(input, init).then((res) => res.json());

type Response<Data> = {
    data: Data;
    isLoading: boolean;
    isError: boolean | undefined;
};

export const useData = <Data>(key: string): Response<Data> => {
    const { data, error } = useSWR<{ data: Data }>(key, fetcher);

    return {
        data: data?.data,
        isLoading: !error && !data,
        isError: error,
    };
};
