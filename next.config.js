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
};

export default config;
