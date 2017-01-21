var webpack = require('webpack')
var S3Plugin = require('webpack-s3-plugin')
var config = require('./webpack.core.js');

var s3BucketName = 'component_api_client.com'
var apiHost = 'localhost:3000/api/v1'

var s3Plugin = new S3Plugin({
  // Only upload css and js 
  include: /.*\.(css|js|html)/,
  // s3Options are required 
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  s3UploadOptions: {
    Bucket: s3BucketName
  }
});

var apiHostPlugin = new webpack.DefinePlugin({
  'process.env.API_HOST': JSON.stringify(apiHost)
})    

//turn of watching for a one-time build
config.watch = false;

config.plugins.push(s3Plugin);
config.plugins.push(apiHostPlugin);
module.exports = config;