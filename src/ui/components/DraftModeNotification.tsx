import { draftMode } from "next/headers";
import Link from "next/link";
import "@/styles/components/DraftMode.scss";

export const DraftModeNotification = async () => {
	if (!(await draftMode()).isEnabled) {
		return null;
	}

	return (
		<div className="draft-mode-notification">
			You&apos;re in draft mode. Requests are not cached. <Link href="/api/draft/disable">Disable.</Link>
		</div>
	);
};
