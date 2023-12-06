router.get('/admin', requireAdmin, (req, res) => {
  res.status(200).json({
      message: 'Welcome to the admin dashboard',
      user: req.user,
  });
});