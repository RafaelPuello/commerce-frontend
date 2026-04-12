import { redirect } from "next/navigation";
import { SearchIcon } from "lucide-react";
import "@/styles/scss/components/_nav-components.scss";

export const SearchBar = ({ channel }: { channel: string }) => {
	async function onSubmit(formData: FormData) {
		"use server";
		const search = formData.get("search") as string;
		if (search && search.trim().length > 0) {
			redirect(`/${encodeURIComponent(channel)}/search?query=${encodeURIComponent(search)}`);
		}
	}

	return (
		<form action={onSubmit} className="search-form">
			<label className="search-label">
				<span className="sr-only">search for products</span>
				<input
					type="text"
					name="search"
					placeholder="Search for products..."
					autoComplete="on"
					required
					className="search-input"
				/>
			</label>
			<div className="search-button-wrapper">
				<button type="submit" className="search-submit">
					<span className="sr-only">search</span>
					<SearchIcon aria-hidden className="search-submit-icon" />
				</button>
			</div>
		</form>
	);
};
