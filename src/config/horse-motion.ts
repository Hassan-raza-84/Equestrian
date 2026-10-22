/**
 * The animated horse for page transitions.
 *
 * Real gaits need real animation artwork. When it is supplied, list each movement
 * here and the transition will rotate through them (and can pick by speed):
 *   { id: "gallop", src: "/horse/gallop.json", speed: "fast" }
 *   { id: "trot",   src: "/horse/trot.json",   speed: "slow" }
 *   { id: "jump",   src: "/horse/jump.json",   speed: "jump" }
 * Until then the list is empty and the transition shows only the pale wash and the
 * progress line.
 */
export type HorseGait = { id: string; src: string; speed: "fast" | "slow" | "jump" };

export const horseGaits: HorseGait[] = [];
