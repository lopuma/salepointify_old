const dotenv = require('dotenv');
const path = require('path');

if(process.env.NODE_ENV === 'development') {
    dotenv.config({
        path: path.resolve(process.env.NODE_ENV + '.env')
    });
}   else {
    dotenv.config({
        path: path.resolve('.env')
    });
}

module.exports = {
    PORT: process.env.PORT || 3001,
    // REDIS_USER: process.env.REDIS_USER || 'default',
    // REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    // REDIS_PORT: process.env.REDIS_PORT || 6379,
    // REDIS_COMMANDER_PORT: process.env.REDIS_COMMANDER_PORT || 8081,
    // REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    // NODE_ENV: process.env.NODE_ENV || 'production',
    // MYSQL_HOST: process.env.MYSQL_HOST || '127.0.0.1',
    // MYSQL_USER: process.env.MYSQL_USER || 'root',
    // MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    // MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
    // MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'mydb',
    // MYSQL_PORT: process.env.MYSQL_PORT || 3306,
    // NGINX_HOST: process.env.NGINX_HOST || 'my-app.com,www.my-app.com',
    // NGINX_PORT: process.env.NGINX_PORT || 80,
    // NGINX_APP: process.env.NGINX_APP || 'my-app',
    // FILESYSTEM_DRIVER: process.env.FILESYSTEM_DRIVER || 'minio',
    // MINIO_HOST: process.env.MINIO_HOST || '127.0.0.1',
    // MINIO_PORT: process.env.MINIO_PORT || 9000,
    // MINIO_ROOT_USER: process.env.MINIO_USER,
    // MINIO_ROOT_PASSWORD: process.env.MINIO_PASSWORD,
    // BUCKET_NAME: process.env.BUCKET_NAME || 'mi-bucket',
    // USE_SSL: process.env.USE_SSL || 'false',
    // API_VERSION: process.env.API_VERSION || '2006-03-01',
    // AWS_REGION: process.env.AWS_REGION || 'default',
    // AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID  || 'default',
    // AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'default',
}