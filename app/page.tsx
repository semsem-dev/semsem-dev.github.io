import { profileData } from "@/app/data/profile";
import type { ProfileType } from "@/types";
import Job from "./components/pages/Job";
import AgenticEngineering from "./components/pages/AgenticEngineering";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import ContributionGraph from "./components/pages/GithubCalendarComponent";
import Usage from "./components/pages/Usage";
import Testimonials from "./components/pages/Testimonials";
import Certifications from "./components/pages/Certifications";
import WorldMap from "./components/pages/WorldMap";
import Image from "next/image";
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi";
import RefLink from "./components/shared/RefLink";
import TypewriterText from "./components/shared/TypewriterText";

export default async function Home() {
  const profile: ProfileType = profileData;

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <div key={profile?._id}>
        <section className="relative grid lg:grid-cols-custom grid-cols-1 gap-x-6 justify-items-center mb-16">
          <div className="order-2 lg:order-0">
            <Slide>
              <h1 className="font-incognito font-semibold tracking-tight sm:text-5xl text-3xl lg:leading-tight basis-1/2 mb-8">
                I&apos;m Hassan Elseoudy. I live in Berlin, Germany, where I build the future.
              </h1>

              <div className="relative group">
                {/* Code Editor Style Background */}
                <div className="absolute -inset-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 border border-zinc-200 dark:border-zinc-700/50" />

                {/* IDE-like header decoration on hover */}
                <div className="absolute -top-3 left-0 px-2 py-0.5 rounded-t-md bg-zinc-100 dark:bg-zinc-800 border-t border-x border-zinc-200 dark:border-zinc-700/50 text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
                  bio.md
                </div>

                <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed whitespace-pre-line font-mono text-sm sm:text-base">
                  {profile?.fullBio ? (
                    <TypewriterText text={profile.fullBio} />
                  ) : (
                    "Your bio information will show up here"
                  )}
                </div>
              </div>
            </Slide>
            <Slide delay={0.1}>
              <Social type="social" />
            </Slide>
          </div>

          <aside className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-0 mb-12">
            <Slide delay={0.1}>
              <div className="sticky top-10">
                {profile?.profileImage.image ? (
                  <Image
                    className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top"
                    src={profile?.profileImage.image}
                    width={400}
                    height={400}
                    quality={100}
                    alt={profile?.profileImage.alt}
                    priority
                  />
                ) : (
                  <div className="h-96 w-[400px] bg-zinc-500 mb-4"></div>
                )}

                <div className="flex flex-col text-center gap-y-4">
                  <div className="flex items-center gap-x-3">
                    <a
                      href={profile?.resumeURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center text-center gap-x-2 basis-[90%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-lg font-incognito font-semibold"
                    >
                      View Résumé <BiLinkExternal className="text-base" />
                    </a>
                    <a
                      href={`${profile?.resumeURL}`}
                      className="flex items-center justify-center text-center dark:text-primary-color text-secondary-color hover:underline basis-[10%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-3 text-lg"
                      title="Download Resume"
                    >
                      <BiSolidDownload
                        className="text-lg"
                        aria-label="Download Resume"
                      />
                    </a>
                  </div>

                  <a
                    href={`mailto:${profile?.email}`}
                    className="flex items-center gap-x-2 hover:text-primary-color"
                  >
                    <BiEnvelope className="text-lg" />
                    {profile?.email ?? "Email address no available"}
                  </a>
                </div>
              </div>
            </Slide>
          </aside>
        </section>

        {/* World Map Section */}
        <WorldMap />

        {/* Work Experience */}
        <Job />

        {/* AI & Agentic Engineering */}
        <AgenticEngineering />

        {/* GitHub Contributions */}
        <ContributionGraph />

        {/* Skills / Usage section */}
        <Usage />

        {/* Certifications & Languages */}
        <Certifications />

        {/* Testimonials */}
        <Testimonials />
      </div>
    </main>
  );
}
