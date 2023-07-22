import { create } from "zustand";
export const useToggleAside = create((set) => ({
	showAside: false,
	onClick: () =>
		set((state) => ({
			showAside: !state.showAside,
		})),
}));
