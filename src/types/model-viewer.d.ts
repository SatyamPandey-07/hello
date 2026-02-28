import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean | string;
          "ar-modes"?: string;
          "camera-controls"?: boolean | string;
          "auto-rotate"?: boolean | string;
          "shadow-intensity"?: string;
          exposure?: string;
          "environment-image"?: string;
          poster?: string;
          loading?: string;
          reveal?: string;
          "ar-scale"?: string;
          "camera-orbit"?: string;
          "min-camera-orbit"?: string;
          "max-camera-orbit"?: string;
          "field-of-view"?: string;
          "interaction-prompt"?: string;
          "ar-placement"?: string;
        },
        HTMLElement
      >;
    }
  }
}
