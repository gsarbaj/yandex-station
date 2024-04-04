import {auth, signOut} from "@/auth"

export default async function SettingsPage () {
    const session = await auth();
    const email = session?.user.email


    return (
        <>
            {JSON.stringify(session)}


            <form action={async () => {
                'use server'
                await signOut();
            }}>
                <button type={'submit'}>
                    Sign out
                </button>
            </form>

        </>
    );
};
