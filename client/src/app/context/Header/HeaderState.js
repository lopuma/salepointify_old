"use client";
import HeaderContext from "./HeaderContext";
import { useState } from "react";

const HeaderProvider = ({ children }) => {
	const [showBackdrop, setShowBackdrop] = useState(false);
	const [showNav, setNavOpen] = useState(false);
	const [showToggle, setToggleShow] = useState(false);
	const showMenuBackdrop = () => {
		setToggleShow(!showToggle);
		setNavOpen(!showNav);
		setShowBackdrop(!showBackdrop);
	};
	const hiddenMenuBackdrop = () => {
		setShowBackdrop(false);
		setNavOpen(false);
		setToggleShow(false);
	};
	const data = { showBackdrop, showNav, showToggle, showMenuBackdrop, hiddenMenuBackdrop };
	return <HeaderContext.Provider value={data}>{children}</HeaderContext.Provider>;
};

export default HeaderProvider;
