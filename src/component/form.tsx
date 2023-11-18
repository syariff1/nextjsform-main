"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "~/types/Form";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Toaster, toast } from "sonner";
import { api } from "~/utils/api";

const Form = ({ form, onDelete }: { form: Form, onDelete: () => void })=>{
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [data, setData] = useState<Form>({
    id: form.id,
    description: form.description ?? "",
    title: form.title ?? "",
  });
  const formContainer = useRef<HTMLDivElement>(null);
  const formDeleteMutation = api.form.formsDelete.useMutation();
  const formEditMutation = api.form.formsUpdate.useMutation();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formContainer.current && !formContainer.current.contains(event.target as Node)) {
        setIsEditing(false);
        formEditMutation.mutateAsync({id: data.id,description: data.description,title: data.title}).then((result)=>{
          console.log(result);
        })
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formContainer,data]);

  
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

  return (
    <>
      <Toaster />
      <div ref={formContainer} className="flex w-full max-w-sm flex-col rounded-lg border p-4 shadow-xl">
        <div className="flex items-center justify-between space-x-8">
          <input
            className="w-full cursor-text p-2 font-bold"
            name="title"
            value={data.title}
            disabled={!isEditing}
            onChange={handleDataChange}
          />
          <div className="flex items-center justify-center space-x-1">
          <PencilIcon
              className="h-4 w-4 cursor-pointer transition-all hover:text-gray-600"
              onClick={() => {setIsEditing(!isEditing);}}
              onFocus={(e) => toast.success("Focus!")}
            />
            <TrashIcon
              className="h-4 w-4 cursor-pointer transition-all hover:text-red-600"
              onClick={() => handleDelete(form.id)}
            />
          </div>
        </div>
        <textarea className="text-sm text-gray-600" name="description" value={data.description} disabled={!isEditing} onChange={handleDataChange} />
      </div>
    </>
  );
};

export default Form;
