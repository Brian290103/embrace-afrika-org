import React from "react";

interface SmallTitleProps {
  title: string;
}

const SmallTitle: React.FC<SmallTitleProps> = ({ title }) => {
  return (
    <div>
      <h1 className="font-heading1 text-xl font-semibold uppercase tracking-wider">
        {title}
      </h1>
    </div>
  );
};

export default SmallTitle;
