const { model, Schema } = require("mongoose")

const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Category name required"]
    },
    slug: {
        type: String,
        trim: true,
        required: [true, "Category slug required"]
    },
    description: {
        type: String,
        trim: true,
    },
    visibility: {
        type: String,
        required: true
    },
    parentCategory: {
        type: String,
        required: true,
        enum: {
            values: [
                "Electronic Devices",
                "Electronic Accessories",
                "Tv & Home Appliance",
                "Health & Beauty",
                "Babies & Toys",
                "Home & Lifestyle",
                "Women's Fashion",
                "Men's Fashion",
                "Watches & Accessories",
                "Sports & Outdoor",
                "Automotive & Motorbike",
            ],
            message: 'This category is not supported'
        }
    },
    userId: {
        type: Schema.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

const Category = model("Category", categorySchema)

module.exports = Category