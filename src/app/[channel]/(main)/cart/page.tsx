import Image from "next/image";
import { CheckoutLink } from "./CheckoutLink";
import { DeleteLineButton } from "./DeleteLineButton";
import * as Checkout from "@/lib/checkout";
import { formatMoney, getHrefForVariant } from "@/lib/utils";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import "@/styles/scss/components/_cart.scss";

export const metadata = {
	title: "Shopping Cart · Saleor Storefront example",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const checkoutId = await Checkout.getIdFromCookies(params.channel);

	const checkout = await Checkout.find(checkoutId);

	if (!checkout || checkout.lines.length < 1) {
		return (
			<section className="cart-page-empty">
				<h1 className="cart-page-empty-title">Your Shopping Cart is empty</h1>
				<p className="cart-page-empty-message">Looks like you have not added any items to the cart yet.</p>
				<LinkWithChannel href="/products" className="cart-page-explore-btn">
					Explore products
				</LinkWithChannel>
			</section>
		);
	}

	return (
		<section className="cart-page">
			<h1 className="cart-page-title">Your Shopping Cart</h1>
			<form className="cart-page-form">
				<ul data-testid="CartProductList" role="list" className="cart-page-list">
					{checkout.lines.map((item) => (
						<li key={item.id} className="cart-page-item">
							<div className="cart-page-item-image">
								{item.variant?.product?.thumbnail?.url && (
									<Image
										src={item.variant.product.thumbnail.url}
										alt={item.variant.product.thumbnail.alt ?? ""}
										width={200}
										height={200}
									/>
								)}
							</div>
							<div className="cart-page-item-details">
								<div className="cart-page-item-header">
									<div className="cart-page-item-info">
										<LinkWithChannel
											href={getHrefForVariant({
												productSlug: item.variant.product.slug,
												variantId: item.variant.id,
											})}
										>
											<h2 className="cart-page-item-name">{item.variant?.product?.name}</h2>
										</LinkWithChannel>
										<p className="cart-page-item-category">{item.variant?.product?.category?.name}</p>
										{item.variant.name !== item.variant.id && Boolean(item.variant.name) && (
											<p className="cart-page-item-variant">Variant: {item.variant.name}</p>
										)}
									</div>
									<p className="cart-page-item-price">
										{formatMoney(item.totalPrice.gross.amount, item.totalPrice.gross.currency)}
									</p>
								</div>
								<div className="cart-page-item-footer">
									<div className="cart-page-item-quantity">Qty: {item.quantity}</div>
									<DeleteLineButton checkoutId={checkoutId} lineId={item.id} />
								</div>
							</div>
						</li>
					))}
				</ul>

				<div className="cart-page-totals">
					<div className="cart-page-totals-box">
						<div className="cart-page-totals-row">
							<div>
								<p className="cart-page-totals-label">Your Total</p>
								<p className="cart-page-totals-note">Shipping will be calculated in the next step</p>
							</div>
							<div className="cart-page-totals-value">
								{formatMoney(checkout.totalPrice.gross.amount, checkout.totalPrice.gross.currency)}
							</div>
						</div>
					</div>
					<div className="cart-page-actions">
						<CheckoutLink checkoutId={checkoutId} disabled={!checkout.lines.length} />
					</div>
				</div>
			</form>
		</section>
	);
}
