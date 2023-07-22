"use client";
import { useQuery } from "react-query";
import { ErrorComponent } from "@/components/Errors/page";
import { ProductLoader } from "@/components/Loaders/ProductLoader";
function UserPage() {
	const { isLoading, isError, error, data } = useQuery("posts", () =>
		fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json())
	);

	if (isLoading) return <ProductLoader />;

	if (isError) {
		const customError = {
			label: "User Not Found Error",
			message: `An error has occurred: ${error.message}`,
		};
		return <ErrorComponent customError={customError} />;
	}

	try {
		return (
			<article>
				{data?.map(({ id, title, body }) => {
					return (
						<ul key={id} className="border p-2 mb-3">
							<h2>{id}</h2>
							<h3 className="text-bold">{title}</h3>
							<p>{body}</p>
						</ul>
					);
				})}
			</article>
		);
	} catch (error) {
		return <ErrorComponent error={`An error has occurred: ${error}`} />;
	}
}

export default UserPage;
