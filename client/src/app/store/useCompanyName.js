import { create } from "zustand";

export const useCompanyName = create((set) => ({
	companyName: "",
	setCompanyName: (newName) => set((state) => ({ companyName: newName })),
}));
