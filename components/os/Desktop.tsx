"use client";

import { useEffect, useState } from "react";

import { APPS } from "@/lib/os/apps";
import { useWindowStore } from "@/lib/os/window-store";
import iconVisibility from "@/content/icons.json";
import type { IconVisibilityContent } from "@/lib/content-types";
import Boot from "./Boot";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import DesktopIcon from "./DesktopIcon";
import SkyBackground from "./SkyBackground";
import Window from "./Window";

const { apps: appVisibility } = iconVisibility as IconVisibilityContent;
const VISIBLE_APPS = APPS.filter((app) => appVisibility[app.id] !== false);

const MENU_BAR_HEIGHT = 32;
const DOCK_CLEARANCE = 96;

function useIconLayerBounds() {
  const [bounds, setBounds] = useState({ width: 1200, height: 700 });

  useEffect(() => {
    function update() {
      setBounds({
        width: window.innerWidth,
        height: window.innerHeight - MENU_BAR_HEIGHT - DOCK_CLEARANCE,
      });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bounds;
}

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const windows = useWindowStore((s) => s.windows);
  const iconBounds = useIconLayerBounds();

  if (!booted) {
    return <Boot onDone={() => setBooted(true)} />;
  }

  const topWindow = windows
    .filter((w) => !w.minimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <SkyBackground />

      <MenuBar activeTitle={topWindow?.title} />

      <div className="absolute inset-0 top-8">
        {VISIBLE_APPS.map((app, index) => (
          <DesktopIcon key={app.id} app={app} index={index} bounds={iconBounds} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 top-8">
        {windows.map((w) => (
          <Window key={w.windowId} instance={w} />
        ))}
      </div>

      <Dock />
    </div>
  );
}
