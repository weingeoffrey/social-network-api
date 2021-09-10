const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [
				/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
				'Please enter a valid email address',
			],
		},
		thoughts: [{ type: ObjectId, ref: 'Thought' }],
		friends: [{ type: ObjectId, ref: this }],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

UserSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});
