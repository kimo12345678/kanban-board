import React, { useState, useEffect } from "react";
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

  // Load members from localStorage on component mount
  useEffect(() => {
    const savedMembers = localStorage.getItem("members");
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    }
  }, []);

  // Save members to localStorage whenever members state changes
  useEffect(() => {
    if (members.length > 0) {
      localStorage.setItem("members", JSON.stringify(members));
    }
  }, [members]);

  // Add a new member
  const handleAddMember = (member: Omit<Member, "status">) => {
    setMembers([...members, { ...member, status: "Unclaimed" }]);
  };

  // Update member status
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

  // Edit an existing member
  const handleEditMember = (updatedMember: Member) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.email === updatedMember.email ? updatedMember : member
      )
    );
    setEditingMember(null); // Reset editing state
  };

  // Delete a member
  const handleDeleteMember = (email: string) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.email !== email)
    );
  };

  return (
    <div className="bg-blue-100 min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Kanban Board Bookings
      </h1>
      <div className="w-full max-w-8xl flex justify-around">
        <MemberForm
          onAddMember={handleAddMember}
          onEditMember={handleEditMember}
          editingMember={editingMember}
          className="mb-0"
        />
        <KanbanBoard
          members={members}
          onUpdateMemberStatus={handleUpdateMemberStatus}
          onDeleteMember={handleDeleteMember}
          onEditMember={setEditingMember}
        />
      </div>
    </div>
  );
};

export default App;
