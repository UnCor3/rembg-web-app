import { FC } from "react";
import { createPortal } from "react-dom";

const DropZonePortal: FC<{ children: React.ReactNode }> = ({ children }) => {
  return createPortal(children, document.body);
};

export default DropZonePortal;
