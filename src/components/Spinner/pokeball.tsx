import Image from "next/image";

const PokeballSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin">
        <Image
          src="/pokeball.png"
          alt="Pokeball"
          width={45}
          height={45}
          priority={true}
        />
      </div>
    </div>
  );
};

export default PokeballSpinner;
