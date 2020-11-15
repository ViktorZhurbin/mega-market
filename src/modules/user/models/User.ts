import mongoose from 'mongoose';

import { CartItemType } from '@/modules/cart/typings';
import { UserWithCartType } from '~user/typings';

export type UserSchemaType = UserWithCartType & {
    addToCart(productId: string): Promise<UserWithCartType>;
    removeFromCart(productId: string): Promise<UserWithCartType>;
    updateCartQty(productId: string, qty: number): Promise<UserWithCartType>;
    clearCart(): Promise<UserWithCartType>;
    getCartQty(): number;
    getCartAmount(): number;
};

export type UserDocumentType = UserSchemaType & mongoose.Document;

export const userSchema = new mongoose.Schema<UserSchemaType>({
    email: String,
    name: String,
    role: String,
    cart: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
});

userSchema.methods.addToCart = async function (productId: string) {
    const updatedCart: CartItemType[] = [...this.cart];
    const itemIndex = updatedCart.findIndex(
        (item) => item.product.toString() === productId
    );

    if (itemIndex !== -1) {
        updatedCart[itemIndex].quantity += 1;
    } else {
        updatedCart.push({ product: productId, quantity: 1 });
    }

    this.cart = updatedCart;

    return await this.save();
};

userSchema.methods.updateCartQty = async function (
    productId: string,
    quantity: number
) {
    const updatedCart: CartItemType[] = [...this.cart];
    const itemIndex = updatedCart.findIndex(
        (item) => item.product.toString() === productId
    );
    updatedCart[itemIndex].quantity = quantity;

    this.cart = updatedCart;

    return await this.save();
};

userSchema.methods.removeFromCart = async function (productId: string) {
    const updatedCart: CartItemType[] = [...this.cart];

    this.cart = updatedCart.filter(
        (item) => item.product.toString() !== productId
    );

    return await this.save();
};

userSchema.methods.clearCart = async function () {
    this.cart = [];

    return await this.save();
};

userSchema.methods.getCartQty = function () {
    if (this.cart.length === 0) {
        return 0;
    }

    return this.cart.reduce((total, item) => total + item.quantity, 0);
};

userSchema.methods.getCartAmount = function () {
    if (this.cart.length === 0) {
        return 0;
    }

    return this.cart.reduce((total, item) => total + item.product.price, 0);
};

export const UserModel =
    mongoose.models?.User ||
    mongoose.model<UserDocumentType>('User', userSchema);
