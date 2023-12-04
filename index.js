import 'babel-polyfill';
import express from 'express';

const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(4000, () => {
    console.log('server is running in 4000')
});