declare module '<SVG>' {
  interface SVGProps {
    fill?: string;
    stroke?: string;
  }
}

declare module '*.svg' {
  const content: any;
  export const ReactComponent: React.FC;
  export default content;
}
