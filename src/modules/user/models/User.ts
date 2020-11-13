import mongoose from 'mongoose';
import { UserType } from '@user/typings';

export const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    role: String,
    cart: [
        {
            product: {
                type: String,
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

type CartItemType = { product: string; quantity: number };

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

    await this.save();

    return this.cart;
};

userSchema.methods.updateCartQty = async function (
    productId: string,
    qty: number
) {
    const updatedCart = [...this.cart];
    const itemIndex = updatedCart.findIndex(
        (item) => item.product.toString() === productId
    );
    updatedCart[itemIndex].quantity = qty;
    this.cart = updatedCart;

    await this.save();

    return this.cart;
};

userSchema.methods.removeFromCart = async function (productId: string) {
    const updatedCart: CartItemType[] = [...this.cart];

    this.cart = updatedCart.filter(
        (item) => item.product.toString() !== productId
    );

    await this.save();

    return this.cart;
};

userSchema.methods.clearCart = async function () {
    this.cart = [];

    await this.save();

    return this.cart;
};

export type UserDocument = mongoose.Document &
    UserType & {
        addToCart(productId: string): Promise<any>;
        removeFromCart(productId: string): Promise<any>;
        updateCartQty(productId: string, qty: number): Promise<any>;
        clearCart(): void;
    };

export const UserModel =
    mongoose.models?.User ||
    mongoose.model<UserDocument & mongoose.Document>('User', userSchema);
