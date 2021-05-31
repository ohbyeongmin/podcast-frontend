import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const NotFound = () => (
	<div className="h-screen flex flex-col justify-center items-center">
		<Helmet>
			<title>Not Found | Podcast</title>
		</Helmet>
		<img src="https://http.cat/404" className=" w-1/2 mb-5" alt="404 page" />
		<h2 className="text-3xl font-semibold">Not Found</h2>
		<h4 className="text-lg font-medium">
			The page you're looking for does not exist or has moved
		</h4>
		<Link to="/">
			<h4 className="hover:underline text-green-600">Go Back Home →</h4>
		</Link>
	</div>
);
