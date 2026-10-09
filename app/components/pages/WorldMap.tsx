"use client";

import { visitedCountries } from "@/app/data/travel";
import { Slide } from "../../animation/Slide";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { BiWorld } from "react-icons/bi";
import { FaPlane, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

// Region mapping
const countryRegions: Record<string, string> = {
    fr: "Europe", pt: "Europe", es: "Europe", de: "Europe", it: "Europe",
    mt: "Europe", gr: "Europe", hu: "Europe", pl: "Europe", se: "Europe",
    dk: "Europe", nl: "Europe", cy: "Europe", al: "Europe", mk: "Europe",
    cz: "Europe", eg: "Africa", ru: "Europe/Asia", tr: "Europe/Asia",
    sa: "Middle East", us: "North America",
};

// Animation variants for staggered children
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3,
        }
    }
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.9,
        rotateX: -15
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 0.8
        }
    }
};

const statCardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.15,
            type: "spring",
            stiffness: 80,
            damping: 12
        }
    })
};

const filterPillVariants: Variants = {
    idle: { scale: 1 },
    hover: {
        scale: 1.08,
        transition: { type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.95 }
};

// Number counter animation component
function AnimatedNumber({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(ref as React.RefObject<Element>, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 1500;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setDisplayValue(value);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return <span ref={ref}>{displayValue}</span>;
}

export default function WorldMap() {
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [showScrollHint, setShowScrollHint] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: "-100px" });

    // Calculate regions visited
    const regions = visitedCountries.reduce((acc, country) => {
        const region = countryRegions[country.code];
        if (region) acc.add(region);
        return acc;
    }, new Set<string>());

    const filteredCountries = selectedRegion
        ? visitedCountries.filter(c => countryRegions[c.code] === selectedRegion)
        : visitedCountries;

    const worldPercentage = Math.round((visitedCountries.length / 195) * 100);

    // Check scroll position for horizontal scroll hints
    const checkScroll = () => {
        if (gridRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    // Hide scroll hint after user scrolls
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollHint(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth horizontal scroll
    const scrollGrid = (direction: 'left' | 'right') => {
        if (gridRef.current) {
            const scrollAmount = 300;
            gridRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="mt-16 relative" ref={sectionRef}>
            <Slide delay={0.16}>
                <div className="mb-8 font-mono">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="text-xl sm:text-2xl mb-4 font-bold tracking-tight flex items-center gap-3 text-zinc-700 dark:text-zinc-200">
                        <span className="text-zinc-400 dark:text-zinc-600 mr-2">//</span>
                        <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <BiWorld className="text-blue-500" />
                        </motion.span>
                        Travel Adventures
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="text-sm dark:text-zinc-400 text-zinc-600 max-w-2xl pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 ml-3">
                        <span className="opacity-50 mr-2">/*</span>
                        Exploring the world, one country at a time.
                        <span className="opacity-50 ml-2">*/</span>
                        </div>
                    </motion.div>
                </div>
            </Slide>

            <Slide delay={0.18}>
                <div className="relative rounded-2xl dark:bg-zinc-800/30 bg-zinc-50 border dark:border-zinc-700/50 border-zinc-200 p-4 sm:p-6 overflow-hidden">
                    {/* Animated decorative background elements */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 20, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
                    </motion.div>
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            x: [0, -20, 0],
                            y: [0, 20, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-linear-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-3xl" />
                    </motion.div>

                    {/* Stats Cards with animated counters */}
                    {/* Stats Cards as Code Variables */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 font-mono">
                        {[
                            {
                                label: "visitedCountries",
                                value: visitedCountries.length,
                                color: "text-blue-500",
                                type: "number"
                            },
                            {
                                label: "regionsExplored",
                                value: regions.size,
                                color: "text-purple-500",
                                type: "number"
                            },
                            {
                                label: "worldExplored",
                                value: worldPercentage,
                                isPercentage: true,
                                color: "text-emerald-500",
                                type: "string"
                            }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                custom={i}
                                variants={statCardVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            >
                                <div className="relative p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 overflow-hidden">
                                <div className="text-xs text-zinc-400 mb-1">const</div>
                                <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 break-all">
                                    {stat.label} <span className="text-purple-400">=</span>
                                </div>
                                <div className={`text-xl font-bold ${stat.color} mt-1`}>
                                    {stat.type === "string" && <span className="text-yellow-500">"</span>}
                                    <AnimatedNumber value={stat.value} />
                                    {stat.isPercentage && "%"}
                                    {stat.type === "string" && <span className="text-yellow-500">"</span>}
                                    <span className="text-zinc-500">;</span>
                                </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Region filter pills as Code Array */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex flex-wrap gap-2 mb-6 font-mono items-center">
                        <span className="text-zinc-500 mr-2">const regions = [</span>

                        <motion.div
                            variants={filterPillVariants}
                            initial="idle"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <button
                                onClick={() => setSelectedRegion(null)}
                                className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${selectedRegion === null
                                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border border-transparent"
                                    }`}
                            >
                                "All"
                            </button>
                        </motion.div>
                        <span className="text-zinc-400">,</span>

                        {Array.from(regions).map((region, index) => {
                            return (
                                <div key={region} className="flex items-center">
                                    <motion.div
                                        variants={filterPillVariants}
                                        initial="idle"
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <button
                                            onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
                                            className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${selectedRegion === region
                                                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30"
                                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border border-transparent"
                                                }`}
                                        >
                                            "{region}"
                                        </button>
                                    </motion.div>
                                    {index < regions.size - 1 && <span className="text-zinc-400 ml-2">,</span>}
                                </div>
                            );
                        })}
                        <span className="text-zinc-500 ml-2">];</span>
                        </div>
                    </motion.div>

                    {/* Horizontal scroll buttons for mobile */}
                    <div className="relative">
                        <AnimatePresence>
                            {canScrollLeft && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                >
                                    <button
                                        onClick={() => scrollGrid('left')}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xs shadow-lg border dark:border-zinc-700 border-zinc-200 sm:hidden"
                                    >
                                        <FaChevronLeft className="text-zinc-600 dark:text-zinc-300" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {canScrollRight && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                >
                                    <button
                                        onClick={() => scrollGrid('right')}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xs shadow-lg border dark:border-zinc-700 border-zinc-200 sm:hidden"
                                    >
                                        <FaChevronRight className="text-zinc-600 dark:text-zinc-300" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>


                        {/* Country Cards Grid as Code Objects */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            <div
                                ref={gridRef}
                                onScroll={checkScroll}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scroll-smooth font-mono"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                            <AnimatePresence mode="popLayout">
                                {filteredCountries.map((country) => {
                                    const region = countryRegions[country.code];
                                    return (
                                        <motion.div
                                            key={country.code}
                                            layout
                                            variants={cardVariants}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            whileHover={{ y: -5 }}
                                        >
                                            <div
                                                onMouseEnter={() => setHoveredCountry(country.name)}
                                                onMouseLeave={() => setHoveredCountry(null)}
                                                className="group relative flex flex-col p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                                            >
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="relative w-5 h-3.5 rounded-[2px] overflow-hidden shadow-xs">
                                                    <Image
                                                        src={`https://flagcdn.com/w40/${country.code}.png`}
                                                        alt={country.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="20px"
                                                    />
                                                </div>
                                                <span className="text-[10px] text-zinc-400">{country.code.toUpperCase()}</span>
                                            </div>

                                            <div className="text-xs text-zinc-700 dark:text-zinc-300 font-medium truncate mb-1">
                                                {country.name}
                                            </div>

                                            <div className="flex items-center text-[9px] text-zinc-500">
                                                <span className="text-purple-400 mr-1">region:</span>
                                                <span className="truncate">"{region}"</span>
                                            </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>

                    {/* Empty state */}
                    <AnimatePresence>
                        {filteredCountries.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <div className="flex flex-col items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <FaPlane className="text-4xl mb-4 opacity-50" />
                                </motion.div>
                                <p>No countries visited in this region yet.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Slide>

            {/* Enhanced Scroll Indicator Animation */}
            <AnimatePresence>
                {showScrollHint && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 pointer-events-none">
                        <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xs">
                            Scroll to explore
                            </span>
                        </motion.span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "easeInOut"
                            }}
                        >
                            <div className="p-2 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xs border border-zinc-200/50 dark:border-zinc-700/50">
                            <motion.div
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <FaChevronDown className="text-blue-500 dark:text-blue-400" />
                            </motion.div>
                            </div>
                        </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
