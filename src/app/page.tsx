"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useOrganization } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { organization } = useOrganization();
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(
    api.files.getFiles,
    organization?.id ? {orgId : organization.id} : "skip"
  );
  console.log(organization?.id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInButton mode="modal"></SignInButton>
      <Button>Hello</Button>
      <Button
        onClick={() => {
          if (!organization) return;
          createFile({ name: "hello world", orgId: organization.id });
        }}
      >
        Click Me
      </Button>
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}
    </main>
  );
}
