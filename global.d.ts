declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
declare module "swiper/css/scrollbar";

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "@/app/globals.scss" {
  const content: string;
  export default content;
}

declare global {
  interface IProduct {
    uuid: string;
    name: string;
    description: string;
    type: string;
    image: string;
    features: string[];
  }
}

export {};
