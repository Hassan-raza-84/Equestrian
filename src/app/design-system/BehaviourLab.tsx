"use client";

import { useState } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Button } from "@/components/ui/Button";
import { useRouteTransition } from "@/components/motion/RouteTransition";
import { LineReveal } from "@/components/motion/LineReveal";

export function BehaviourLab() {
  const { preview } = useRouteTransition();
  const [loading, setLoading] = useState(true);

  const replaySplash = () => {
    try {
      sessionStorage.removeItem("brand-splash");
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event("brand:splash-replay"));
  };

  return (
    <div className="grid gap-16">
      <div>
        <h3 className="font-display text-display-md text-green-900">Splash</h3>
        <p className="mt-3 max-w-xl text-ink-muted">
          Black screen, the mark fades in alone, then everything fades away. Once per session. Click or press any key
          to skip. Never plays with reduced motion.
        </p>
        <div className="mt-6">
          <Button onClick={replaySplash}>Replay splash</Button>
        </div>
      </div>

      <div>
        <h3 className="font-display text-display-md text-green-900">Page transition</h3>
        <p className="mt-3 max-w-xl text-ink-muted">
          The page ghosts to a pale wash with a thin progress line, then lifts. The centre is reserved for the animated
          horse once the artwork is supplied.
        </p>
        <div className="mt-6">
          <Button variant="secondary" onClick={() => preview()}>
            Preview transition
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-display text-display-md text-green-900">Image loading</h3>
        <p className="mt-3 max-w-xl text-ink-muted">
          The mark pulses in a tonal frame until the photograph is ready, then the picture resolves from blur.
        </p>
        <div className="mt-6">
          <Button variant="secondary" onClick={() => setLoading((v) => !v)}>
            {loading ? "Show loaded state" : "Show loading state"}
          </Button>
        </div>
        <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          <MediaFrame alt="" ratio="4 / 5" forceLoading={loading} src="/design-system-sample.svg" />
          <MediaFrame alt="" ratio="4 / 5" caption="Photography to come" />
        </div>
      </div>

      <div>
        <h3 className="font-display text-display-md text-green-900">Line reveal</h3>
        <LineReveal
          as="p"
          text="Text slides up line by line out of a mask, on the hero and key statements only."
          className="mt-3 max-w-2xl font-display text-display-md text-green-700"
        />
      </div>
    </div>
  );
}
