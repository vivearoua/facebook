import { CurrentUserProvider } from "@/context/ProfileContexts";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <CurrentUserProvider>{children}</CurrentUserProvider>;
};
