"use client";

import { useRef, useLayoutEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function quatFromLookAt(eye: number[], target: number[]): THREE.Quaternion {
    const m = new THREE.Matrix4();
    m.lookAt(
        new THREE.Vector3(eye[0], eye[1], eye[2]),
        new THREE.Vector3(target[0], target[1], target[2]),
        new THREE.Vector3(0, 1, 0)
    );
    return new THREE.Quaternion().setFromRotationMatrix(m);
}

function lerpV(a: number[], b: number[], t: number): THREE.Vector3 {
    return new THREE.Vector3(
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t
    );
}

function ease(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

type KF = { pos: number[]; look: number[] };

/* ── Scroll Distribution ──────────────────────────────────────
   0%  – 10%  : Scene 1   Side silhouette reveal
   10% – 25%  : Scene 2   Exterior orbit (side → rear)
   25% – 32%  : Scene 3   Rear push-in (badge)
   32% – 40%  : Scene 4   Enter cabin (through rear glass)
   40% – 48%  : Scene 5   Steering wheel close-up
   48% – 56%  : Scene 6   Driver POV (full dashboard)
   56% – 64%  : Scene 7   Gear selector & center console
   64% – 72%  : Scene 8   Driver seat & door panel
   72% – 80%  : Scene 9   Panoramic cabin (from rear center)
   80% – 90%  : Scene 10  Sunroof exit (upward, still angled down)
   90% – 100% : Scene 11  Ascend & disappear
   ─────────────────────────────────────────────────────────── */

export default function ScrollController() {
    const { camera, scene } = useThree();
    const progress = useRef(0);

    const K = useMemo((): Record<string, KF> => ({
        // ── EXTERIOR ──
        s1s:  { pos: [-6,    0.8,   0   ], look: [0,    0.8,  0  ] },
        s1e:  { pos: [-5,    0.9,   0   ], look: [0,    0.8,  0  ] },
        s2e:  { pos: [0,     1.2,  -5   ], look: [0,    0.8,  0  ] },
        s3e:  { pos: [0,     1.2,  -2.5 ], look: [0,    0.9,  0  ] },

        // ── ENTER CABIN ── camera passes through rear glass
        s4e:  { pos: [0,     1.05, -0.3 ], look: [0,    0.9,  0.8] },

        // ── STEERING WHEEL CLOSE-UP ── tight shot of the wheel
        s5e:  { pos: [0.25,  0.95,  0.3 ], look: [0,    0.85, 0.8] },

        // ── DRIVER POV ── sitting in seat, full dashboard panorama
        s6e:  { pos: [0.35,  1.05,  0.0 ], look: [0,    0.85, 2.0] },

        // ── GEAR SELECTOR ── looking down at center console
        s7e:  { pos: [0.15,  1.0,   0.15], look: [0,    0.4,  0.5] },

        // ── DRIVER SEAT ── from passenger side looking at seat + door
        s8e:  { pos: [-0.35, 1.05, -0.1 ], look: [0.3,  0.65, 0.2] },

        // ── PANORAMIC CABIN ── wide shot from rear center
        s9e:  { pos: [0,     1.1,  -0.6 ], look: [0,    0.85, 1.2] },

        // ── SUNROOF EXIT ── upward, maintaining downward pitch
        s10e: { pos: [0,     4.0,   0   ], look: [0,    0.3,  0  ] },

        // ── ASCEND ── bird's eye, car lifts
        s11e: { pos: [0,     10,    0   ], look: [0,    0,    0  ] },
    }), []);

    const Q = useMemo(() => {
        const o: Record<string, THREE.Quaternion> = {};
        for (const [k, v] of Object.entries(K)) {
            o[k] = quatFromLookAt(v.pos, v.look);
        }
        return o;
    }, [K]);

    useLayoutEffect(() => {
        camera.position.set(-6, 0.8, 0);
        const st = ScrollTrigger.create({
            trigger: "#scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => { progress.current = self.progress; },
        });

        const handleResize = () => {
            if (camera instanceof THREE.PerspectiveCamera) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            }
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            st.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, [camera]);

    useFrame(() => {
        const p = progress.current;
        const cam = camera as THREE.PerspectiveCamera;

        // Dynamic FOV based on aspect ratio to keep car framed
        const aspect = cam.aspect;
        cam.fov = aspect < 1 ? 60 : 45; // Wider FOV for vertical/mobile screens
        cam.updateProjectionMatrix();

        let pos: THREE.Vector3;
        let quat: THREE.Quaternion;

        if (p <= 0.10) {
            const t = ease(p / 0.10);
            pos = lerpV(K.s1s.pos, K.s1e.pos, t);
            quat = Q.s1s.clone().slerp(Q.s1e, t);

        } else if (p <= 0.25) {
            const t = ease((p - 0.10) / 0.15);
            const angle = (Math.PI / 2) * t;
            const R = 5, h = 0.9 + 0.3 * t;
            const x = -R * Math.cos(angle), z = -R * Math.sin(angle);
            pos = new THREE.Vector3(x, h, z);
            quat = quatFromLookAt([x, h, z], [0, 0.8, 0]);

        } else if (p <= 0.32) {
            const t = ease((p - 0.25) / 0.07);
            pos = lerpV(K.s2e.pos, K.s3e.pos, t);
            quat = Q.s2e.clone().slerp(Q.s3e, t);

        } else if (p <= 0.40) {
            /* Scene 4: Enter Cabin */
            const t = ease((p - 0.32) / 0.08);
            pos = lerpV(K.s3e.pos, K.s4e.pos, t);
            quat = Q.s3e.clone().slerp(Q.s4e, t);

        } else if (p <= 0.48) {
            /* Scene 5: Steering Wheel Close-Up */
            const t = ease((p - 0.40) / 0.08);
            pos = lerpV(K.s4e.pos, K.s5e.pos, t);
            quat = Q.s4e.clone().slerp(Q.s5e, t);

        } else if (p <= 0.56) {
            /* Scene 6: Driver POV — Full Dashboard */
            const t = ease((p - 0.48) / 0.08);
            pos = lerpV(K.s5e.pos, K.s6e.pos, t);
            quat = Q.s5e.clone().slerp(Q.s6e, t);

        } else if (p <= 0.64) {
            /* Scene 7: Gear Selector & Console */
            const t = ease((p - 0.56) / 0.08);
            pos = lerpV(K.s6e.pos, K.s7e.pos, t);
            quat = Q.s6e.clone().slerp(Q.s7e, t);

        } else if (p <= 0.72) {
            /* Scene 8: Driver Seat from Passenger Side */
            const t = ease((p - 0.64) / 0.08);
            pos = lerpV(K.s7e.pos, K.s8e.pos, t);
            quat = Q.s7e.clone().slerp(Q.s8e, t);

        } else if (p <= 0.80) {
            /* Scene 9: Panoramic Cabin */
            const t = ease((p - 0.72) / 0.08);
            pos = lerpV(K.s8e.pos, K.s9e.pos, t);
            quat = Q.s8e.clone().slerp(Q.s9e, t);

        } else if (p <= 0.90) {
            /* Scene 10: Sunroof Exit */
            const t = ease((p - 0.80) / 0.10);
            pos = lerpV(K.s9e.pos, K.s10e.pos, t);
            quat = Q.s9e.clone().slerp(Q.s10e, t);

        } else {
            /* Scene 11: Ascend & Disappear */
            const t = ease(Math.min(1, (p - 0.90) / 0.10));
            pos = lerpV(K.s10e.pos, K.s11e.pos, t);
            quat = Q.s10e.clone().slerp(Q.s11e, t);

            const model = scene.getObjectByName("porsche-model");
            if (model) {
                model.position.y = t > 0.3 ? ((t - 0.3) / 0.7) * 6 : 0;
            }
        }

        if (p <= 0.90) {
            const model = scene.getObjectByName("porsche-model");
            if (model) model.position.y = 0;
        }

        cam.position.copy(pos);
        cam.quaternion.copy(quat);
    });

    return null;
}
