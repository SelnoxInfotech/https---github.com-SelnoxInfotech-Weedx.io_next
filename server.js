const express = require('express');
const next = require('next');
const cors = require('cors');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare()
  .then(() => {
    const server = express();

    // Apply middleware
    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    // server.use(sitemap);

    // Custom API (Rediecrct)
  

    server.get('*', (req, res) => {
      return handle(req, res);
    });


    // Error handling middleware
    server.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
    });
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
