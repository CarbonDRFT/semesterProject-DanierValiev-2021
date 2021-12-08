module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'e3f03f8492cc45ce91c4f4afdb63cabe'),
  },
});
