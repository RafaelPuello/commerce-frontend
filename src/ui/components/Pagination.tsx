"use client";

import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import "@/styles/scss/components/_pagination.scss";

export function Pagination({
	pageInfo,
}: {
	pageInfo: {
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		endCursor?: string | null;
		startCursor?: string | null;
	};
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Construct next and previous page URLs based on the current search parameters
	// and the pageInfo provided.
	const nextSearchParams = new URLSearchParams(searchParams);
	nextSearchParams.set("cursor", pageInfo.endCursor ?? "");
	nextSearchParams.set("direction", "next");
	const nextPageUrl = `${pathname}?${nextSearchParams.toString()}`;

	const prevSearchParams = new URLSearchParams(searchParams);
	prevSearchParams.set("cursor", pageInfo.startCursor ?? "");
	prevSearchParams.set("direction", "prev");
	const prevPageUrl = `${pathname}?${prevSearchParams.toString()}`;

	return (
		<nav className="pagination">
			<Link
				href={pageInfo.hasPreviousPage ? prevPageUrl : "#"}
				className={clsx("pagination-link", {
					"is-active": pageInfo.hasPreviousPage,
					"is-disabled": !pageInfo.hasPreviousPage,
				})}
				aria-disabled={!pageInfo.hasPreviousPage}
			>
				Previous
			</Link>

			<Link
				href={pageInfo.hasNextPage ? nextPageUrl : "#"}
				className={clsx("pagination-link", {
					"is-active": pageInfo.hasNextPage,
					"is-disabled": !pageInfo.hasNextPage,
				})}
				aria-disabled={!pageInfo.hasNextPage}
			>
				Next
			</Link>
		</nav>
	);
}
