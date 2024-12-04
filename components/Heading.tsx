type HeadingProps = {
  creating: boolean;
};

const Heading = ({ creating }: HeadingProps) => {
  const text1 = "Tell me what to cook today ? 👨‍🍳";
  const text2 = "Craftix - Your own personal coding assistant";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold ">
        {creating ? text2 : text1}
      </h1>
    </div>
  );
};

export default Heading;
