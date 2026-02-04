import { getServerAuthClient } from "@/app/config";
import "@/styles/scss/components/LoginForm.scss";

export async function LoginForm() {
	return (
		<div className="login-wrapper">
			<form
				className="login-card"
				action={async (formData) => {
					"use server";

					const email = formData.get("email")?.toString();
					const password = formData.get("password")?.toString();

					if (!email || !password) {
						throw new Error("Email and password are required");
					}

					const { data } = await (
						await getServerAuthClient()
					).signIn({ email, password }, { cache: "no-store" });

					if (data.tokenCreate.errors.length > 0) {
						// setErrors(data.tokenCreate.errors.map((error) => error.message));
						// setFormValues(DefaultValues);
					}
				}}
			>
				<div className="login-field">
					<label className="sr-only" htmlFor="email">
						Email
					</label>
					<input required type="email" name="email" id="email" placeholder="Email" className="login-input" />
				</div>
				<div className="login-field">
					<label className="sr-only" htmlFor="password">
						Password
					</label>
					<input
						required
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						autoCapitalize="off"
						autoComplete="off"
						className="login-input"
					/>
				</div>

				<button className="login-submit" type="submit">
					Log In
				</button>
			</form>
		</div>
	);
}
