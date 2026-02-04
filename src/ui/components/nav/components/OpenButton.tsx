import { MenuIcon } from "lucide-react";
import { type HTMLAttributes } from "react";
import "@/styles/scss/components/NavComponents.scss";

type Props = {
	onClick: () => void;
} & Pick<HTMLAttributes<HTMLButtonElement>, "aria-controls">;

export const OpenButton = (props: Props) => {
	return (
		<button
			className="mobile-menu-button"
			aria-controls={props["aria-controls"]}
			aria-expanded={false}
			aria-label="Open menu"
			onClick={props.onClick}
		>
			<MenuIcon className="mobile-menu-icon" aria-hidden />
		</button>
	);
};
