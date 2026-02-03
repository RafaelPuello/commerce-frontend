"use client";

import { Fragment, type ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Logo } from "../../Logo";
import { useMobileMenu } from "./useMobileMenu";
import { OpenButton } from "./OpenButton";
import { CloseButton } from "./CloseButton";
import "@/styles/components/NavComponents.scss";

type Props = {
	children: ReactNode;
};

export const MobileMenu = ({ children }: Props) => {
	const { closeMenu, openMenu, isOpen } = useMobileMenu();

	return (
		<>
			<OpenButton onClick={openMenu} aria-controls="mobile-menu" />
			<Transition show={isOpen}>
				<Dialog onClose={closeMenu}>
					<Dialog.Panel className="mobile-menu-panel">
						<Transition.Child
							className="mobile-menu-header"
							enter="mobile-menu-transition-enter"
							enterFrom="mobile-menu-transition-enter-from"
							enterTo="mobile-menu-transition-enter-to"
							leave="mobile-menu-transition-leave"
							leaveFrom="mobile-menu-transition-leave-from"
							leaveTo="mobile-menu-transition-leave-to"
						>
							<Logo />
							<CloseButton onClick={closeMenu} aria-controls="mobile-menu" />
						</Transition.Child>
						<Transition.Child
							as={Fragment}
							enter="mobile-menu-content-enter"
							enterFrom="mobile-menu-content-enter-from"
							enterTo="mobile-menu-content-enter-to"
							leave="mobile-menu-content-leave"
							leaveFrom="mobile-menu-content-leave-from"
							leaveTo="mobile-menu-content-leave-to"
						>
							<ul className="mobile-menu-list" id="mobile-menu">
								{children}
							</ul>
						</Transition.Child>
					</Dialog.Panel>
				</Dialog>
			</Transition>
		</>
	);
};
