import React, { useState, useEffect } from "react";

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

interface MemberFormProps {
  onAddMember: (member: Omit<Member, "status">) => void;
  onEditMember: (member: Member) => void;
  editingMember: Member | null;
  className?: string;
}

const MemberForm: React.FC<MemberFormProps> = ({
  onAddMember,
  onEditMember,
  editingMember,
  className,
}) => {
  const [name, setName] = useState(editingMember?.name || "");
  const [title, setTitle] = useState(editingMember?.title || "");
  const [age, setAge] = useState(editingMember?.age || 0);
  const [email, setEmail] = useState(editingMember?.email || "");
  const [mobileNumber, setMobileNumber] = useState(
    editingMember?.mobileNumber || ""
  );

  // Update form fields when `editingMember` changes
  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name);
      setTitle(editingMember.title);
      setAge(editingMember.age);
      setEmail(editingMember.email);
      setMobileNumber(editingMember.mobileNumber);
    } else {
      resetForm(); // Clear the form if there's no editing member
    }
  }, [editingMember]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && title && age && email && mobileNumber) {
      const memberData = { name, title, age, email, mobileNumber };
      if (editingMember) {
        // Update existing member
        onEditMember({ ...memberData, status: editingMember.status });
      } else {
        // Add new member
        onAddMember(memberData);
      }
      resetForm(); // Clear the form after submit
    }
  };

  const resetForm = () => {
    setName("");
    setTitle("");
    setAge(0);
    setEmail("");
    setMobileNumber("");
  };

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-0 mt-8"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {editingMember ? "Update Member" : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
