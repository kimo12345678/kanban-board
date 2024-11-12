import React, { useState } from "react";
import MemberForm from "./components/MemberForm";
import KanbanBoard from "./components/KanbanBoard";

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

const App: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const handleAddMember = (member: Omit<Member, "status">) => {
    setMembers([...members, { ...member, status: "Unclaimed" }]);
  };

  const handleUpdateMemberStatus = (
    memberToUpdate: Member,
    newStatus: Member["status"]
  ) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.email === memberToUpdate.email
          ? { ...member, status: newStatus }
          : member
      )
    );
  };

  const handleEditMember = (updatedMember: Member) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.email === updatedMember.email ? updatedMember : member
      )
    );
    setEditingMember(null); // Exit edit mode
  };

  const handleDeleteMember = (email: string) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.email !== email)
    );
  };

  return (
    <div className="bg-[#d3e5ed] min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Kanban Board Bookings
      </h1>
      <div className="w-full max-w-8xl flex justify-around">
        <MemberForm
          onAddMember={handleAddMember}
          onEditMember={handleEditMember}
          editingMember={editingMember}
        />
        <KanbanBoard
          members={members}
          onUpdateMemberStatus={handleUpdateMemberStatus}
          onEditMember={(member) => setEditingMember(member)}
          onDeleteMember={handleDeleteMember}
        />
      </div>
    </div>
  );
};

export default App;
