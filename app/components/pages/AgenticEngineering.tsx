"use client";

import {
  aiHighlightsData,
  agenticPracticesData,
  type AiHighlightType,
} from "@/app/data/ai";
import { Slide } from "../../animation/Slide";
import { motion } from "framer-motion";
import {
  BiBot,
  BiBrain,
  BiChalkboard,
  BiData,
  BiMicrophone,
  BiNetworkChart,
  BiTrophy,
} from "react-icons/bi";

const icons: Record<AiHighlightType["icon"], React.ReactNode> = {
  microphone: <BiMicrophone className="text-purple-500" />,
  chalkboard: <BiChalkboard className="text-blue-500" />,
  trophy: <BiTrophy className="text-yellow-500" />,
  bot: <BiBot className="text-green-500" />,
  brain: <BiBrain className="text-pink-500" />,
  data: <BiData className="text-cyan-500" />,
};

export default function AgenticEngineering() {
  return (
    <section className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            AI & Agentic Engineering
          </h2>
          <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl">
            How I build with AI agents, teach other engineers to do the same,
            and ship AI features to production.
          </p>
        </div>
      </Slide>

      <Slide delay={0.18}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          {aiHighlightsData.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className="code-block group h-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300">
                <div className="code-header justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <span className="ml-2 text-zinc-400">{item._id}.agent</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-normal uppercase tracking-wide">
                    {item.kind}
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex flex-col gap-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                    <span className="text-xl">{icons[item.icon]}</span>
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {item.context}
                  </p>
                  <p className="text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Slide>

      <Slide delay={0.2}>
        <div className="mt-12">
          <h3 className="flex items-center gap-2 text-2xl font-semibold mb-6 text-zinc-800 dark:text-zinc-100">
            <BiNetworkChart className="text-blue-500" />
            How I work with agents
          </h3>
          <div className="flex flex-wrap gap-3">
            {agenticPracticesData.map((practice) => (
              <span
                key={practice}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-blue-500/50 transition-colors duration-300"
              >
                {practice}
              </span>
            ))}
          </div>
        </div>
      </Slide>
    </section>
  );
}
