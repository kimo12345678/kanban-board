import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons from react-icons

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
  onUpdateMemberStatus,
  onDeleteMember,
  onEditMember,
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: member.email,
  });
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drag event from firing
    onEditMember(member);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drag event from firing
    onDeleteMember(member.email);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-white p-6 rounded-lg shadow-md flex flex-col relative hover:shadow-xl transition duration-200 ease-in-out"
    >
      {/* Edit & Delete Icons below age */}
      <div className="mt-4 flex top-1 gap-2 absolute right-2 pointer-events-auto">
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
      <div className="absolute top-14 right-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full shadow-md">
        {member.age} yo
      </div>
      {/* Member Information */}
      <h3 className="font-semibold text-gray-800 text-lg">{member.title}</h3>
      <h4 className="text-gray-800 text-xl mb-2">{member.name}</h4>
      <p className="text-gray-600 text-sm">{member.email}</p>
      <p className="text-gray-600 text-sm">{member.mobileNumber}</p>
    </div>
  );
};

export default KanbanCard;
