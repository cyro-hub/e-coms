import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";

export default function ViewUserDialog({ employee }) {
  const { name, employeeId, role, createdAt, updatedAt, isActive } = employee;
  return (
    <Dialog>
      <DialogTrigger>View Employee</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#000514]">
        <DialogHeader>
          <DialogTitle>User's Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="container flex gap-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <h4 className="w-full">{employeeId}</h4>
              <span className="w-full italic text-xs">{name}</span>
            </div>
          </div>
          <div className="grid grid-cols-4 items-baseline gap-4">
            <span className="text-right italic text-xs">Role</span>
            <div className="col-span-3">
              {role.includes("admin") ? "admin" : role[0]}
            </div>
          </div>
          <div className="grid grid-cols-4 items-baseline gap-4">
            <span className="text-right italic text-xs">Is Active</span>
            <div className="col-span-3">{isActive ? "True" : "false"}</div>
          </div>
          <div className="grid grid-cols-4 items-baseline gap-4">
            <span className="text-right italic text-xs">Created At</span>
            <div className="col-span-3">{moment(createdAt).format("LLLL")}</div>
          </div>
          <div className="grid grid-cols-4 items-baseline gap-4">
            <span className="text-right italic text-xs">Updated At</span>
            <div className="col-span-3">{moment(updatedAt).format("LLLL")}</div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
