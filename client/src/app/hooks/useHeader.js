"use client";
import { useContext } from "react";
import HeaderContext from "../context/Header/HeaderContext";

const useHeader = () => {
	return useContext(HeaderContext);
};

export default useHeader;
