import { create } from "zustand";
export const useToggleNav = create((set) => ({
	showNav: false,
	onClick: () =>
		set((state) => ({
			showNav: !state.showNav,
		})),
}));
