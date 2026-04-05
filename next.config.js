import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
	// Storefront is served under /shop path prefix
	// All assets and routes are prefixed with /shop
	basePath: "/shop",

	// Turbopack config (Next.js 16 default)
	turbopack: {
		resolveAlias: {
			// Map @/styles to the shared styles directory directly
			"@/styles": path.resolve(__dirname, "../shared/styles"),
		},
	},

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

	experimental: {
		// Set the root to parent directory so symlinks to ../shared/styles are valid
		outputFileTracingRoot: path.resolve(__dirname, ".."),
	},
};

export default config;
