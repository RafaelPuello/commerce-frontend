import { XIcon } from "lucide-react";
import "@/styles/scss/components/_products.scss";

type Props = {
	isAvailable: boolean;
};

export const AvailabilityMessage = ({ isAvailable }: Props) => {
	if (!isAvailable) {
		return (
			<div className="availability-message">
				<XIcon className="availability-icon" aria-hidden="true" />
				<p className="availability-text">Out of stock</p>
			</div>
		);
	}
	return <></>;
};
