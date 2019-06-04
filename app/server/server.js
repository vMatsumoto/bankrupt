import restify from 'restify';
import routes from '~/server/routes';

const server = restify.createServer();

function logRequest(req, res, next) {
	console.log(`${req.method} - ${req.url}`);
	return next();
};

server.use(restify.plugins.bodyParser());
server.server.setTimeout(60000 * 20);

if(process.env.HOST == 'localhost') {
	server.use(logRequest);
}

routes(server);
server.listen(process.env.PORT, () => console.log(`Server listening on PORT ${process.env.PORT}`))