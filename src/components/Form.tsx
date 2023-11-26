"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "~/types/form";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Toaster, toast } from "sonner";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { any, number } from "zod";
import { ShareIcon } from "@heroicons/react/24/solid"


const Form = ({ form, onDelete }: { form: Form, onDelete: () => void }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [data, setData] = useState<Form>({
    id: form.id,
    workout_title: form.workout_title || "",
    completion_date: form.completion_date || new Date(),
    workout_type: form.workout_type || "",
    checkboxes: form.checkboxes || [],
    updates: form.updates || "", // Handle the updates field here
    difficulty_rating: form.difficulty_rating || 0,
    ongoing: form.ongoing || false,
    form_image: form.form_image || "",
  });

  const formContainer = useRef<HTMLDivElement>(null);
  const formDeleteMutation = api.form.formsDelete.useMutation();
  const formEditMutation = api.form.formsUpdate.useMutation();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formContainer.current && !formContainer.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formContainer]);
  const router = useRouter();

  const handleEditClick = () => {
    { setIsEditing(!isEditing); }
    // Push to the editform page with the id parameter
    router.push(`/editform?id=${data.id}`);
  };


  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement & HTMLTextAreaElement;
    //toast.message(e.target.value);
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      await formDeleteMutation.mutateAsync({ id }).then((result) => {
        onDelete();
      });
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.message("Error deleting form:" + error);
    }
  }
  const handleShareClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const shareableLink = typeof window !== "undefined" ? `${window.location.origin}/viewform?id=${data.id}` : "";

  const handleViewClick = () => {
    // Push to the editform page with the id parameter
    router.push(`/viewform?id=${data.id}`);
  };

  return (
    <>
      <Toaster />
      <div ref={formContainer} className="flex w-full max-w-sm flex-col rounded-lg border p-4 shadow-xl" style={{ cursor: 'pointer' }}>
        <a className="flex items-center justify-between space-x-8">
          <input
            className="w-full cursor-text p-2 font-bold"
            name="workout_title"
            value={data.workout_title}
            disabled={!isEditing}
            onChange={handleDataChange}

          />
          <div className="flex items-center justify-center space-x-1">
            <PencilIcon
              className="h-4 w-4 cursor-pointer transition-all hover:text-gray-600"
              onClick={handleEditClick}
              onFocus={(e) => toast.success("Focus!")}
            />
            <TrashIcon
              className="h-4 w-4 cursor-pointer transition-all hover:text-red-600"
              onClick={() => handleDelete(form.id)}
            />
            <div
              className="h-4 w-4 cursor-pointer transition-all hover:text-gray-600"
              onClick={(e) => handleShareClick(e)}
            >
              <ShareIcon />
            </div>
          </div>
        </a>
      </div>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-lg font-bold mb-2">Shareable Link</p>
            <input
              className="w-full p-2 mb-2 rounded-md border border-gray-300"
              type="text"
              value={shareableLink}
              readOnly
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400"
              onClick={handleCloseShareModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;

