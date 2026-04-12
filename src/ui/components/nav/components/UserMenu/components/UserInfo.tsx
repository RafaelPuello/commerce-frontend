import { type UserDetailsFragment } from "@/gql/graphql";
import "@/styles/scss/components/_nav-components.scss";

type Props = {
	user: UserDetailsFragment;
};

export const UserInfo = ({ user }: Props) => {
	const userName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null;

	return (
		<p className="user-info">
			{userName && <span className="user-info-name">{userName}</span>}
			{user.email}
		</p>
	);
};
