import mongoose from 'mongoose';
import { UserType } from '~user/typings';
import { productSchema } from '~product/models';
import { ProductType } from '@/modules/product/typings';

export const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    role: String,
    cart: [
        {
            product: productSchema,
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
});

type CartItemType = { product: ProductType; quantity: number };

userSchema.methods.addToCart = async function (product: ProductType) {
    const updatedCart: CartItemType[] = [...this.cart];
    const itemIndex = updatedCart.findIndex(
        (item) => item?.product.toString() === product._id
    );

    if (itemIndex !== -1) {
        updatedCart[itemIndex].quantity += 1;
    } else {
        updatedCart.push({ product, quantity: 1 });
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

userSchema.methods.getCartQty = async function () {
    if (this.cart.length === 0) {
        return 0;
    }

    return this.cart.reduce((total, item) => total + item.quantity, 0);
};

userSchema.methods.getCartAmount = async function () {
    if (this.cart.length === 0) {
        return 0;
    }

    return this.cart.reduce((total, item) => total + item.product.price, 0);
};

export type UserDocument = mongoose.Document &
    UserType & {
        addToCart(product: ProductType): Promise<any>;
        removeFromCart(productId: string): Promise<any>;
        updateCartQty(productId: string, qty: number): Promise<any>;
        clearCart(): void;
        getCartQty(): number;
        getCartAmount(): number;
    };

export const UserModel =
    mongoose.models?.User ||
    mongoose.model<UserDocument & mongoose.Document>('User', userSchema);
