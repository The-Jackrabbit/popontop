import { Layout } from "./Layout";

export const Loader: React.FC = () => (
  <Layout
    title={
      <div
        className="
          bg-neutral-200 w-full h-full animate-pulse
        "
      />
    }
    toggleButton={
      <div
        className="
          bg-neutral-200 w-full h-full animate-pulse
        "
      />
    }
  />
)

export default Loader;
