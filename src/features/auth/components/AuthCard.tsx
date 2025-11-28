import React from "react";

interface AuthCardProps {
  heading: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthCard({ heading, children, footer }: AuthCardProps) {
  return (
    <div className="w-96 p-4 flex flex-col items-center gap-4">
      <div className="flex flex-col gap-2 text-center">
        <div className="flex justify-center items-center gap-x-2 text-4xl">
          {heading}
        </div>
        {footer ? <div>{footer}</div> : null}
      </div>
      {children}
    </div>
  );
}
