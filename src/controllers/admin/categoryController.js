const { Category } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const { getOrSetCache, deleteKeyIfExist } = require('../../services/redis');
const getAllCategories = catchAsync(async (req, res, next) => {
	const result = await getOrSetCache('categories', async () =>
		Category.find({}).lean()
	);
	res.status(200).json({
		message: 'success',
		data: result,
	});
});

const getCategory = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const result = await getOrSetCache('categories' + id, () =>
		Category.findById(id).populate('subcategories').lean()
	);

	res.status(200).json({ message: 'success', data: result });
});

const createCategory = catchAsync(async (req, res, next) => {
	const { name, imageUrl } = req.body;
	const result = await Category.create({ name: name, imageUrl: imageUrl });

	await deleteKeyIfExist('categories');

	res.status(200).json({ message: 'success', data: result });
});

const updateCategory = catchAsync(async (req, res, next) => {
	const { name, imageUrl } = req.body;
	const { id } = req.params;
	const result = await Category.findByIdAndUpdate(
		id,
		{ name: name, imageUrl: imageUrl },
		{ new: true, runValidators: true }
	);

	await deleteKeyIfExist('categories' + id);

	res.status(200).json({ message: 'success', data: result });
});

const deleteCategory = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const result = await Category.findByIdAndDelete(id);
	await Promise.all([
		deleteKeyIfExist('categories' + id),
		deleteKeyIfExist('categories'),
	]);

	res.status(200).json({ message: 'success', data: result });
});

module.exports = {
	createCategory,
	getAllCategories,
	getCategory,
	updateCategory,
	deleteCategory,
};
