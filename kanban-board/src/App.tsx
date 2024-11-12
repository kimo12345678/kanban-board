// src/App.tsx
import React, { useState } from 'react';
import MemberForm from './components/MemberForm';
import KanbanBoard from './components/KanbanBoard';

interface Member {
  name: string;
  title: string;
  age: number;
  email: string;
  mobileNumber: string;
  status: 'Unclaimed' | 'First Contact' | 'Preparing Work Offer' | 'Send to Therapist';
}

const App: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const handleAddMember = (member: Omit<Member, 'status'>) => {
    setMembers([...members, { ...member, status: 'Unclaimed' }]);
  };

  const handleUpdateMemberStatus = (memberToUpdate: Member, newStatus: Member['status']) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.email === memberToUpdate.email ? { ...member, status: newStatus } : member
      )
    );
  };

  return (
    <div className="bg-blue-100 min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Kanban Board Bookings</h1>
      <div className="w-full max-w-6xl">
        <MemberForm onAddMember={handleAddMember} />
        <KanbanBoard members={members} onUpdateMemberStatus={handleUpdateMemberStatus} />
      </div>
    </div>
  );
};

export default App;
