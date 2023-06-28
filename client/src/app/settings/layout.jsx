"use client";

import React from "react";
import Sidebar from "@/components/Sidebar/page";
import FormsProvider from "../context/Forms/FormsState";

export default function SettingsLayout({ children }) {
	return (
		<article className="flex w-full">
			<Sidebar />
			<FormsProvider>
				<section className="bg-white shadow-md shadow-slate-400 mb-4 flex-grow rounded-sm p-4 dark:bg-gray-900 dark:shadow-slate-800 dark:text-white">
					{children}
				</section>
			</FormsProvider>
		</article>
	);
}
