import { CircleUserRound } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import LogoutButton from "../app-components/auth/LogoutButton";

const UserDetailsIcon = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.status);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  if (!userData) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <CircleUserRound className="w-6 h-6 inline-flex items-center justify-center" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Loading ...</DialogTitle>
            <DialogDescription>Data is still loading...</DialogDescription>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <CircleUserRound className="w-6 h-6 inline-flex items-center justify-center" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {isAuthenticated ? (
              <>
                <DialogTitle>Hi, {userData.firstname}</DialogTitle>
                <DialogDescription>
                  You can make any change you want here.
                </DialogDescription>
              </>
            ) : (
              <>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                  You have to login to continue.
                </DialogDescription>
              </>
            )}
          </DialogHeader>
          {isAuthenticated ? (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  {/* TODO: kept for future*/}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
            </>
          )}
          {isAuthenticated ? (
            <DialogFooter>
              <LogoutButton />
            </DialogFooter>
          ) : (
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserDetailsIcon;
