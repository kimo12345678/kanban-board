// src/components/MemberForm.tsx
import React, { useState } from 'react';

interface MemberFormProps {
  onAddMember: (member: Member) => void;
}

interface Member {
  name: string;
  title: string;
  age: number;
  email: string;
  mobileNumber: string;
}

const MemberForm: React.FC<MemberFormProps> = ({ onAddMember }) => {
  const [formData, setFormData] = useState<Member>({
    name: '',
    title: '',
    age: 0,
    email: '',
    mobileNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMember(formData);
    setFormData({ name: '', title: '', age: 0, email: '', mobileNumber: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="p-2 border rounded"
        required
      />
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="p-2 border rounded"
        required
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        className="p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-2 border rounded"
        required
      />
      <input
        type="text"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
        placeholder="Mobile Number"
        className="p-2 border rounded"
        required
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add Member</button>
    </form>
  );
};

export default MemberForm;
