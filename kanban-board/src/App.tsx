// src/App.tsx
import React, { useState } from 'react';
import MemberForm from './components/MemberForm';

interface Member {
  name: string;
  title: string;
  age: number;
  email: string;
  mobileNumber: string;
}

const App: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const handleAddMember = (member: Member) => {
    setMembers([...members, member]);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Kanban Board Bookings</h1>
      <MemberForm onAddMember={handleAddMember} />
      {/* Placeholder for Kanban board which will be added next */}
      <div className="mt-8">
        {/* Kanban columns will be implemented here */}
      </div>
    </div>
  );
};

export default App;
