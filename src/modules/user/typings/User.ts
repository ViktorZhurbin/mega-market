import { CartItemType, PopulatedCartItemType } from '@/modules/cart/typings';

export type SessionUserType = {
    _id?: string;
    email?: string;
    image?: string;
    name?: string;
    role?: string;
};

export type UserType = SessionUserType & {
    cart: (CartItemType | PopulatedCartItemType)[];
};
