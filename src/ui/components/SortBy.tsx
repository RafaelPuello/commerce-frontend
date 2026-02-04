"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import "@/styles/scss/components/SortBy.scss";

const sortOptions = [
	{ name: "A to Z", value: "name-asc" },
	{ name: "Price: Low to High", value: "price-asc" },
	{ name: "Price: High to Low", value: "price-desc" },
];

export const SortBy = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentSortValue = searchParams.get("sort") || "name-asc";

	const selectedOption = sortOptions.find((option) => option.value === currentSortValue) || sortOptions[0];

	const handleChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set("sort", value);
		newParams.delete("cursor");
		newParams.delete("direction");
		router.push(`?${newParams.toString()}`);
	};

	return (
		<div className="sort-by">
			<Listbox value={currentSortValue} onChange={handleChange}>
				{({ open }) => (
					<div className={clsx("sort-by-container", { "is-open": open })}>
						<Listbox.Button className="sort-by-button">
							<span className="sort-by-button-label">{selectedOption.name}</span>
							<span className="sort-by-chevron">
								<ChevronDown aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Listbox.Options className="sort-by-options">
							{sortOptions.map((option) => (
								<Listbox.Option
									key={option.value}
									className={({ active }) => clsx("sort-by-option", { "is-active": active })}
									value={option.value}
								>
									{({ selected }) => (
										<span className={clsx("sort-by-option-label", { "is-selected": selected })}>
											{option.name}
										</span>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</div>
				)}
			</Listbox>
		</div>
	);
};
