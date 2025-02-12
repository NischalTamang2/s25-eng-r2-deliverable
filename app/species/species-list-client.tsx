"use client"

import {useState} from "react";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesCard from "./species-card";
import type { Database } from "@/lib/schema";
type Species = Database["public"]["Tables"]["species"]["Row"];


export default function SpeciesListClient({ species, sessionId }: { species: Species[]; sessionId: string}) {
  const [query, setQuery] = useState<string>("");

  // filters out the specie cards depending on the user's search
  const filteredSpecies = species.filter(specie => ((specie.scientific_name.toLowerCase() ?? "").includes(query.toLowerCase()) ||
                        (specie.common_name?.toLowerCase() ?? "").includes(query.toLowerCase()) ||
                        (specie.description?.toLowerCase() ?? "").includes(query.toLowerCase()))
                      );

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <AddSpeciesDialog userId={sessionId} />
      </div>
      <Separator className="my-4" />
      <input
      type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)}
      className="p-2 border rounded bg-white w-full mb-2 text-black">
      </input>
      <div className="flex flex-wrap justify-center">
        {filteredSpecies.length > 0 ?
        filteredSpecies?.map((species) => <SpeciesCard key={species.id} species={species} sessionId={sessionId}/>):
        <h3 className="mt-2">No Species Found.</h3>}
      </div>
    </>
  );
}
