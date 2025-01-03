"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/user.action";

export default function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlefollow = async () => {
    setIsLoading(true);
    try {
        await toggleFollow(userId);
        toast.success("Followed successfully");
    } catch (error) {
        console.log("Error following", error);
        toast.error("Failed to follow");
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      onClick={handlefollow}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? <Loader2Icon className="size-4 animation-spin" /> : "Follow"}
    </Button>
  );
}
