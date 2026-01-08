import path from "path";

/** @type {import('next').NextConfig} */
const config = {
	images: {
		dangerouslyAllowLocalIP: true,
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
	typedRoutes: false,
	// used in the Dockerfile
	output:
		process.env.NEXT_OUTPUT === "standalone"
			? "standalone"
			: process.env.NEXT_OUTPUT === "export"
				? "export"
				: undefined,
	sassOptions: {
		includePaths: [path.join(process.cwd(), "src")],
	},
};

export default config;
