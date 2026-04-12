"use client";

import { useParams, useRouter } from "next/navigation";
import "@/styles/scss/components/_channel-select.scss";

export const ChannelSelect = ({
	channels,
}: {
	channels: { id: string; name: string; slug: string; currencyCode: string }[];
}) => {
	const router = useRouter();
	const params = useParams<{ channel: string }>();

	return (
		<select
			className="channel-select"
			onChange={(e) => {
				const newChannel = e.currentTarget.value;
				return router.push(`/${newChannel}`);
			}}
			value={params.channel}
		>
			{channels.map((channel) => (
				<option key={channel.id} value={channel.slug}>
					{channel.currencyCode}
				</option>
			))}
		</select>
	);
};
