import mongoose from 'mongoose';

import { ProductSchema } from '@product/models/Product';
import { AccountSchema } from '@user/models/Account';
import { userSchema } from '@user/models/User';
import { OrderSchema } from '@cart/models/Order';

export const schemas = {
    Product: ProductSchema,
    Account: AccountSchema,
    User: userSchema,
    Order: OrderSchema,
};

const createModels = () => {
    try {
        const modelNames = mongoose.modelNames();

        Object.entries(schemas).forEach(([name, schema]) => {
            if (!modelNames.includes(name)) {
                mongoose.model(name, schema);
            }
        });
        console.log('Models are good now');
    } catch (error) {
        console.error('createModels', error);
    }
};

export const dbConnect = async (): Promise<void> => {
    const disconnected = mongoose.connection['_readyState'] === 0;
    if (disconnected) {
        try {
            await mongoose.connect(process.env.DATABASE_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
        } catch (error) {
            console.error('dbConnect error: ', error);
        }
    }

    mongoose.connection.on(
        'error',
        console.error.bind(console, 'MongoDB connection error:')
    );

    mongoose.connection.once('connected', () =>
        console.log('Connected to MongoDB')
    );
};

export const initDb = async (): Promise<void> => {
    createModels();
    await dbConnect();
};
