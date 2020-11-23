import mongoose from 'mongoose';

import { CartItemType, CartType } from '../../modules/cart/typings';
import { productSchema } from './Product';

type CartItemDocumentType = CartItemType[] & mongoose.Document;

export type CartDocument = mongoose.Document &
    Omit<CartType, 'products'> & {
        products: CartItemDocumentType;
    };

const cartItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    product: {
        type: productSchema,
    },
    quantity: {
        type: Number,
        default: 0,
    },
});

export const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    products: {
        type: [cartItemSchema],
        default: [],
    },
    quantity: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        default: 0,
    },
});

cartSchema.pre<CartDocument>('save', function () {
    const { total, quantity } = this.products.reduce(
        (acc, item) => {
            const total = acc.total + item.product.price * item.quantity;
            const quantity = acc.quantity + item.quantity;

            return { total, quantity };
        },
        {
            total: 0,
            quantity: 0,
        }
    );

    this.total = total;
    this.quantity = quantity;
});

export const CartModel =
    mongoose.models?.Cart || mongoose.model<CartDocument>('Cart', cartSchema);
