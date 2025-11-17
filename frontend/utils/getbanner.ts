import { url } from "./getavatar";

const getbanner = (filename: string | undefined) => {
  console.log(`${url}/assets/userBanners/${filename}`)
  return filename ? `${url}/assets/banners/${filename}` : "/2475176.webp";
};

export default getbanner;
