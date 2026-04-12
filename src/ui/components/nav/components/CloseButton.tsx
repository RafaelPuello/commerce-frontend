import { XIcon } from "lucide-react";
import { type HTMLAttributes } from "react";
import "@/styles/scss/components/_nav-components.scss";

type Props = {
	onClick: () => void;
} & Pick<HTMLAttributes<HTMLButtonElement>, "aria-controls">;

export const CloseButton = (props: Props) => {
	return (
		<button
			className="mobile-menu-button"
			aria-controls={props["aria-controls"]}
			aria-expanded={true}
			aria-label="Close menu"
			onClick={props.onClick}
		>
			<XIcon className="mobile-menu-icon" aria-hidden />
		</button>
	);
};
