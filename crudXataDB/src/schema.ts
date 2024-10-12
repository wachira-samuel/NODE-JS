import { Schema } from '@xata.io/client';

export const schema = new Schema({
    products: {
        id: 'string',
        userName: 'string',
        displayName: 'string',
        
    },
});
