import { AlertCircleIcon, CheckCircleIcon, ClockIcon, XCircle } from "lucide-react";
import { PaymentChargeStatusEnum } from "@/gql/graphql";
import "@/styles/components/PaymentStatus.scss";

type Props = {
	status: PaymentChargeStatusEnum;
};

export const PaymentStatus = async ({ status }: Props) => {
	switch (status) {
		case PaymentChargeStatusEnum.NotCharged:
			return (
				<p className="payment-status status-error">
					<XCircle aria-hidden />
					unpaid
				</p>
			);
		case PaymentChargeStatusEnum.Cancelled:
			return (
				<p className="payment-status status-error">
					<XCircle aria-hidden />
					cancelled
				</p>
			);
		case PaymentChargeStatusEnum.Refused:
			return (
				<p className="payment-status status-error">
					<XCircle aria-hidden />
					refused
				</p>
			);
		case PaymentChargeStatusEnum.FullyCharged:
			return (
				<p className="payment-status status-success">
					<CheckCircleIcon aria-hidden />
					paid
				</p>
			);
		case PaymentChargeStatusEnum.FullyRefunded:
			return (
				<p className="payment-status status-success">
					<CheckCircleIcon aria-hidden />
					refunded
				</p>
			);
		case PaymentChargeStatusEnum.PartiallyCharged:
			return (
				<p className="payment-status status-warning">
					<AlertCircleIcon aria-hidden />
					partially paid
				</p>
			);
		case PaymentChargeStatusEnum.PartiallyRefunded:
			return (
				<p className="payment-status status-warning">
					<AlertCircleIcon aria-hidden />
					partially refunded
				</p>
			);
		case PaymentChargeStatusEnum.Pending:
			return (
				<p className="payment-status status-warning">
					<ClockIcon aria-hidden />
					pending
				</p>
			);
	}
};
