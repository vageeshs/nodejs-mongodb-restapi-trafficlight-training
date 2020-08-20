import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.json';

import __ from './lib/util';

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
    exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
    limit: config.bodyLimit
}));

__.mongoose.connect(__.cfg.mongo.uri, __.cfg.mongo.options);
__.mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

app.use('/api/lightstates', require('./api/lightstate'));

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;