"use client";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInButton mode="modal"></SignInButton>
      <Button>Hello</Button>
      <Button onClick={() => createFile({ name: "hello world" })}>
        Click Me
      </Button>
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}
    </main>
  );
}
