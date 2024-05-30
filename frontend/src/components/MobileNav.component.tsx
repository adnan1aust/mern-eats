import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const MobileNav = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-primary" />
        </SheetTrigger>
        <SheetContent className="space-y-3">
          <SheetTitle>
            <span>Welcome to MernEats.com</span>
          </SheetTitle>
          <Separator />
          <SheetDescription className="flex">
            <Button className="flex-1 font-bold">Log In</Button>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
