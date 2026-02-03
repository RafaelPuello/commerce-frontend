import NextImage, { type ImageProps } from "next/image";

export const ProductImageWrapper = (props: ImageProps) => {
	return (
		<div className="product-image-wrapper">
			<NextImage {...props} className="product-image" />
		</div>
	);
};
