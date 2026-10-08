import Image from "next/image";
import type { JobType } from "@/types";
import { jobsData } from "@/app/data/jobs";
import { formatDate } from "../../utils/date";
import { Slide } from "../../animation/Slide";
import RefLink from "../shared/RefLink";
import EmptyState from "../shared/EmptyState";
import { RiBriefcase3Fill } from "react-icons/ri";

export default async function Job() {
  const jobs: JobType[] = jobsData;

  return (
    <section className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            Work Experience
          </h2>
        </div>
      </Slide>

      {jobs.length > 0 ? (
        <Slide delay={0.18}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
            {jobs.map((job, index) => (
              <div
                key={job._id}
                className="code-block group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300"
              >
                {/* IDE Header */}
                <div className="code-header justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <span className="ml-2 text-zinc-400">job_{index + 1}.tsx</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-normal">
                    TSX
                  </div>
                </div>

                <div className="p-4 sm:p-6 overflow-x-auto">
                  <div className="flex flex-col font-mono text-xs sm:text-sm">
                    {/* Line 1 */}
                    <div className="flex gap-4">
                      <span className="w-6 text-right text-zinc-300 dark:text-zinc-700 select-none shrink-0">1</span>
                      <div className="flex flex-wrap gap-x-2">
                        <span className="text-purple-500 font-semibold">const</span>
                        <span className="text-blue-500 font-semibold">experience</span>
                        <span className="text-zinc-400">=</span>
                        <span className="text-zinc-600 dark:text-zinc-300">{"{"}</span>
                      </div>
                    </div>

                    {/* Line 2 */}
                    <div className="flex gap-4">
                      <span className="w-6 text-right text-zinc-300 dark:text-zinc-700 select-none shrink-0">2</span>
                      <div className="pl-4 flex flex-wrap gap-x-2">
                        <span className="text-red-400">company:</span>
                        <span className="text-green-500">"{job.name}"</span>,
                      </div>
                    </div>

                    {/* Line 3 */}
                    <div className="flex gap-4">
                      <span className="w-6 text-right text-zinc-300 dark:text-zinc-700 select-none shrink-0">3</span>
                      <div className="pl-4 flex flex-wrap gap-x-2 items-center">
                        <span className="text-red-400">role:</span>
                        <div className="flex items-center gap-2">
                          {job.logo && (
                            <div className="relative w-4 h-4 rounded-xs overflow-hidden shrink-0">
                              <Image src={job.logo} fill alt={job.name} className="object-cover" />
                            </div>
                          )}
                          <span className="text-green-500">"{job.jobTitle}"</span>,
                        </div>
                      </div>
                    </div>

                    {/* Line 4 */}
                    <div className="flex gap-4">
                      <span className="w-6 text-right text-zinc-300 dark:text-zinc-700 select-none shrink-0">4</span>
                      <div className="pl-4 flex flex-wrap gap-x-2">
                        <span className="text-red-400">period:</span>
                        <span className="text-yellow-500">
                          "{job.customDate ? job.customDate : `${formatDate(job.startDate)} - ${job.endDate ? formatDate(job.endDate) : "Present"}`}"
                        </span>,
                      </div>
                    </div>

                    {/* Line 5 - Description (Wraps) */}
                    <div className="flex gap-4">
                      <span className="w-6 text-right text-zinc-300 dark:text-zinc-700 select-none shrink-0">5</span>
                      <div className="pl-4 flex flex-wrap gap-x-2">
                        <span className="text-red-400">description:</span>
                        <span className="text-zinc-500 dark:text-zinc-400 italic wrap-break-word whitespace-pre-wrap">
                            // {job.description}
                        </span>
                      </div>
                    </div>

                    {/* Line 6 */}
                    <div className="flex gap-4">
                      <span className="w-6 text-right text-zinc-300 dark:text-zinc-700 select-none shrink-0">6</span>
                      <div className="text-zinc-600 dark:text-zinc-300">{"}"}</div>
                    </div>
                  </div>

                  {/* Link Overlay */}
                  <RefLink
                    href={job.url}
                    className="absolute inset-0 z-10 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 rounded-lg"
                  >
                    <span className="sr-only">View {job.name}</span>
                  </RefLink>
                </div>
              </div>
            ))}
          </div>
        </Slide>
      ) : (
        <EmptyState
          icon={<RiBriefcase3Fill />}
          title="Work Experience Not Provided"
          message="We could not find any work experience at the moment. To add one, visit the Sanity studio to start editing the content."
        />
      )}
    </section>
  );
}
