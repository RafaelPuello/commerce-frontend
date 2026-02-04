import { ProductElement } from "./ProductElement";
import { type ProductListItemFragment } from "@/gql/graphql";
import "@/styles/scss/components/Products.scss";

export const ProductList = ({ products }: { products: readonly ProductListItemFragment[] }) => {
	return (
		<ul role="list" data-testid="ProductList" className="collection-list-shop">
			{products.map((product, index) => (
				<ProductElement
					key={product.id}
					product={product}
					priority={index < 2}
					loading={index < 3 ? "eager" : "lazy"}
				/>
			))}
		</ul>
	);
};
