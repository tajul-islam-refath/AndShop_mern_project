const { model, Schema } = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please enter name'],
        trim: true,
        maxLength: [100, 'Product name cannot extcecd 100 char']
    },
    slug: {
        type: String,
        required: [true, 'please enter slug'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'please enter a discreption'],
        trim: true,
    },
    shortDescription: {
        type: String,
        required: [true, 'please enter a short description'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'please enter  price'],
        maxLength: [5, 'Product price cannot extcecd 5 length'],
        default: 0.0
    },
    oldPrice: {
        type: Number,
        default: 0.0
    },
    discount: {
        type: Number,
        default: 0
    },
    sku: {
        type: String,
        required: [true, 'please enter product sku'],
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    visibility: {
        type: String,
        required: [true, 'please select product visibility'],
        trim: true,
    },
    categoryId: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: Schema.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        ratings: {
            type: Number,
            required: true
        },
        comments: {
            type: String,
            required: true
        }
    }],
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
})

const Product = model('Product', productSchema)

module.exports = Product;