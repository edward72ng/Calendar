const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/app/index.js', // Ajuste de la ruta

    plugins: [
        new Dotenv(),
        // otros plugins que estés usando
    ],

    output: {
        path: path.resolve(__dirname, 'src/public'),
        filename: 'bundle.js'
    },
    
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.module\.css$/, // Archivos que terminan en .module.css
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            },
                        }
                    }
                ]
            },
            {
                test: /\.css$/, // Archivos que terminan en .css
                exclude: /\.module\.css$/, // Excluir archivos .module.css
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    
    devServer: {
        port: 4000,
        open: true,
        client: {
            overlay: true, // Configuración correcta para overlay
        },
        static: {
            directory: path.join(__dirname, 'src/public'),
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    }
};

