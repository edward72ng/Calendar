const Dotenv = require('dotenv-webpack');

module.exports = {
    entry:'/src/app/index.js',
    
    plugins: [
      new Dotenv(),
      // otros plugins que estés usando
    ],

    output:{
        path: __dirname + '/src/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
            use: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
    },{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },]
    },
}