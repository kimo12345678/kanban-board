// src/components/KanbanBoard.tsx
import React from 'react';

interface Member {
  name: string;
  title: string;
  age: number;
  email: string;
  mobileNumber: string;
  status: 'Unclaimed' | 'First Contact' | 'Preparing Work Offer' | 'Send to Therapist';
}

interface KanbanBoardProps {
  members: Member[];
  onUpdateMemberStatus: (member: Member, newStatus: Member['status']) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ members, onUpdateMemberStatus }) => {
  const columns = ['Unclaimed', 'First Contact', 'Preparing Work Offer', 'Send to Therapist'];

  const handleMoveMember = (member: Member, newStatus: Member['status']) => {
    onUpdateMemberStatus(member, newStatus);
  };

  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {columns.map((column) => (
        <div key={column} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="font-bold mb-2">{column}</h2>
          <div className="flex flex-col gap-2">
            {members
              .filter((member) => member.status === column)
              .map((member) => (
                <div key={member.email} className="p-2 bg-white rounded shadow">
                  <p><strong>Name:</strong> {member.name}</p>
                  <p><strong>Title:</strong> {member.title}</p>
                  <p><strong>Age:</strong> {member.age}</p>
                  <p><strong>Email:</strong> {member.email}</p>
                  <p><strong>Mobile:</strong> {member.mobileNumber}</p>
                  <div className="flex gap-2 mt-2">
                    {columns.map(
                      (status) =>
                        status !== column && (
                          <button
                            key={status}
                            className="text-xs bg-blue-500 text-white rounded px-2"
                            onClick={() => handleMoveMember(member, status as Member['status'])}
                          >
                            Move to {status}
                          </button>
                        )
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
