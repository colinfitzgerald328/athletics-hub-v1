import React from "react";

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

export default EmptyState;
