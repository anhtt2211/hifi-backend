const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		title: String,
		jobType: String,
		jobCategories: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Subcategory',
			},
		],
		salary: {
			min: Number,
			max: Number,
			unit: String,
			negotiable: Boolean,
		},
		description: String,
		skillTags: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Skill',
			},
		],
		preferedLangs: [String],

		// FIXME: Need change in the future when location of recruiters is fixed
		locations: [String],
		postPhoto: String,
		verficationStatus: {
			type: String,
			enum: ['fulfilled', 'pending', 'rejected'],
			default: 'pending',
		},
		company: {
			type: mongoose.Types.ObjectId,
			ref: 'Company',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Post', PostSchema);
