import { Suspense } from "react";
import { NavBar } from "./nav/Nav";
import { NavLinks } from "./nav/components/NavLinks";
import { SearchBar } from "./nav/components/SearchBar";
import { UserMenuContainer } from "./nav/components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./nav/components/CartNavItem";

export function Header({ channel }: { channel: string }) {
	return (
		<NavBar>
			<Suspense fallback={<div className="cs-li" />}>
				<NavLinks channel={channel} />
			</Suspense>
			<li className="cs-li cs-search">
				<SearchBar channel={channel} />
			</li>
			<li className="cs-li cs-user">
				<Suspense fallback={<div className="nav-placeholder w-md" />}>
					<UserMenuContainer />
				</Suspense>
			</li>
			<li className="cs-li cs-cart">
				<Suspense fallback={<div className="nav-placeholder w-sm" />}>
					<CartNavItem channel={channel} />
				</Suspense>
			</li>
		</NavBar>
	);
}
