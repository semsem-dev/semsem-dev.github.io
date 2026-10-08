"use client";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import { github } from "@/app/data/contribution-graph-theme";
import { useState } from "react";
import { useHasMounted } from "@/app/utils/use-has-mounted";
import YearButton from "../shared/YearButton";
import { getGitHubYears } from "@/app/utils/calculate-years";
import EmptyState from "../shared/EmptyState";
import { IoIosAnalytics } from "react-icons/io";

export default function ContributionGraph() {
  const [calendarYear, setCalendarYear] = useState<number | undefined>(
    undefined
  );
  const { theme, systemTheme } = useTheme();
  const scheme =
    theme === "light" ? "light" : theme === "dark" ? "dark" : systemTheme;

  // Apply the theme only after hydration to avoid a client/server mismatch
  // https://github.com/vercel/next.js/issues/10608#issuecomment-589073831
  const hasMounted = useHasMounted();
  const serverTheme = hasMounted ? scheme : undefined;

  const today = new Date().getFullYear();
  const username = "semsem-dev";
  const joinYear = Number(process.env.NEXT_PUBLIC_GITHUB_JOIN_YEAR) || 2020;
  const years = getGitHubYears(joinYear);

  if (!username || !joinYear)
    return (
      <EmptyState
        icon={<IoIosAnalytics />}
        title="Unable to load Contribution Graph"
        message="We could not find any GitHub credentials added to the .env file. To display the graph, provide your username and the year you joined GitHub"
      />
    );

  return (
    <div className="flex xl:flex-row flex-col gap-4">
      <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg max-w-fit max-h-fit">
        <GitHubCalendar
          username={username}
          theme={github}
          colorScheme={serverTheme}
          blockSize={13}
          year={calendarYear}
        />
      </div>
      <div className="flex justify-start xl:flex-col flex-row flex-wrap gap-2">
        {/* Display only the last five years */}
        {years.slice(0, 5).map((year) => (
          <YearButton
            key={year}
            year={year}
            currentYear={calendarYear ?? today}
            onClick={() =>
              setCalendarYear(year === calendarYear ? undefined : year)
            }
          />
        ))}
      </div>
    </div>
  );
}
