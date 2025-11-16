import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import handleBeginDeleteSkill from "@/api/handleDeleteSkill";
import handleBeginAddSkill from "@/api/handleAddSkill";

const SkillsSection = ({ user, token, setUser }: any) => {
  const [newSkill, setNewSkill] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      alert("Please enter a skill.");
      return;
    }

    await handleBeginAddSkill(newSkill, token, setUser);
    setNewSkill("");
    setShowModal(false);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Your Skills</h2>
        <button
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          onClick={() => setShowModal(true)}
        >
          <IoMdAddCircleOutline className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <div className="space-y-2">
        {user?.Skills?.length ? (
          user.Skills.map((skill: string, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-200"
            >
              <span className="text-gray-700 font-medium">{skill}</span>
              <MdOutlineDeleteOutline
                className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => handleBeginDeleteSkill(skill, token, setUser)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
            No skills added yet.
          </p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Add New Skill
            </h2>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
              placeholder="Enter skill name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                onClick={handleAddSkill}
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
