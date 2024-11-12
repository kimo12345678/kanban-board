import React from "react";

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
  const handleStatusChange = (newStatus: Member["status"]) => {
    onUpdateMemberStatus(member, newStatus);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col relative hover:shadow-xl transition duration-200 ease-in-out">
      {/* Age on top-right */}
      <div className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full shadow-md">
        {member.age} yo
      </div>

      {/* Member Information */}
      <h3 className="font-semibold text-gray-800 text-lg">{member.title}</h3>
      <h4 className="text-gray-800 text-xl mb-2">{member.name}</h4>
      <p className="text-gray-600 text-sm">{member.email}</p>
      <p className="text-gray-600 text-sm">{member.mobileNumber}</p>

      {/* Status Change Buttons */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {statuses.map(
          (status) =>
            status !== member.status && (
              <button
                key={status}
                className="bg-blue-500 text-white w-28 h-10 text-xs rounded-md hover:bg-blue-600 shadow-sm transition duration-200 ease-in-out flex items-center justify-center"
                onClick={() => handleStatusChange(status)}
              >
                Move to {status}
              </button>
            )
        )}
      </div>

      {/* Edit & Delete Buttons */}
      <div className="mt-4 flex gap-2 justify-between">
        <button
          className="bg-yellow-500 text-white w-28 h-10 text-xs rounded-md hover:bg-yellow-600 shadow-sm transition duration-200 ease-in-out"
          onClick={() => onEditMember(member)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white w-28 h-10 text-xs rounded-md hover:bg-red-600 shadow-sm transition duration-200 ease-in-out"
          onClick={() => onDeleteMember(member.email)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default KanbanCard;
