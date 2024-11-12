import React from "react";
import KanbanCard from "./KanbanCard";

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

interface KanbanBoardProps {
  members: Member[];
  onUpdateMemberStatus: (member: Member, newStatus: Member["status"]) => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (email: string) => void;
}

const statuses: Member["status"][] = [
  "Unclaimed",
  "First Contact",
  "Preparing Work Offer",
  "Send to Therapist",
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  members,
  onUpdateMemberStatus,
  onEditMember,
  onDeleteMember,
}) => {
  return (
    <div className="mt-6 overflow-x-auto max-h-[80vh]">
      <div className="flex gap-4">
        {statuses.map((status) => (
          <div
            key={status}
            className="flex flex-col w-1/4 bg-custom-blue1 rounded-lg shadow-lg p-4 max-h-[40vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-700">{status}</h2>
              <span className="bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                {members.filter((member) => member.status === status).length}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {members
                .filter((member) => member.status === status)
                .map((member) => (
                  <KanbanCard
                    key={member.email}
                    member={member}
                    onUpdateMemberStatus={onUpdateMemberStatus}
                    onDeleteMember={onDeleteMember}
                    onEditMember={onEditMember}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
