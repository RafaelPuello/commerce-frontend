"use client";

import clsx from "clsx";
import { type ReactElement } from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import useSelectedPathname from "@/hooks/useSelectedPathname";

export function NavLink({ href, children }: { href: string; children: ReactElement | string }) {
	const pathname = useSelectedPathname();
	const isActive = pathname === href;

	return (
		<li className="cs-li">
			<LinkWithChannel href={href} className={clsx(isActive ? "cs-li-link cs-active" : "cs-li-link")}>
				{children}
			</LinkWithChannel>
		</li>
	);
}
