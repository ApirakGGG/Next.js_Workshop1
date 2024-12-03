import React from "react";

type HeaderProps = {
  name: string;
};
const Header = ({ name }: HeaderProps) => {
  return <h1 className="text-2xl fomt-font-font-extrabold text-slate-700">{name}</h1>;
};

export default Header;
