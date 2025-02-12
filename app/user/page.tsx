import { TypographyH2 } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import UsersCard from "./users-card";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";


export default async function UsersList(){
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  const {data: profile} = await supabase.from("profiles").select("*");
  return(
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Users List</TypographyH2>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {profile?.map((profile) => <UsersCard key={profile.id} profile={profile} />)}
      </div>
    </>
  )

}


