import ProductLoader from "./Loaders/ProductLoader";
import ProductCard from "./ProductCard";
import { Pagination } from "@/components/Pagination/page";

function ListProducts({ products }) {
	return (
		<>
			<div className="grid grid-cols-fluid gap-4 my-4">
				{products.map((product) => (
					<ProductCard product={product} key={product.id} />
				))}
			</div>
		</>
	);
}

function NoProductsResults() {
	return (
		<div className="h-[60vh] flex flex-col gap-2 justify-center items-center  ">
			<div className="text-center">
				<h5 className="text-2xl font-bold">Uh Oh</h5>
				<p className="font-light text-neutral-500 mt-2">
					Something went wrong! : no products were found for this search
				</p>
			</div>
		</div>
	);
}

function Products({ products, pagination }) {
	const hasProducts = products === undefined;
	const isEmptyProducts = Array.isArray(products) && products.length === 0;
	return hasProducts ? (
		<ProductLoader />
	) : (
		<>
			<div className=" max-w-[2520px] mx-auto xl:px-10  md:px-10 sm:px-2 px-4 ">
				<Pagination pagination={pagination} />
				{isEmptyProducts ? <NoProductsResults /> : <ListProducts products={products} />}
				<Pagination pagination={pagination} />
			</div>
		</>
	);
}

export default Products;
