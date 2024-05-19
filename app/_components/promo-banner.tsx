import Image, { ImageProps } from 'next/image';

const PromoBanner = (props: ImageProps) => {
  return (
    <Image
      {...props}
      height={0}
      width={0}
      className="h-auto w-full"
      sizes="100vw"
      quality={100}
    />
  );
};

export default PromoBanner;
