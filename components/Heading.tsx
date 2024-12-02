type HeadingProps = {
  showSubHeading?: boolean;
};

const Heading = ({ showSubHeading }: HeadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold ">Craftix</h1>
      {showSubHeading && (
        <h2 className="text-lg font-light text-slate-500 mb-4 max-w-[1000px] italic ">
          Craftix is a code editor that allows you to create and edit code
          files. It is a powerful tool for developers, designers, and anyone who
          needs to work with code.
        </h2>
      )}
    </div>
  );
};

export default Heading;
