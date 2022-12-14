const path = require('path');

module.exports = {
  async getImage(req, res, _next) {
    const { file } = req.params;

    const options = {
      root: path.join(__dirname, '../../images'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
      },
    };

    return res.sendFile(file, options);
  },
};
