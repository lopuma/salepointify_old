import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...props) {
	return twMerge(clsx(props));
}

export const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "EUR",
});
