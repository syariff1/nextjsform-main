import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { UploadDropzone } from "~/utils/uploadthing";
import { boolean } from 'zod';


type Form = {
    id: string,
    workout_title: string;
    completion_date: Date;
    workout_type: string;
    checkboxes: string[];
    updates: string;
    Others_option?: string;
    difficulty_rating: number;
    ongoing: boolean;
    form_image: string;
  
  };

type UploadFileResponse = {
  url: string;
  uploadedBy: string;
  // ... other properties
};

const Form = ({ form, onDelete }: { form: Form, onDelete: () => void })=>{ 

    const [isEditing, setIsEditing] = useState<boolean>(false);
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
  
  const router = useRouter();
  const formContainer = useRef<HTMLDivElement>(null);
  const formDeleteMutation = api.form.formsDelete.useMutation();
  const formEditMutation = api.form.formsUpdate.useMutation();

  const handleEditForm = async () => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (formContainer.current && !formContainer.current.contains(event.target as Node)) {
        setIsEditing(false);
  
        try {
          const result = await formEditMutation.mutateAsync({
            id: data.id,
            workout_title: data.workout_title,
            completion_date: data.completion_date,
            workout_type: data.workout_type,
            checkboxes: data.checkboxes,
            updates: data.updates,
            difficulty_rating: data.difficulty_rating,
            ongoing: data.ongoing,
            form_image: data.form_image,
          });
  
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    // Return cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  };
  
  // Use the function in your component
  useEffect(() => {
    const cleanup = () => {
        // Call your handleEditForm function here
        handleEditForm();
        // Add any other cleanup logic if needed
      };
  
    // Ensure cleanup is called when the component unmounts or when the dependencies change
    return () => cleanup();
  }, [formContainer, data, formEditMutation, setIsEditing]);
  
//   const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const target = e.target as HTMLInputElement & HTMLTextAreaElement;
//     //toast.message(e.target.value);
//     setData({
//       ...data,
//       [target.name]: target.value,
//     });
//   };

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      await formDeleteMutation.mutateAsync({ id }).then((result) => {
        onDelete();
      });
    } catch (error) {
      console.error("Error deleting form:", error);
    //   toast.message("Error deleting form:" + error);
    }
  }
  const handleUploadComplete = (res: any) => {
    // Assuming that the response contains the image URL
    const imageUrl = res?.[0]?.url || ''; // Adjust this based on the actual response structure
    // Update the form data with the image URL
    setData((prevData) => ({
      ...prevData,
      form_image: imageUrl || '', // Use empty string if URL is not available
    }));

    // Additional logic or state updates if needed
    alert('Upload Completed');
  };
  const handleUploadError = (error: Error) => {
    // Handle the error as needed
    alert(`ERROR! ${error.message}`);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: name === 'difficulty_rating' ? parseInt(value, 10) : value,
    }));

    // Update the placeholder title in h2 when the workout_title changes
    if (name === 'workout_title') {
        setData((prevData) => ({ ...prevData, workout_title: value }));
    }
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    // Handle date field separately
    if (type === 'date') {
      // Parse the date string and set it as a Date object
      setData((prevData) => ({ ...prevData, [name]: new Date(value) }));
    } else {
        setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };



  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setData((prevData) => {
      // If the checkbox is checked, add the muscle group to the array
      // If it's unchecked, remove it from the array
      const updatedcheckboxes = checked
        ? [...prevData.checkboxes, name]
        : prevData.checkboxes.filter((group) => group !== name);

      return { ...prevData, checkboxes: updatedcheckboxes };
    });
  };
  const handleOngoingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      ongoing: e.target.checked,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'project_image' | 'project_brief') => {
    const files = e.target.files;
    setData((prevData) => ({ ...prevData, [fileType]: files }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', data);
  };



  return (
    <>
    <Head>
      <title>Home | Edit a form</title>
      <meta name="description" content="Generated by create-t3-app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />

    <div className="flex justify-center items-center py-7 mx-10">
      <form className="w-2/3 space-y-6">

        <div className="space-y-2 mt-5">
          <label className="text-4xl font-large bold leading-none" htmlFor="workout_title">
            {data.workout_title }
          </label>
          <input
              type="text"
              id="workout_title"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={data.workout_title}
              name="workout_title"
              value={data.workout_title}
              onChange={(e) => handleChange(e)}
            />
        </div>
        <div className="space-y-2">
          <label className="text-lg font-bold leading-none" htmlFor="completion_date">
            Date of Workout Completed
          </label>
          <div className="mt-2">
            <input
              type="date"
              id="completion_date"
              name="completion_date"
              value={data.completion_date.toISOString().split('T')[0]}
              disabled={!isEditing}
              onChange={(e) => handleDateChange(e)}
              className="w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Select completion date"
            />
          </div>
        </div>

        <div className="space-y-2 mt-5">
          <label className="text-lg font-bold leading-none" htmlFor="workout_type">
            Type of workout
          </label>
          <select
            id="workout_type"
            name="workout_type"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={data.workout_type}
            disabled={!isEditing}
            onChange={(e) => handleChange(e)}
          >
            <option value="Cardio">Cardio</option>
            <option value="Weightlifting">Weightlifting</option>
            <option value="Bodylifting">Bodylifting</option>
            <option value="Crossfit">Crossfit</option>

          </select>
        </div>

        <div className="space-y-2 mt-5">
          <label className="text-lg font-bold leading-none">Muscles hit</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Leg"
                checked={data.checkboxes.includes('Leg')}
                onChange={(e) => handleCheckboxChange(e)}
                disabled={!isEditing}
              />
              Leg
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Upper Body"
                checked={data.checkboxes.includes('Upper Body')}
                onChange={(e) => handleCheckboxChange(e)}
                disabled={!isEditing}
              />
              Upper Body
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Lower Body"
                checked={data.checkboxes.includes('Lower Body')}
                onChange={(e) => handleCheckboxChange(e)}
                disabled={!isEditing}
              />
              Lower Body
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Abs"
                checked={data.checkboxes.includes('Abs')}
                onChange={(e) => handleCheckboxChange(e)}
                disabled={!isEditing}
              />
              Abs
            </label>
          </div>
        </div>

        <div className="space-y-2 mt-5">
          <label className="text-lg bold font-bold leading-none">Do you think this workout is easy? </label>
          <div className="flex flex-col">
            <label className="mb-2">
              <input
                type="radio"
                name="updates"
                value="yes"
                checked={data.updates === 'yes'}
                onChange={(e) => handleChange(e)}
              />
              Yes
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="updates"
                value="no"
                checked={data.updates === 'no'}
                onChange={(e) => handleChange(e)}
              />
              No
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="updates"
                value="maybe"
                checked={data.updates === 'maybe'}
                onChange={(e) => handleChange(e)}
              />
              Maybe
            </label>
            <label className="mb-2 flex items-center">
              <input
                type="radio"
                name="updates"
                value="Others"
                checked={data.updates === 'Others'}
                onChange={(e) => handleChange(e)}
              />
              <span className="ml-2">
                {data.updates === 'Others' ? (
                  <input
                    type="text"
                    id="Others_option"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter Others"
                    name="Others_option"
                    value={data.Others_option}
                    onChange={(e) => handleChange(e)}
                    disabled={data.updates !== 'Others'}
                  />
                ) : (
                  'Others'
                )}
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-2 mt-5">
          <label className="text-lg mx-auto font-bold leading-none">Difficulty Rating</label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              id="difficulty_rating"
              name="difficulty_rating"
              min="0"
              max="10"
              step="1"
              value={data.difficulty_rating}
              onChange={(e) => handleChange(e)}
              className="w-full"
            />
            <span>{data.difficulty_rating}</span>
          </div>
        </div>

        <div className="space-y-2 mt-5">
          <label className="flex items-center">
            <span className="relative text-lg font-bold">Would you do this workout again?</span>
            <input
              type="checkbox"
              name="ongoing"
              checked={data.ongoing}
              onChange={(e) => handleOngoingChange(e)}
              className="sr-only"
            />
            <span
              className={`${data.ongoing ? 'bg-gray-700' : 'bg-gray-300'
                } relative ml-auto inline-block h-5 w-11  rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700`}
            >
              {/* Switch handle */}
              <span
                className={`${data.ongoing ? 'translate-x-5' : 'translate-x-0'
                  } inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition-transform ease-in-out duration-200`}
              />
            </span>
          </label>
        </div>

        <div className="space-y-2 mt-5">
          <label className="text-lg font-bold  leading-none" >
            Postworkout Selfie
          </label>
          <div>
            <UploadDropzone
              className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
              endpoint="imageUploader"
              onClientUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
            />
          </div>
        </div>


        <div className="flex items-center justify-center gap-x-3 mt-5">
          <a className="inline-flex items-center justify-center rounded-md text-sm font-medium" href="/home">
            Discard
          </a>
          <button
            className="inline-flex items-center border:2px justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
            type="submit"
            onClick={() => handleDelete(form.id)}
          >
            Delete
          </button>
          <button
            className="inline-flex items-center border:2px justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
            type="submit"
            onClick={handleEditForm}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
};