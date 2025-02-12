import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function LearnMoreDialog({ species }: { species: Species }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
    {/* triggers the dialog that provides a detailed display of the animal when pressed "Learn More"*/}
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button className="mt-3 w-full">Learn More</Button>
    </DialogTrigger>
    <DialogContent className="max-w-screen-md max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{species.scientific_name}</DialogTitle>
        <DialogDescription> Commonly Known as {species.common_name}</DialogDescription>
      </DialogHeader>
      {/*short circuit evaluation, if species.image is true, it will do the code that follows "&&"; if it is
      false, meaning that it is "null" or "undefined" or "etc.", it will not run the following code */}
      {/* aspect-video = flexible aspect for all images */}
      {species.image && (
      <div className="relative aspect-video h-40 w-full mt-4 mb-4">
        <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "contain", transform: "scale(1.2)"}} />
      </div>
      )}
      <p>Kingdom: {species.kingdom} </p>
      {/* displays the population number if there is data, else, displays "Unknown" if population data is null */}
      <p>Total Population: {species.total_population?? "Unknown"} </p>
      <p>{species.description}</p>
      {/* button to close dialog */}
      <DialogClose asChild>
        <Button type="button" className="mt-3 w-full" variant="secondary">
          Close
        </Button>
      </DialogClose>
    </DialogContent>
  </Dialog>
  </>
  );
}
