import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { FaEdit, FaTrash } from "react-icons/fa";

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
  onDeleteMember: (email: string) => void;
  onEditMember: (member: Member) => void;
}

const statuses: Member["status"][] = [
  "Unclaimed",
  "First Contact",
  "Preparing Work Offer",
  "Send to Therapist",
];

const KanbanCard: React.FC<KanbanCardProps> = ({
  member,
  onDeleteMember,
  onEditMember,
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: member.email,
  });

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditMember(member);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteMember(member.email);
  };

  // Status color mapping
  const statusColors: { [key in Member["status"]]: string } = {
    Unclaimed: "bg-gray-200 text-gray-800",
    "First Contact": "bg-blue-200 text-blue-800",
    "Preparing Work Offer": "bg-yellow-200 text-yellow-800",
    "Send to Therapist": "bg-green-200 text-green-800",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-white p-6 rounded-lg shadow-lg flex flex-col relative transition-all transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out w-[155px] h-[242px]"
    >
      {/* Edit & Delete Icons */}
      <div className="mt-4 flex gap-2 absolute top-1 right-2 pointer-events-auto">
        <button
          onClick={handleEditClick}
          className="text-yellow-500 hover:text-yellow-600 transition duration-200 ease-in-out"
        >
          <FaEdit className="text-xl" />
        </button>
        <button
          onClick={handleDeleteClick}
          className="text-red-500 hover:text-red-600 transition duration-200 ease-in-out"
        >
          <FaTrash className="text-xl" />
        </button>
      </div>

      {/* Age on top-right */}
      <div className="absolute top-14 right-2 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full shadow-md">
        {member.age} yo
      </div>

      {/* Status Badge */}
      <div
        className={`absolute bottom-2 left-2 text-xs px-3 py-1 rounded-full ${
          statusColors[member.status]
        }`}
      >
        {member.status}
      </div>

      {/* Member Information */}
      <div className="flex flex-col  space-y-3">
        <h3 className="font-semibold text-gray-800 text-lg">{member.title}</h3>
        <h4 className="text-gray-800 text-xl">{member.name}</h4>
        <p className="text-gray-600 text-sm">{member.email}</p>
        {/* Mobile Number */}
        <p className="text-gray-600 text-sm">{member.mobileNumber}</p>
      </div>
    </div>
  );
};

export default KanbanCard;
