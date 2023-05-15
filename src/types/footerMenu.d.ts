declare module '<FooterMenu>' {
  interface FooterMenuProps {
    fill?: string;
    stroke?: string;
    selected?: boolean;
  }
}

declare module '*.svg' {
  const content: any;
  export default content;
}
