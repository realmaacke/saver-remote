import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Root() {
	const token = (await cookies()).get('token')?.value;
	if (!token)
		redirect('/auth/login');

	redirect('/dashboard');
}
