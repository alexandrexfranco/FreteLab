"use client";

import { useEffect, useState } from "react";

interface AdSenseBannerProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  className?: string;
  minHeight: number;
}

export default function AdSenseBanner({
  slot,
  format = "auto",
  className = "",
  minHeight,
}: AdSenseBannerProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setLoaded(true);
    } catch (err) {
      console.error("AdSense initialization warning", err);
    }
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden bg-slate-100/50 border border-slate-200/50 flex items-center justify-center my-6 rounded-xl no-print ${className}`}
      style={{ minHeight: `${minHeight}px` }}
    >
      <span className="absolute top-1 right-2 text-[9px] uppercase tracking-wider text-slate-500 font-bold select-none">
        Publicidade
      </span>
      {/* Real AdSense tag */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", minWidth: "250px", minHeight: `${minHeight}px` }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
