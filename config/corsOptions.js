const whitelist = ['http://localhost:3010'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions