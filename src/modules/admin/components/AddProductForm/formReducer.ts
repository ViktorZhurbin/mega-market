import { useReducer } from 'react';

import { createProduct } from '../../services';

export enum FieldNames {
    title = 'title',
    description = 'description',
    price = 'price',
    image = 'image',
}

interface InputAction {
    type: 'INPUT';
    name: FieldNames;
    value: string;
}

interface RequestAction {
    type: 'REQUEST';
}

interface SuccessAction {
    type: 'SUCCESS';
}

interface ErrorAction {
    type: 'ERROR';
    error: unknown;
}

type Action = InputAction | RequestAction | SuccessAction | ErrorAction;

type State = Record<FieldNames, string> & { loading: boolean; error: unknown };

export const initialState: State = {
    title: '',
    description: '',
    price: '',
    image: '',
    loading: false,
    error: null,
};

export const formReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'INPUT':
            return { ...state, [action.name]: action.value };
        case 'REQUEST':
            return { ...state, loading: true };
        case 'SUCCESS':
            return { ...state, loading: false };
        case 'ERROR':
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

interface FormReducer {
    state: State;
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const useFormReducer = (): FormReducer => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const { title, description, price, image } = state;

    const handleInput = (
        event: React.ChangeEvent<HTMLInputElement & { name: FieldNames }>
    ) => {
        const { name, value } = event.target;

        dispatch({
            type: 'INPUT',
            name,
            value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!title || !price || !image) {
            return;
        }

        dispatch({ type: 'REQUEST' });

        try {
            await createProduct({
                title,
                description,
                price: Number(price),
                image,
            });
        } catch (error) {
            dispatch({
                type: 'ERROR',
                error,
            });
        }

        dispatch({ type: 'SUCCESS' });
    };

    return { state, handleInput, handleSubmit };
};
