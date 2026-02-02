import Link from "next/link";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function Footer({ channel }: { channel: string }) {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel },
		revalidate: 60 * 60 * 24,
	});
	const channels = process.env.SALEOR_APP_TOKEN
		? await executeGraphQL(ChannelsListDocument, {
				withAuth: false, // disable cookie-based auth for this call
				headers: {
					// and use app token instead
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			})
		: null;
	const currentYear = new Date().getFullYear();

	return (
		<footer>
			<div className="footer-container">
				<div className="grid-footer">
					{footerLinks.menu?.items?.map((item) => {
						return (
							<div key={item.id} className="block-footer">
								<h3 className="subtitle-footer">{item.name}</h3>
								<ul>
									{item.children?.map((child) => {
										if (child.category) {
											return (
												<li key={child.id}>
													<LinkWithChannel
														href={`/categories/${child.category.slug}`}
														className="link-footer"
													>
														{child.category.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.collection) {
											return (
												<li key={child.id}>
													<LinkWithChannel
														href={`/collections/${child.collection.slug}`}
														className="link-footer"
													>
														{child.collection.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.page) {
											return (
												<li key={child.id}>
													<LinkWithChannel href={`/pages/${child.page.slug}`} className="link-footer">
														{child.page.title}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.url) {
											return (
												<li key={child.id}>
													<LinkWithChannel href={child.url} className="link-footer">
														{child.name}
													</LinkWithChannel>
												</li>
											);
										}
										return null;
									})}
								</ul>
							</div>
						);
					})}
				</div>

				{channels?.channels && (
					<div className="paragraph-footer">
						<label>
							Change currency: <ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}

				<div className="block-footer-down">
					<p>Copyright &copy; {currentYear} Your Store, Inc.</p>
					<div className="footer-credits">
						<p>Powered by</p>
						<Link target={"_blank"} href={"https://saleor.io/"}>
							Saleor
						</Link>
						<Link href={"https://github.com/saleor/saleor"} target={"_blank"}>
							<Image alt="Saleor github repository" height={20} width={20} src={"/github-mark.svg"} />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
