// src/components/KanbanCard.tsx
import React from 'react';

interface Member {
  name: string;
  title: string;
  age: number;
  email: string;
  mobileNumber: string;
  status: 'Unclaimed' | 'First Contact' | 'Preparing Work Offer' | 'Send to Therapist';
}

interface KanbanCardProps {
  member: Member;
  onUpdateMemberStatus: (member: Member, newStatus: Member['status']) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ member }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
      <h3 className="font-semibold text-gray-800">
        {member.title} {member.name}
      </h3>
      <p className="text-gray-600">{member.email}</p>
      <p className="text-gray-600">{member.mobileNumber}</p>
      <p className="text-gray-600">{member.age} yo</p>
    </div>
  );
};

export default KanbanCard;
