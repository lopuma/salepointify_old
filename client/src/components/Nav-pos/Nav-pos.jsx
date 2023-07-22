import Container from "@/components/Container";
import ItemPos from "@/components/Nav-pos/Item-pos";
import { MdOutlineDeliveryDining, MdShoppingBasket, MdSearch } from "react-icons/md";

const NavPos = () => {
	return (
		<Container className={"bg-gray-100"}>
			<div className="w-full h-full  md:h-[70px] flex items-center justify-between overflow-x-auto overflow-y-hidden">
				<div className="flex justify-between items-center gap-2 ">
					<ItemPos href={"/main"} extra={"0"}>
						MAIN
					</ItemPos>
					<ItemPos href={"/terrace"} extra={"0"}>
						TERRACE
					</ItemPos>
				</div>
				<div className="flex justify-between items-center gap-4">
					<ItemPos href={"/deliver"}>
						<MdOutlineDeliveryDining size={30} />
					</ItemPos>
					<ItemPos href={"/libre"}>
						<MdShoppingBasket size={30} />
					</ItemPos>
					<ItemPos href={"/"} extra={"0"}>
						ACCOUNTS
					</ItemPos>
					<button
						name="search"
						className="px-4 mr-4 h-[60px] flex items-center hover:bg-gray-300 rounded-md bg-sky-300 contrast-50"
					>
						<MdSearch size={30} />
					</button>
				</div>
			</div>
		</Container>
	);
};

export default NavPos;
