"use client";

import { testimonialsData } from "@/app/data/testimonials";
import { Slide } from "../../animation/Slide";
import { motion } from "framer-motion";
import { BiSolidQuoteAltLeft, BiLinkExternal } from "react-icons/bi";

const LINKEDIN_RECOMMENDATIONS_URL: string = "https://www.linkedin.com/in/semsem-dev/details/recommendations/";

export default function Testimonials() {
    return (
        <section className="mt-32">
            <Slide delay={0.16}>
                <div className="mb-16">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
                                What People Say
                            </h2>
                            <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl">
                                Recommendations from colleagues, managers, and teammates I&apos;ve had the pleasure of working with.
                            </p>
                        </div>
                        <a
                            href={LINKEDIN_RECOMMENDATIONS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 hover:underline transition-colors"
                        >
                            View all on LinkedIn <BiLinkExternal />
                        </a>
                    </div>
                </div>
            </Slide>

            <Slide delay={0.18}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonialsData.slice(0, 6).map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                            }}
                        >
                            <a
                                href={LINKEDIN_RECOMMENDATIONS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative p-6 rounded-2xl dark:bg-zinc-800/50 bg-zinc-50 border dark:border-zinc-700/50 border-zinc-200 backdrop-blur-xs transition-all duration-300 group cursor-pointer block"
                            >
                            <BiSolidQuoteAltLeft className="absolute top-4 right-4 text-3xl dark:text-zinc-700 text-zinc-300 group-hover:text-blue-500/50 transition-colors duration-300" />

                            <div className="mb-4">
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                    {testimonial.name}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {testimonial.role}
                                    {testimonial.company && ` @ ${testimonial.company}`}
                                </p>
                            </div>

                            <p className="text-sm dark:text-zinc-300 text-zinc-600 leading-relaxed line-clamp-4">
                                &quot;{testimonial.text}&quot;
                            </p>

                            <div className="mt-4 pt-4 border-t dark:border-zinc-700/50 border-zinc-200 flex justify-between items-center">
                                <span className="text-xs text-zinc-400">
                                    {testimonial.date}
                                </span>
                                <span className="text-xs dark:text-zinc-500 text-zinc-400 italic">
                                    {testimonial.relationship}
                                </span>
                            </div>

                            {/* Hover indicator */}
                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <BiLinkExternal className="text-blue-500" />
                            </div>
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Show more indicator */}
                {testimonialsData.length > 6 && (
                    <div className="mt-8 text-center">
                        <a
                            href={LINKEDIN_RECOMMENDATIONS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-500 transition-colors"
                        >
                            +{testimonialsData.length - 6} more recommendations on{" "}
                            <span className="text-blue-500 hover:underline flex items-center gap-1">
                                LinkedIn <BiLinkExternal />
                            </span>
                        </a>
                    </div>
                )}

                {/* Mobile link */}
                <div className="mt-6 sm:hidden text-center">
                    <a
                        href={LINKEDIN_RECOMMENDATIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 hover:underline transition-colors"
                    >
                        View all on LinkedIn <BiLinkExternal />
                    </a>
                </div>
            </Slide>
        </section>
    );
}
