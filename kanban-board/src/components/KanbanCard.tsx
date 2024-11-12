import React, { useState } from "react";

interface Member {
  name: string;
  title: string;
  age: number;
  email: string;
  mobileNumber: string;
  status:
    | "Unclaimed"
    | "First Contact"
    | "Preparing Work Offer"
    | "Send to Therapist";
}

interface KanbanCardProps {
  member: Member;
  onUpdateMemberStatus: (member: Member, newStatus: Member["status"]) => void;
  onEdit: (member: Member) => void;
  onDelete: (email: string) => void;
}

const statuses: Member["status"][] = [
  "Unclaimed",
  "First Contact",
  "Preparing Work Offer",
  "Send to Therapist",
];

const KanbanCard: React.FC<KanbanCardProps> = ({
  member,
  onUpdateMemberStatus,
  onEdit,
  onDelete,
}) => {
  const handleStatusChange = (newStatus: Member["status"]) => {
    onUpdateMemberStatus(member, newStatus);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
      <h3 className="font-semibold text-gray-800">
        {member.title} {member.name}
      </h3>
      <p className="text-gray-600">{member.email}</p>
      <p className="text-gray-600">{member.mobileNumber}</p>
      <p className="text-gray-600">{member.age} yo</p>
      <div className="mt-4 flex gap-2 flex-wrap">
        {statuses.map(
          (status) =>
            status !== member.status && (
              <button
                key={status}
                className="bg-blue-500 text-white w-24 h-8 text-xs rounded-md hover:bg-blue-600 shadow-sm transition duration-200 ease-in-out flex items-center justify-center"
                onClick={() => handleStatusChange(status)}
              >
                Move to {status}
              </button>
            )
        )}
      </div>
      <div className="mt-2 flex gap-2">
        <button
          className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
          onClick={() => onEdit(member)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
          onClick={() => onDelete(member.email)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default KanbanCard;
