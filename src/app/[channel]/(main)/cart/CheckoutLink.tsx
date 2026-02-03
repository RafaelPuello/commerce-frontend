"use client";

type Props = {
	disabled?: boolean;
	checkoutId?: string;
};

export const CheckoutLink = ({ disabled, checkoutId }: Props) => {
	return (
		<a
			data-testid="CheckoutLink"
			aria-disabled={disabled}
			onClick={(e) => disabled && e.preventDefault()}
			href={`/checkout?checkout=${checkoutId}`}
			className="cart-page-checkout-btn"
		>
			Checkout
		</a>
	);
};
