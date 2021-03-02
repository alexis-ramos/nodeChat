module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notasecret',
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || 'tOTAzs4dml',
    password: process.env.MYSQL_PASS || 'dW33j6Y52k',
    database: process.env.MYSQL_DB || 'tOTAzs4dml',
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  cacheService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3003,
  },
  redis: {
    host:
      process.env.REDIS_HOST ||
      'redis-19823.c57.us-east-1-4.ec2.cloud.redislabs.com:19823',
    port: process.env.PORT || '19823',
    password: process.env.PASS || 'HhGFPHEPTGqQd1VYuXMpouVymQYVn0jY',
  },
};
