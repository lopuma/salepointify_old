"use client";
import Currency from "./UI/Currency/page";
import IconButton from "./UI/Icon-button";
import { AiOutlineExpand, AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
export default function ProductCard({ product }) {
	const sizes = "(max-width: 640px) 100vw, (max-width: 768px) 10vw, 10vw";
	const handleClick = () => {
		console.log("click");
	};

	return (
		// <a
		// 	href="#"
		// 	className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
		// >
		// 	<img
		// 		className="object-cover w-full rounded-t-lg h-52 md:h-52 md:w-48 md:rounded-none md:rounded-l-lg"
		// 		src={product.image}
		// 		alt={product.title}
		// 	/>
		// 	<div className="flex flex-col justify-between p-4 leading-normal">
		// 		<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
		// 		<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
		// 	</div>
		// </a>
		<div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
			<div className="p-3 space-y-4 flex flex-col grow-0 items-center places-content-center">
				{/* Image & actions */}
				<div className="aspect-square rounded-xl bg-gray-100 relative w-[150px] h-[150px] ">
					<img
						src={product?.image}
						alt={product?.title}
						fill="fill"
						// sizes={"(min-width: 66em) 20vw, (min-width: 44em) 20vw, 50vw"}
						// srcset="small-image.png 1x, medium-image.png 2x, large-image.png 3x"
						className="aspect-square object-cover rounded-md w-full h-full"
					/>
					<div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
						<div className="flex gap-x-6 justify-center">
							<IconButton icon={<AiOutlineExpand size={20} className="text-gray-600" />} />
							<IconButton icon={<AiOutlineShoppingCart size={20} className="text-gray-600" />} />
						</div>
					</div>
				</div>
				{/* Description */}
				<div>
					<p className="font-semibold text-lg">{product?.title}</p>
					{/* <p className="text-sm text-gray-500">{product?.description}</p> */}
				</div>
				{/* Price & Reiew */}
			</div>
			<div className="flex flex-grow items-center justify-between">
				<Currency value={product?.price} />
			</div>
		</div>
	);
}
