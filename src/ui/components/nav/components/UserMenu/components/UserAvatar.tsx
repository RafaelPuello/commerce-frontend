import Image from "next/image";
import { type UserDetailsFragment } from "@/gql/graphql";
import "@/styles/components/NavComponents.scss";

type Props = {
	user: UserDetailsFragment;
};

export const UserAvatar = ({ user }: Props) => {
	const label =
		user.firstName && user.lastName
			? `${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`
			: user.email.slice(0, 2);

	if (user.avatar) {
		return (
			<div className="user-avatar">
				<Image
					className="user-avatar-image"
					aria-hidden="true"
					src={user.avatar.url}
					width={32}
					height={32}
					alt=""
				/>
			</div>
		);
	}

	return (
		<span className="user-avatar-initials" aria-hidden="true">
			{label}
		</span>
	);
};
