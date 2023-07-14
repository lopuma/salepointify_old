"use client";
import { Breadcrumbs } from "@material-tailwind/react";
export default function Breadcrumbs() {
	return (
		<Breadcrumbs className="mx-2" fullWidth>
			<a href="#" className="opacity-60">
				Docs
			</a>
			<a href="#" className="opacity-60">
				Components
			</a>
			<a href="#">Breadcrumbs</a>
		</Breadcrumbs>
	);
}
