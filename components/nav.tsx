"use client";

import Link from "next/link";
import {
  CalendarPlus,
  ClipboardList,
  History,
  Menu,
  User,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteSession } from "@/lib/session";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-[999999] border-b bg-black text-white transition-all duration-300 ease-in-out">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-gray-300"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <div className="text-xl text-bold md:hidden ml-4">Eather</div>
          <SheetContent side="left" className="bg-black text-white">
            <SheetHeader>
              <SheetTitle className="text-white text-2xl font-bold">
                Eather
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-2 py-6">
              <Link
                href="/appointments/new"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <CalendarPlus className="h-5 w-5" />
                New Appointment
              </Link>
              <Link
                href="/appointments"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <ClipboardList className="h-5 w-5" />
                Current Appointments
              </Link>
              <Link
                href="/dashboard/history"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <History className="h-5 w-5" />
                History
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:gap-6">
          <Link href="/dashboard" className="hidden md:block">
            <span className="text-xl md:text-2xl font-bold">Eather</span>
          </Link>
          <nav className="hidden gap-4 md:flex md:gap-6">
            <Link
              href="/appointments/new"
              className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors duration-200"
            >
              <CalendarPlus className="h-4 w-4" />
              New Appointment
            </Link>
            <Link
              href="/dashboard/appointments"
              className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors duration-200"
            >
              <ClipboardList className="h-4 w-4" />
              Current Appointments
            </Link>
            <Link
              href="/dashboard/history"
              className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors duration-200"
            >
              <History className="h-4 w-4" />
              History
            </Link>
          </nav>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-gray-300"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
