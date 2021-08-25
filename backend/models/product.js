const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Digite o nome do produto'],
        trim: true        
    },
    price: {
        type: Number,
        required: [true, 'Por favor digite o preço'],        
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Por favor digite a descrição do produto'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Por favor selecione a categoria do produto'],
        enum: {
            values: [
                'Selecione...',
                'Notebooks',
                'Desktops',
                'Tablets',
                'Impressoras'              
            ],
            message: 'Por favor selecione a categoria correta para o produto'
        }
    },
    seller: {
        type: String,
        required: [true, 'Digite o nome do vendedor']
    },
    stock: {
        type: Number,
        required: [true, 'Digite a quantidade em estoque'],        
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);