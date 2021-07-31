const mongoose = require('mongoose');

module.exports = {
	connect: () => connect(),
	mongoType: () => mongoose.Types,
	startSession: () => startSession(),
};

async function connect() {
	const atlasUri = process.env.MONGODB_URL;
	if (mongoose.connection.readyState === 0) {
		return await mongoose.connect(atlasUri, {
			useNewUrlParser: true,
			keepAlive: false,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	} else return true;
}

async function startSession() {
	return await mongoose.startSession();
}
