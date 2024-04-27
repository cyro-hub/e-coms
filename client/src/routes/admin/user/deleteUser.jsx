import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { getUsers } from "@/redux/features/userSlice/user";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateUser({ employee }) {
  const { isError, users } = useSelector((state) => state.userState);
  const { name, role, isActive, employeeId } = employee;
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  const onSubmit = async () => {
    const body = { isActive: false, employeeId: employeeId };
    try {
      setIsLoading(true);
      const { user, message, success } = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());

      if (success) {
        dispatch(getUsers());
      }
      setMessage(message);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Delete user</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#000514]">
        <DialogHeader>
          <DialogTitle>Set User inactive</DialogTitle>
          <DialogDescription>
            Are you sure you want to render{" "}
            <b className="text-white text-lg">{name}</b> with role{" "}
            <b className="text-white text-lg">{role.join(", ")}</b> as
            inActive?. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="w-full text-center text-[#ffffff80]">{message}</p>
          <DialogFooter>
            <div className="w-full flex justify-center items-center flex-col space-y-2">
              {isLoading ? (
                <Button className="bg-[#0a4203]" disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="bg-[#105a0e] w-[70%]" onClick={onSubmit}>
                  save
                </Button>
              )}
              <Outlet />
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
