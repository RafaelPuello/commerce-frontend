import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { formatDate, formatMoney, getHrefForVariant } from "@/lib/utils";
import { type OrderDetailsFragment } from "@/gql/graphql";
import { PaymentStatus } from "@/ui/components/PaymentStatus";
import "@/styles/components/Orders.scss";

type Props = {
	order: OrderDetailsFragment;
};

export const OrderListItem = ({ order }: Props) => {
	return (
		<li className="order-item">
			<div className="order-header">
				<dl className="order-header-meta">
					<div className="order-header-field">
						<dt className="order-header-label">Order number</dt>
						<dd className="order-header-value">{order.number}</dd>
					</div>
					<div className="order-header-field">
						<dt className="order-header-label">Date placed</dt>
						<dd className="order-header-value">
							<time dateTime={order.created}>{formatDate(new Date(order.created))}</time>
						</dd>
					</div>
					<div className="order-header-field">
						<dt className="order-header-label">Payment status</dt>
						<dd className="order-header-value">
							<PaymentStatus status={order.paymentStatus} />
						</dd>
					</div>
				</dl>
			</div>

			{order.lines.length > 0 && (
				<>
					<div className="order-lines-wrapper">
						<table className="order-lines-table">
							<thead>
								<tr>
									<td>product</td>
									<td>quantity and unit price</td>
									<td>price</td>
								</tr>
							</thead>
							<tbody>
								{order.lines.map((item) => {
									if (!item.variant) {
										return null;
									}

									const product = item.variant.product;

									return (
										<tr key={product.id}>
											<td className="order-line-product">
												{product.thumbnail && (
													<div className="order-line-thumbnail">
														<Image
															src={product.thumbnail.url}
															alt={product.thumbnail.alt ?? ""}
															width={200}
															height={200}
														/>
													</div>
												)}
												<div>
													<LinkWithChannel
														href={getHrefForVariant({
															productSlug: product.slug,
															variantId: item.variant.id,
														})}
														className="order-line-name"
													>
														{product.name}
													</LinkWithChannel>
													{item.variant.name !== item.variant.id && Boolean(item.variant.name) && (
														<p className="order-line-variant">Variant: {item.variant.name}</p>
													)}
												</div>
											</td>
											<td className="order-line-unit is-hidden-mobile">
												{item.quantity} x{" "}
												{item.variant.pricing?.price &&
													formatMoney(
														item.variant.pricing.price.gross.amount,
														item.variant.pricing.price.gross.currency,
													)}
											</td>
											<td className="order-line-total">
												<div className="order-line-total-value">
													{item.variant.pricing?.price &&
														formatMoney(
															item.variant.pricing.price.gross.amount * item.quantity,
															item.variant.pricing.price.gross.currency,
														)}
													{item.quantity > 1 && (
														<span className="order-line-unit-mobile">
															{item.quantity} x{" "}
															{item.variant.pricing?.price &&
																formatMoney(
																	item.variant.pricing.price.gross.amount,
																	item.variant.pricing.price.gross.currency,
																)}
														</span>
													)}
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<dl className="order-totals">
						<dt className="order-totals-label">Total amount including delivery</dt>
						<dd className="order-totals-value">
							{formatMoney(order.total.gross.amount, order.total.gross.currency)}
						</dd>
					</dl>
				</>
			)}
		</li>
	);
};
