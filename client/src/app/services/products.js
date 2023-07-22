export const searchProducts = async ({ queryKey }) => {
	console.log("1 => ", queryKey);
	if (queryKey === "") return null;

	try {
		const response = await fetch(`https://peticiones.online/api/products?page=${queryKey[1]}`);
		const json = await response.json();

		const pagination = {
			page: json.page,
			perPage: json.per_page,
			total: json.total,
			totalPages: json.total_pages,
		};

		const products = json.results;

		return [
			products?.map((product) => ({
				id: product._id,
				title: product.name,
				description: product.description,
				price: product.price,
				category: product.category,
				image: product.image,
				active: product.active,
			})),
			pagination,
		];
	} catch (e) {
		throw new Error("Error searching products");
	}
};
