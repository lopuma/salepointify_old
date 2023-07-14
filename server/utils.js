import pkg from "chalk";
const { green, yellow, red, magenta } = pkg;

export function ready(text) {
	console.info(green("ready"), text);
}

export function warn(text) {
	console.warn(yellow("warn"), text);
}

export function error(text) {
	console.error(red("error"), text);
}

export function debug(text) {
	console.log(magenta("debug"), text);
}
