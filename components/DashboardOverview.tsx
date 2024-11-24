"use client";

import { UserSettings } from "@prisma/client";
import { differenceInDays, startOfMonth } from "date-fns";
import React, { useState } from "react";
import { DateRangePicker } from "./ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { toast } from "sonner";

const DashboardOverview = ({
  userSettings,
}: {
  userSettings: UserSettings;
}) => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <div className="flex flex-wrap items-end justify-between gap-2 p-6">
      <h2 className="text-3xl font-bold">Overview</h2>
      <div className="flex items-center gap-3">
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range;
            if (!from || !to) return;
            if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
              toast.error(
                `The selected date range is too large. Adjust within ${MAX_DATE_RANGE_DAYS} days.`
              );
              return;
            }
            setDateRange({ from, to });
          }}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;