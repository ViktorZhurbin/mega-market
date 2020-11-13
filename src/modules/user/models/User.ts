import mongoose from 'mongoose';
import { UserType } from '@user/typings';

export const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    role: String,
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
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

type CartItemType = { productId: string; quantity: number };

userSchema.methods.addToCart = async function (productId: string) {
    const updatedCart: CartItemType[] = [...this.cart];
    const itemIndex = updatedCart.findIndex(
        (item) => item.productId.toString() === productId
    );

    if (itemIndex !== -1) {
        updatedCart[itemIndex].quantity += 1;
    } else {
        updatedCart.push({ productId, quantity: 1 });
    }

    this.cart = updatedCart;

    await this.save();

    return this.cart;
};

userSchema.methods.updateCartQty = async function (
    productId: string,
    qty: number
) {
    const updatedCart = [...this.cart];
    const itemIndex = updatedCart.findIndex(
        (item) => item.productId.toString() === productId
    );
    updatedCart[itemIndex].quantity = qty;
    this.cart = updatedCart;

    await this.save();

    return this.cart;
};

userSchema.methods.removeFromCart = async function (productId: string) {
    const updatedCart: CartItemType[] = [...this.cart];

    this.cart = updatedCart.filter(
        (item) => item.productId.toString() !== productId.toString()
    );

    await this.save();

    return this.cart;
};

userSchema.methods.clearCart = function () {
    this.cart = [];

    this.save();
};

export type UserDocument = UserType & {
    addToCart(productId: string): Promise<any>;
    removeFromCart(productId: string): Promise<any>;
    updateCartQty(productId: string, qty: number): Promise<any>;
    clearCart(): void;
};

export const UserModel =
    mongoose.models?.User ||
    mongoose.model<UserDocument & mongoose.Document>('User', userSchema);
