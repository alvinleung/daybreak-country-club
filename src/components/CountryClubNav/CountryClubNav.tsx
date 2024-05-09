"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { CountryClubLogo } from "./CountryClubLogo";
import { motion } from "framer-motion";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type Props = {
  onNavExpand: () => void;
  onNavCollapse: () => void;
};

const CountryClubNav = ({ onNavExpand, onNavCollapse }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      onNavExpand();
      return;
    }
    onNavCollapse();
  }, [isExpanded]);

  const containerRef = useRef() as MutableRefObject<HTMLElement>;
  useOnClickOutside([containerRef], () => {
    setIsExpanded(false);
  });

  useEventListener("scroll", () => {
    setIsExpanded(false);
  });

  return (
    <>
      <div className="h-16 border-l border-r mx-12"></div>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-forest-green"
        ref={containerRef}
      >
        <div className="relative mx-4 md:mx-12 h-16 border-l border-r flex flex-row items-center justify-center">
          <CountryClubLogo />
          <div className="absolute right-0 px-4">
            <motion.button
              className="font-cond-sm"
              onTap={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? "Close" : "Menu"}
            </motion.button>
          </div>
        </div>
        <motion.div
          initial={{
            height: 0,
          }}
          animate={{
            height: isExpanded ? "auto" : 0,
          }}
          className="absolute left-0 right-0 z-10 top-[100%] w-full overflow-hidden border-b bg-forest-green"
        >
          <div className="py-8 flex flex-col items-center gap-4 bg-forest-green mx-4 md:mx-12 border-l border-r">
            <a className="font-cond-sm" href="https://www.daybreak.studio">
              Back to studio
            </a>
            <a
              className="font-cond-sm"
              href="https://www.instagram.com/daybreakstudio/"
            >
              Instagram
            </a>
            <a
              className="font-cond-sm"
              href="https://twitter.com/madebydaybreak"
            >
              Twitter
            </a>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default CountryClubNav;
