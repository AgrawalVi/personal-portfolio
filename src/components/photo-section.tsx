"use client";
import React from 'react';
import { HeroParallax } from "@/components/ui/hero-parallax";

export function ParallaxSection() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Agriculture Hall",
    link: "/photography",
    thumbnail:
      "/agriculture-hall.jpg",
  },
  {
    title: "Golfing",
    link: "/photography",
    thumbnail:
      "/azeem-golf.jpg",
  },
  {
    title: "Aspen, CO",
    link: "/photography",
    thumbnail:
      "/bull-run-aspen.jpg",
  },
  {
    title: "My snowboard :)",
    link: "/photography",
    thumbnail:
      "/bull-run-snowboard.jpg",
  },
  {
    title: "Engineering Hall",
    link: "/photography",
    thumbnail:
      "/engineering-hall.jpg",
  },
  {
    title: "My dad",
    link: "/photography",
    thumbnail:
      "/father.jpg",
  },
  {
    title: "Kinkaku-ji, Kyoto",
    link: "/photography",
    thumbnail:
      "/kinkaku-ji.jpg",
  },
  {
    title: "Snowy Car",
    link: "/photography",
    thumbnail:
      "/snowy-car.jpg",
  },
  {
    title: "Milwaukee River Bridge",
    link: "/photography",
    thumbnail:
      "/milwaukee-river-bridge.jpg",
  },
  {
    title: "Pyramid Peak, CO",
    link: "/photography",
    thumbnail:
      "/pyramid-peak.jpg",
  },
  {
    title: "Milwaukee Cold Storage",
    link: "/photography",
    thumbnail:
      "/milwaukee-cold-storage.jpg",
  },
  {
    title: "Udaipur, India",
    link: "/photography",
    thumbnail:
      "/udaivillas.jpg",
  },
  {
    title: "Ninnaji Shiroshoin, Kyoto",
    link: "/photography",
    thumbnail:
      "/ninnaji-shiroshoin.jpg",
  },
  {
    title: "Madison Capitol Building",
    link: "/photography",
    thumbnail:
      "/madison-capitol-building.jpg",
  },
  {
    title: "//Agriculture Hall",
    link: "https://vishrut.tech/images",
    thumbnail:
      "/../assets/images/parallax-section/agriculture-hall",
  },
];
