import { url } from "./getavatar";

const getbanner = (filename: string | undefined) => {
  console.log(filename);
  return filename ? `${url}/assets/userBanners/${filename}` : "/2475176.webp";
};

export default getbanner;
