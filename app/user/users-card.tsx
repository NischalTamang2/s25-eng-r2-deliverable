import type { Database } from "@/lib/schema";
import Image from "next/image";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"]

export default function UsersCard({profile}:{profile: Profiles}) {

  // display of the user cards
  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      <div className="relative aspect-video h-60 w-full">
        <Image src={"https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} alt={"default-prof"} fill style={{ objectFit: "cover" }} />
      </div>
      <h3 className="mt-3 text-2xl font-semibold">{profile.display_name}</h3>
      <h4 className="text-lg font-light">{profile.email}</h4>
      <p className="mt-2">{profile.biography ? profile.biography.slice(0, 150).trim() + "..." : ""}</p>
    </div>
  );
}

