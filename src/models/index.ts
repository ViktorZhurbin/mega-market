import { ProductSchema } from './Product';
import { AccountSchema } from './Account';
import { UserSchema } from './User';

export const schemas = {
    Product: ProductSchema,
    Account: AccountSchema,
    User: UserSchema,
};

export * from './Product';
export * from './Account';
export * from './User';
