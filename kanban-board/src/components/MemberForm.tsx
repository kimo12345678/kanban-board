import React, { useState, useEffect } from "react";

interface MemberFormProps {
  onAddMember: (member: {
    name: string;
    title: string;
    age: number;
    email: string;
    mobileNumber: string;
  }) => void;
  onEditMember: (updatedMember: any) => void;
  editingMember: any;
  className?: string;
}

const MemberForm: React.FC<MemberFormProps> = ({
  onAddMember,
  onEditMember,
  editingMember,
  className,
}) => {
  const [name, setName] = useState(editingMember ? editingMember.name : "");
  const [title, setTitle] = useState(editingMember ? editingMember.title : "");
  const [age, setAge] = useState(editingMember ? editingMember.age : 0);
  const [email, setEmail] = useState(editingMember ? editingMember.email : "");
  const [mobileNumber, setMobileNumber] = useState(
    editingMember ? editingMember.mobileNumber : ""
  );
  const [errors, setErrors] = useState({
    name: "",
    title: "",
    age: "",
    email: "",
    mobileNumber: "",
  });

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name);
      setTitle(editingMember.title);
      setAge(editingMember.age);
      setEmail(editingMember.email);
      setMobileNumber(editingMember.mobileNumber);
    }
  }, [editingMember]);

  const validateForm = () => {
    const newErrors = {
      name: "",
      title: "",
      age: "",
      email: "",
      mobileNumber: "",
    };

    let isValid = true;

    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!title) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!age || age <= 0) {
      newErrors.age = "Age must be a positive number";
      isValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }
    if (!mobileNumber || mobileNumber.length < 10) {
      newErrors.mobileNumber = "Mobile number must be at least 10 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const newMember = { name, title, age, email, mobileNumber };
      if (editingMember) {
        onEditMember({ ...editingMember, ...newMember });
      } else {
        onAddMember(newMember);
      }
      setName("");
      setTitle("");
      setAge(0);
      setEmail("");
      setMobileNumber("");
      setErrors({
        name: "",
        title: "",
        age: "",
        email: "",
        mobileNumber: "",
      });
    }
  };

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-0 mt-8"
      >
        <div className="flex flex-col gap-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`p-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Enter full name (e.g., John Doe)
            </p>
          </div>

          {/* Title Field */}
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`p-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Enter the member's job title (e.g., Developer)
            </p>
          </div>

          {/* Age Field */}
          <div>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className={`p-2 border ${
                errors.age ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Enter the member's age (must be a positive number)
            </p>
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Enter a valid email (e.g., email@example.com)
            </p>
          </div>

          {/* Mobile Number Field */}
          <div>
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className={`p-2 border ${
                errors.mobileNumber ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Enter a valid mobile number (at least 10 digits)
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {editingMember ? "Edit Member" : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
