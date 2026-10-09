"use client";

import { skillsData } from "@/app/data/skills";
import { Slide } from "../../animation/Slide";
import { motion } from "framer-motion";
import { BiCode, BiWrench } from "react-icons/bi";

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <BiCode className="text-blue-500" />,
  "Frameworks & Tools": <BiWrench className="text-purple-500" />,
};

export default function Usage() {
  return (
    <section className="max-w-4xl mt-20 mb-10">
      <Slide delay={0.16}>
        <div className="mb-8">
          <h2 className="text-4xl mb-4 font-bold tracking-tight font-incognito">
            Skills & Usage
          </h2>
          <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
            Tools, technologies, and gadgets I use on a daily basis.
          </p>
        </div>
      </Slide>

      <Slide delay={0.18}>
        <div className="flex flex-col gap-8">
          {skillsData.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1, duration: 0.4 }}
            >
              <h3 className="flex items-center gap-2 text-2xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
                {categoryIcons[section.category] || <BiCode className="text-blue-500" />}
                {section.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {section.items.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.2 + sectionIndex * 0.1 + i * 0.03,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 4px 20px -4px rgba(59, 130, 246, 0.3)"
                    }}
                  >
                    <span className="group relative px-4 py-2 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 rounded-xl text-sm text-zinc-700 dark:text-zinc-300 cursor-default transition-all duration-300 hover:border-blue-500/50 dark:hover:border-blue-500/50 overflow-hidden inline-block">
                    {/* Gradient overlay on hover */}
                    <span className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 font-medium">{item}</span>
                    </span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Slide>
    </section>
  );
}
