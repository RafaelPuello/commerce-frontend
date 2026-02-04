"use client";

import { Fragment } from "react";
import clsx from "clsx";
import { Menu, Transition } from "@headlessui/react";
import { UserInfo } from "./components/UserInfo";
import { UserAvatar } from "./components/UserAvatar";
import { type UserDetailsFragment } from "@/gql/graphql";
import { logout } from "@/app/actions";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import "@/styles/scss/components/NavComponents.scss";

type Props = {
	user: UserDetailsFragment;
};

export function UserMenu({ user }: Props) {
	return (
		<Menu as="div" className="user-menu">
			<Menu.Button className="user-menu-button">
				<span className="sr-only">Open user menu</span>
				<UserAvatar user={user} />
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="menu-transition-enter"
				enterFrom="menu-transition-enter-from"
				enterTo="menu-transition-enter-to"
				leave="menu-transition-leave"
				leaveFrom="menu-transition-leave-from"
				leaveTo="menu-transition-leave-to"
			>
				<Menu.Items className="user-menu-dropdown">
					<UserInfo user={user} />
					<div className="user-menu-section">
						<Menu.Item>
							{({ active }) => (
								<LinkWithChannel href="/orders" className={clsx("user-menu-item", active && "is-active")}>
									My orders
								</LinkWithChannel>
							)}
						</Menu.Item>
					</div>
					<div className="user-menu-section">
						<Menu.Item>
							{({ active }) => (
								<form action={logout}>
									<button type="submit" className={clsx("user-menu-item", active && "is-active")}>
										Log Out
									</button>
								</form>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
