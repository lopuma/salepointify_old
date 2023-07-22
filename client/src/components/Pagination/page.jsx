import Link from "next/link";

/**
 * The `Pagination` component is a React component that displays pagination information and navigation
 * buttons.
 * @typedef {Object} PaginationProps
 * @property {Object} pagination - An object containing pagination data.
 * @property {number} pagination.page - The current page number.
 * @property {number} pagination.perPage - The number of items to display per page.
 * @property {number} pagination.totalPages - The total number of pages.
 * @property {number} pagination.total - The total number of items.
 *
 * @param {PaginationProps} props - The props for the Pagination component.
 * @returns {JSX.Element} The Pagination component returns a JSX element that displays information about the
 * current page and the total number of products. It also includes previous and next buttons for
 * navigating between pages.
 */
export function Pagination({ pagination }) {
	const { page, perPage, totalPages, total } = pagination;
	const isFirstPage = page === 1;
	const isLastPage = page === totalPages;
	const nextPage = page + 1;
	const prevPage = page - 1;
	const prePageUrl = isFirstPage ? "#" : `?page=${prevPage}`;
	const nextPageUrl = isLastPage ? "#" : `?page=${nextPage}`;
	return (
		<div className="flex flex-col items-center my-12">
			<span className="text-sm text-gray-700 dark:text-gray-400">
				Showing <span className="font-semibold text-gray-900 dark:text-white">{(page - 1) * perPage + 1}</span> to{" "}
				<span className="font-semibold text-gray-900 dark:text-white">{Math.min(page * perPage, total)}</span> of{" "}
				<span className="font-semibold text-gray-900 dark:text-white">{total}</span> Products
			</span>

			<div className="inline-flex mt-2 xs:mt-0">
				<Link
					href={prePageUrl}
					disabled={isFirstPage}
					className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
						isFirstPage ? "pointer-events-none opacity-50" : ""
					}`}
				>
					<svg
						className="w-3.5 h-3.5 mr-2"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 5H1m0 0 4 4M1 5l4-4"
						/>
					</svg>
					Prev
				</Link>
				<Link
					href={nextPageUrl}
					disabled={isLastPage}
					className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
						isLastPage ? "pointer-events-none opacity-50" : ""
					}`}
				>
					Next
					<svg
						className="w-3.5 h-3.5 ml-2"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 5h12m0 0L9 1m4 4L9 9"
						/>
					</svg>
				</Link>
			</div>
		</div>
	);
}
