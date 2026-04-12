"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import "@/styles/scss/components/_navigation.scss";

type NavBarProps = {
	children: ReactNode;
};

const LogoSvg = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="logo"
		height="48px"
		viewBox="0 -960 960 960"
		width="48px"
		fill="currentColor"
	>
		<path d="M317-140h326l48-190H269l48 190Zm0 60q-20 0-36.29-12.54Q264.43-105.08 259-125l-52-205h546l-52 205q-5.43 19.92-21.71 32.46Q663-80 643-80H317ZM180-390h600v-100H180v100Zm301-251q0-87 75-160.5T719-880q-3 81-67 150.5T510-645v95h330v160q0 24.75-17.62 42.37Q804.75-330 780-330H180q-24.75 0-42.37-17.63Q120-365.25 120-390v-160h330v-95q-78-15-141.5-84.5T241-880q88 5 164 78t76 161Z" />
	</svg>
);

export function NavBar({ children }: NavBarProps) {
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);
	const prevPathnameRef = useRef(pathname);

	useEffect(() => {
		const onScroll = () => {
			const scrolled = document.documentElement.scrollTop >= 100;
			document.body.classList.toggle("scroll", scrolled);
		};

		onScroll();
		document.addEventListener("scroll", onScroll);
		return () => document.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		document.body.classList.toggle("cs-open", mobileOpen);
	}, [mobileOpen]);

	// Close mobile menu when navigating to a new page
	// This intentionally calls setState in an effect to sync nav state with route changes
	useEffect(() => {
		if (pathname !== prevPathnameRef.current) {
			prevPathnameRef.current = pathname;
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setMobileOpen(false);
		}
	}, [pathname]);

	return (
		<header id="cs-navigation" className={mobileOpen ? "cs-active" : ""}>
			<div className="cs-container">
				<LinkWithChannel href="/" className="cs-logo" aria-label="back to home">
					<LogoSvg />
				</LinkWithChannel>

				<nav className="cs-nav" role="navigation">
					<button
						className={`cs-toggle ${mobileOpen ? "cs-active" : ""}`}
						aria-label="mobile menu toggle"
						aria-expanded={mobileOpen}
						onClick={() => setMobileOpen((v) => !v)}
					>
						<div className="cs-box" aria-hidden="true">
							<span className="cs-line cs-line1" />
							<span className="cs-line cs-line2" />
							<span className="cs-line cs-line3" />
						</div>
					</button>

					<div className="cs-ul-wrapper">
						<ul id="cs-expanded" className="cs-ul">
							{children}
						</ul>
					</div>
				</nav>
			</div>
		</header>
	);
}
