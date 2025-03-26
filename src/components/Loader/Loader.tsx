import Lottie from "lottie-react";

interface LoaderProps {
  animationData: object; // Replace 'object' with a more specific type if available
}

const Loader = ({ animationData }: LoaderProps) => {
  return <Lottie animationData={animationData} loop={true} />;
};

export default Loader;
