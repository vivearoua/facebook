import Image from "next/image";

const SocialButton = ({
  iconSrc,
  alt,
  text,
  variant = "default",
}: {
  iconSrc: string;
  alt: string;
  text: string;
  variant?: "google" | "facebook" | "github" | "default";
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "google":
        return "bg-white text-gray-700 hover:bg-gray-50 border-gray-300";
      case "facebook":
        return "bg-blue-600 text-white hover:bg-blue-700 border-blue-600";
      case "github":
        return "bg-gray-800 text-white hover:bg-gray-900 border-gray-800";
      default:
        return "bg-white/10 text-white hover:bg-white/20 border-white/20";
    }
  };

  return (
    <button
      className={`w-full flex items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg font-medium ${getVariantStyles()}`}
    >
      <div className="relative w-6 h-6 mr-3">
        <Image
          src={iconSrc}
          alt={alt}
          fill
          className="object-contain"
        />
      </div>
      {text}
    </button>
  );
};

export default SocialButton;