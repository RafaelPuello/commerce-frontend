import { useEffect, useState, KeyboardEvent } from "react";
import { useLocation, Link } from "react-router-dom";
import { useUser, useConfig } from "../auth";
import DigiDexLogo from "../NewLogo";
import "@/styles/components/NavBar.scss";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type NavItem = {
	name: string;
	to?: string;
	href?: string;
};

interface NavBarItemProps extends NavItem {}

interface NavBarDropdownProps {
	name: string;
	items: NavItem[];
	idx: number;
	openDropdown: number | null;
	handleDropdownToggle: (idx: number) => void;
}

/* ------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------ */

function NavBarItem({ name, to, href }: NavBarItemProps) {
	const location = useLocation();

	const isActive = (href && location.pathname.startsWith(href)) || (to && location.pathname.startsWith(to));

	const cls = isActive ? "cs-li-link cs-active" : "cs-li-link";

	return (
		<li className="cs-li">
			{href ? (
				<a className={cls} href={href}>
					{name}
				</a>
			) : (
				<Link className={cls} to={to!}>
					{name}
				</Link>
			)}
		</li>
	);
}

function NavBarDropdown({ name, items, idx, openDropdown, handleDropdownToggle }: NavBarDropdownProps) {
	const location = useLocation();
	const isOpen = openDropdown === idx;

	const isActive = items.some(
		(item) =>
			(item.href && location.pathname.startsWith(item.href)) ||
			(item.to && location.pathname.startsWith(item.to)),
	);

	const cls = `cs-li cs-dropdown ${isOpen ? "cs-active" : ""}`;

	const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			handleDropdownToggle(idx);
		}
	};

	return (
		<li className={cls} tabIndex={0} onClick={() => handleDropdownToggle(idx)} onKeyDown={handleKeyDown}>
			<span className={`cs-li-link ${isActive ? "cs-active" : ""}`}>
				{name}
				<img
					className="cs-drop-icon"
					src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/down-gold.svg"
					alt="dropdown icon"
					width={15}
					height={15}
					decoding="async"
					aria-hidden="true"
				/>
			</span>

			<ul className="cs-drop-ul" onClick={(e) => e.stopPropagation()}>
				{items.map((item, index) => (
					<li className="cs-drop-li" key={index}>
						{item.href ? (
							<a className="cs-li-link cs-drop-link" href={item.href}>
								{item.name}
							</a>
						) : (
							<Link className="cs-li-link cs-drop-link" to={item.to!}>
								{item.name}
							</Link>
						)}
					</li>
				))}
			</ul>
		</li>
	);
}

/* ------------------------------------------------------------------ */
/* Main NavBar */
/* ------------------------------------------------------------------ */

export default function NavBar() {
	const user = useUser();
	const config = useConfig();
	const location = useLocation();

	const [mobileOpen, setMobileOpen] = useState<boolean>(false);
	const [openDropdown, setOpenDropdown] = useState<number | null>(null);
	const [ariaExpanded, setAriaExpanded] = useState<boolean>(false);

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
		setAriaExpanded(mobileOpen);
		document.body.classList.toggle("cs-open", mobileOpen);
	}, [mobileOpen]);

	useEffect(() => {
		setMobileOpen(false);
		setOpenDropdown(null);
	}, [location]);

	const handleDropdownToggle = (idx: number) => {
		setOpenDropdown((curr) => (curr === idx ? null : idx));
	};

	const anonNav = (
		<>
			<NavBarItem to="/account/login" name="Login" />
			<NavBarItem to="/account/signup" name="Signup" />
			<NavBarItem to="/account/password/reset" name="Reset password" />
		</>
	);

	const authNav = (
		<>
			<NavBarItem to="/account/email" name="Change Email" />
			<NavBarItem to="/account/password/change" name="Change Password" />

			{config.data.socialaccount && <NavBarItem to="/account/providers" name="Providers" />}

			{config.data.mfa && <NavBarItem to="/account/2fa" name="Two-Factor Authentication" />}

			{config.data.usersessions && <NavBarItem to="/account/sessions" name="Sessions" />}

			<NavBarItem to="/account/logout" name="Logout" />
		</>
	);

	return (
		<header id="cs-navigation" className={mobileOpen ? "cs-active" : ""}>
			<div className="cs-container">
				<Link to="/" className="cs-logo" aria-label="back to home">
					<DigiDexLogo />
				</Link>

				<nav className="cs-nav" role="navigation">
					<button
						className={`cs-toggle ${mobileOpen ? "cs-active" : ""}`}
						aria-label="mobile menu toggle"
						aria-expanded={ariaExpanded}
						onClick={() => setMobileOpen((v) => !v)}
					>
						<div className="cs-box" aria-hidden="true">
							<span className="cs-line cs-line1" />
							<span className="cs-line cs-line2" />
							<span className="cs-line cs-line3" />
						</div>
					</button>

					<div className="cs-ul-wrapper">
						<ul id="cs-expanded" className="cs-ul" aria-expanded={ariaExpanded ? "true" : "false"}>
							{user ? authNav : anonNav}
						</ul>
					</div>
				</nav>
			</div>
		</header>
	);
}
