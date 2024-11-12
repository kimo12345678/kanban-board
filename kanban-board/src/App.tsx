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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Kanban Board Bookings</h1>
      <MemberForm onAddMember={handleAddMember} />
      <KanbanBoard members={members} onUpdateMemberStatus={handleUpdateMemberStatus} />
    </div>
  );
};

export default App;
