/**
 * Camera keyframe positions and look-at targets for scroll-based animation
 * Each scene is mapped to a scroll progress percentage
 */

export type CameraKeyframe = {
  pos: [number, number, number];
  look: [number, number, number];
};

export const CAMERA_KEYFRAMES: Record<string, CameraKeyframe> = {
  // ── EXTERIOR SCENES ──
  s1s:  { pos: [-6,    0.8,   0   ], look: [0,    0.8,  0  ] }, // Side silhouette start
  s1e:  { pos: [-5,    0.9,   0   ], look: [0,    0.8,  0  ] }, // Side silhouette end
  s2e:  { pos: [0,     1.2,  -5   ], look: [0,    0.8,  0  ] }, // Orbit rear
  s3e:  { pos: [0,     1.2,  -2.5 ], look: [0,    0.9,  0  ] }, // Rear push-in

  // ── INTERIOR ENTRY ──
  s4e:  { pos: [0,     1.05, -0.3 ], look: [0,    0.9,  0.8] }, // Pass through rear glass

  // ── INTERIOR DETAILS ──
  s5e:  { pos: [0.25,  0.95,  0.3 ], look: [0,    0.85, 0.8] }, // Steering wheel
  s6e:  { pos: [0.35,  1.05,  0.0 ], look: [0,    0.85, 2.0] }, // Driver POV dashboard
  s7e:  { pos: [0.15,  1.0,   0.15], look: [0,    0.4,  0.5] }, // Gear selector
  s8e:  { pos: [-0.35, 1.05, -0.1 ], look: [0.3,  0.65, 0.2] }, // Driver seat
  s9e:  { pos: [0,     1.1,  -0.6 ], look: [0,    0.85, 1.2] }, // Panoramic cabin

  // ── EXIT & ASCEND ──
  s10e: { pos: [0,     4.0,   0   ], look: [0,    0.3,  0  ] }, // Sunroof exit
  s11e: { pos: [0,     10,    0   ], look: [0,    0,    0  ] }, // Bird's eye ascend
};

export const SCROLL_SCENES = [
  { id: 's1', start: 0,    end: 0.10, label: 'Side Silhouette' },
  { id: 's2', start: 0.10, end: 0.25, label: 'Exterior Orbit' },
  { id: 's3', start: 0.25, end: 0.32, label: 'Rear Badge' },
  { id: 's4', start: 0.32, end: 0.40, label: 'Enter Cabin' },
  { id: 's5', start: 0.40, end: 0.48, label: 'Steering Wheel' },
  { id: 's6', start: 0.48, end: 0.56, label: 'Driver POV' },
  { id: 's7', start: 0.56, end: 0.64, label: 'Gear Selector' },
  { id: 's8', start: 0.64, end: 0.72, label: 'Driver Seat' },
  { id: 's9', start: 0.72, end: 0.80, label: 'Panoramic Cabin' },
  { id: 's10', start: 0.80, end: 0.90, label: 'Sunroof Exit' },
  { id: 's11', start: 0.90, end: 1.00, label: 'Ascend' },
] as const;
