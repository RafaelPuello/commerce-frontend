"use client";

import { useState, type ReactNode } from "react";
import "@/styles/scss/components/CategoryCollection.scss";

export interface CategoryItem {
	id: string;
	name: string;
	slug: string;
	icon?: ReactNode;
}

export interface CategoryCollectionProps {
	categories: CategoryItem[];
	onCategoryChange?: (categorySlug: string | null) => void;
	defaultSelected?: string | null;
	allLabel?: string;
	allIcon?: ReactNode;
	className?: string;
}

export function CategoryCollection({
	categories,
	onCategoryChange,
	defaultSelected = null,
	allLabel = "All",
	allIcon,
	className = "",
}: CategoryCollectionProps) {
	const [selected, setSelected] = useState<string | null>(defaultSelected);

	const handleSelect = (slug: string | null) => {
		setSelected(slug);
		onCategoryChange?.(slug);
	};

	return (
		<div className={`block-categories ${className}`}>
			<div className="collection-list-categories" role="list">
				<div className="collection-item-categories" role="listitem">
					<button
						type="button"
						className={`link-category ${selected === null ? "is-active" : ""}`}
						onClick={() => handleSelect(null)}
						aria-pressed={selected === null}
					>
						{allIcon && <span className="icon-category">{allIcon}</span>}
						<span className="text-category">{allLabel}</span>
					</button>
				</div>
				{categories.map((category) => (
					<div key={category.id} className="collection-item-categories" role="listitem">
						<button
							type="button"
							className={`link-category ${selected === category.slug ? "is-active" : ""}`}
							onClick={() => handleSelect(category.slug)}
							aria-pressed={selected === category.slug}
						>
							{category.icon && <span className="icon-category">{category.icon}</span>}
							<span className="text-category">{category.name}</span>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
