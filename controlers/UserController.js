const { connect, mongoType, startSession } = require('../database/db');
const apiResponse = require('../helpers/response');
const { User } = require('../models/user');

exports.userSignup = [
	async function(req, res) {
		try {
			await connect();
			const data = new User({
				name: req.body.name,
				email: req.body.email,
				cellNo: req.body.cellNo,
				password: req.body.password,
				isDisabled: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			await User.create([data]).then(data => {
				return apiResponse.successResponseWithData(res, 'Operation success', data);
			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	},
];

exports.userSignin = [
	async function(req, res) {
		try {
			await connect();
			const data = await User.aggregate([
				{
					$match: {
						email: req.body.email,
						password: req.body.password,
						isDisabled: false,
					},
				},
				{
					$project: {
						name: '$name',
						email: '$email',
						cellNo: '$cellNo',
					},
				},
			]);

			const userInfo = {
				isAuthenticated: true,
				userInformation: data[0]
			}

			if(data.length){
				return apiResponse.successResponseWithData(res, 'Operation success',userInfo);
			} else {
				return apiResponse.successResponseWithData(res, 'No User Found', {});
			}

			
			// .then(data => {
			// 	return apiResponse.successResponseWithData(res, 'Operation success', data ? data[0] : {});
			// });
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

