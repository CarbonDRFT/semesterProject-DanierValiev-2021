module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'b67387d4bb7b383655a6cf35f54f285e'),
  },
});
