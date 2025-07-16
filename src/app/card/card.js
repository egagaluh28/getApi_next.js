"use client";
import { Card, CardHeader, Image, CardFooter, Button } from "@heroui/react";

export default function App() {
  const cardData = {
    title: "Smash Legends",
    genre: "Fighting",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card isFooterBlurred className="border-none" radius="lg">
        <Image
          alt="Woman listening to music"
          className="object-cover"
          height={400}
          src="https://heroui.com/images/card-example-3.jpeg"
          width={250}
        />
        <CardHeader className="absolute z-10 top-1 flex-col !items-start p-4">
          {/* <p className="text-tiny text-white/60 uppercase font-bold">
            {cardData.subtitle}
          </p> */}
          <h4 className="text-white font-medium text-large">
            {cardData.genre}
          </h4>
        </CardHeader>
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <div className="flex gap-2 items-center">
            <p className="text-tiny text-white/80">
              <span className="font-semibold font-medium ">
                {cardData.title}
              </span>
            </p>
          </div>
          <Button
            className="text-tiny text-white bg-black/20"
            color="default"
            radius="lg"
            size="sm"
            variant="flat">
            Read more
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
