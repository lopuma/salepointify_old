import { Oval, ThreeDots } from "react-loader-spinner";

const defaultValues = {
  height: 20,
  width: 20,
  color: "white",
  secondaryColor: "black",
};

const mergeWithDefaults = (values) => {
  return { ...defaultValues, ...values };
};

export const LoaderOval = (props) => {
  const { width, height, color, secondaryColor } = mergeWithDefaults(props);

  return (
    <Oval
      height={height}
      width={width}
      color={color}
      visible={true}
      ariaLabel="loading-indicator"
      secondaryColor={secondaryColor}
      strokeWidth={3}
      strokeWidthSecondary={3}
    />
  );
};

export const LoaderThreeDots = (props) => {
  const { width, height, color, secondaryColor } = mergeWithDefaults(props);

  return (
    <ThreeDots
      height={height}
      width={width}
      color={color}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};
