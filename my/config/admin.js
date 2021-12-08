module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2a438fd0b9305fdf575cc9a3b94725e6'),
  },
});
