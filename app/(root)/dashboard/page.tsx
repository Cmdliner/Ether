import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarCheck,
  VolumeIcon as Vial,
  ClipboardList,
  Activity,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex-1 space-y-4 p-4 md:p-6 w-full">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/appointments">
          <Card className="transform transition-all hover:scale-105 duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarCheck className="mr-2 h-5 w-5 text-blue-500" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">
                Next: Today at 2:30 PM
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/results?status=pending">
          <Card className="transform transition-all hover:scale-105 duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Vial className="mr-2 h-5 w-5 text-green-500" />
                Test Results Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-muted-foreground">
                Expected within 48 hours
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/appointments/history">
          <Card className="transform transition-all hover:scale-105 duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardList className="mr-2 h-5 w-5 text-purple-500" />
                Recent History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">
                Appointments this month
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <Card className="transform transition-all duration-300 max-w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-red-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 transition-all hover:translate-x-2 duration-200">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <div>
                <p className="font-medium flex items-center">
                  <Vial className="mr-2 h-4 w-4 text-green-500" />
                  Blood Test Results Available
                </p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 transition-all hover:translate-x-2 duration-200">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div>
                <p className="font-medium flex items-center">
                  <CalendarCheck className="mr-2 h-4 w-4 text-blue-500" />
                  Appointment Scheduled
                </p>
                <p className="text-sm text-muted-foreground">
                  Yesterday at 4:30 PM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 transition-all hover:translate-x-2 duration-200">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <div>
                <p className="font-medium flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4 text-yellow-500" />
                  Prescription Renewed
                </p>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
