export type UserType = {
    _id?: string;
    email: string;
    name: string;
    role: string;
    cart: [{ productId: string; quantity: number }];
};
