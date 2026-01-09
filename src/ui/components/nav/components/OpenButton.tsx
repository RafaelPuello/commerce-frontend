import clsx from "clsx";
import { MenuIcon } from "lucide-react";
import { type HTMLAttributes } from "react";

type Props = {
	onClick: () => void;
} & Pick<HTMLAttributes<HTMLButtonElement>, "aria-controls">;

export const OpenButton = (props: Props) => {
	return (
		/*
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
			<MenuIcon className="h-6 w-6 shrink-0" aria-hidden />
		</button>
*/
		<button
			className={clsx(
				"flex h-8 w-8 flex-col items-center justify-center gap-1.5 self-end self-center md:hidden",
			)}
			aria-controls={props["aria-controls"]}
			aria-expanded={false}
			aria-label="Open menu"
			onClick={props.onClick}
		>
			<MenuIcon className="h-6 w-6 shrink-0" aria-hidden />
		</button>
	);
};
