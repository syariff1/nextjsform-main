import { useSession } from 'next-auth/react';
import { useState } from 'react';



type FormData = {
  id: string,
  workout_title: string;
  description: string;
  completion_date: string;
  workout_type: string;
  Others_framework?: string;
  updates: 'yes' | 'no' | 'maybe' | 'Others';
  Others_option?: string;
  difficulty_rating: number;
  ongoing: boolean;
  form_image: FileList | null;
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  checkbox4: boolean;
};

const ProjectForm: React.FC = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<FormData>({
    id: session?.user?.id || '',
    workout_title: '',
    description: '',
    completion_date: '',
    workout_type: 'dog', 
    updates: 'yes',
    difficulty_rating: 0,
    ongoing: false,
    form_image: null,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Update the placeholder title in h2 when the workout_title changes
    if (name === 'workout_title') {
      setFormData((prevData) => ({ ...prevData, workout_title: value }));
    }
  };


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'project_image' | 'project_brief') => {
    const files = e.target.files;
    setFormData((prevData) => ({ ...prevData, [fileType]: files }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };
  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({ ...prevData, completion_date: date ? date.toISOString() : '' }));
  };


  return (

    <div className="flex justify-center items-center py-7 mx-10">
    <form className="w-2/3 space-y-6" onSubmit={handleSubmit}>

      <div className="space-y-2 mt-5">
        <label className="text-4xl font-large bold leading-none" htmlFor="workout_title">
          {formData.workout_title || 'Workout Title'}
        </label>
        <input
          type="text"
          id="workout_title"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={`Enter ${formData.workout_title ? 'additional ' : ''}workout title`}
          name="workout_title"
          value={formData.workout_title}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="space-y-2">
          <label className="text-lg font-medium leading-none" htmlFor="completion_date">
            Date of Workout Completed
          </label>
          <div className="mt-2">
            <input
              type="date"
              id="completion_date"
              name="completion_date"
              value={formData.completion_date}
              onChange={(e) => handleChange(e)}
              className="w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Select completion date"
            />
          </div>
        </div>

      <div className="space-y-2 mt-5">
        <label className="text-lg font-medium leading-none" htmlFor="workout_type">
          Type of workout
        </label>
        <select
          id="workout_type"
          name="workout_type"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.workout_type}
          onChange={(e) => handleChange(e)}
        >
          <option value="Cardio">Cardio</option>
          <option value="Weightlifting">Weightlifting</option>
          <option value="Bodylifting">Bodylifting</option>
          <option value="Crossfit">Crossfit</option>

        </select>
      </div>

      <div className="space-y-2 mt-5">
        <label className="text-lg font-medium leading-none">Muscles hit</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="checkbox1"
              checked={formData.checkbox1}
              onChange={(e) => handleCheckboxChange(e)}
            />
            Leg
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="checkbox2"
              checked={formData.checkbox2}
              onChange={(e) => handleCheckboxChange(e)}
            />
            Upper Body
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="checkbox3"
              checked={formData.checkbox3}
              onChange={(e) => handleCheckboxChange(e)}
            />
            Lower Body
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="checkbox4"
              checked={formData.checkbox4}
              onChange={(e) => handleCheckboxChange(e)}
            />
            Abs
          </label>
        </div>
      </div>

      <div className="space-y-2 mt-5">
        <label className="text-lg bold font-medium leading-none">Do you think this workout is easy? </label>
        <div className="flex flex-col">
          <label className="mb-2">
            <input
              type="radio"
              name="updates"
              value="yes"
              checked={formData.updates === 'yes'}
              onChange={(e) => handleChange(e)}
            />
            Yes
          </label>
          <label className="mb-2">
            <input
              type="radio"
              name="updates"
              value="no"
              checked={formData.updates === 'no'}
              onChange={(e) => handleChange(e)}
            />
            No
          </label>
          <label className="mb-2">
            <input
              type="radio"
              name="updates"
              value="maybe"
              checked={formData.updates === 'maybe'}
              onChange={(e) => handleChange(e)}
            />
            Maybe
          </label>
          <label className="mb-2">
            <input
              type="radio"
              name="updates"
              value="Others"
              checked={formData.updates === 'Others'}
              onChange={(e) => handleChange(e)}
            />
            {formData.updates === 'Others' ? formData.Others_option : 'Others'}
          </label>
        </div>
      </div>

      <div className="space-y-2 mt-5">
        <input
          type="text"
          id="Others_option"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter Others option"
          name="Others_option"
          value={formData.Others_option}
          onChange={(e) => handleChange(e)}
          disabled={formData.updates !== 'Others'}
        />
      </div>

      <div className="space-y-2 mt-5">
  <label className="text-lg mx-auto font-medium leading-none">Difficulty Rating</label>
  <div className="flex items-center space-x-2">
    <input
      type="range"
      id="difficulty_rating"
      name="difficulty_rating"
      min="0"
      max="10"
      step="1"
      value={formData.difficulty_rating}
      onChange={(e) => handleChange(e)}
      className="w-full"
    />
    <span>{formData.difficulty_rating}</span>
  </div>
</div>

      <div className="space-y-2 mt-5">
        <label className="flex items-center">
          <span className="relative ml-2">Would you do this workout again?</span>
          <input
            type="checkbox"
            name="ongoing"
            checked={formData.ongoing}
            onChange={(e) => handleCheckboxChange(e)}
            className="sr-only"
          />
          <span
            className={`${
              formData.ongoing ?  'bg-gray-700' : 'bg-gray-300' 
            } relative ml-auto inline-block h-5 w-11  rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700`}
          >
            {/* Switch handle */}
            <span
              className={`${
                formData.ongoing ? 'translate-x-5' : 'translate-x-0'
              } inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition-transform ease-in-out duration-200`}
            />
          </span>
        </label>
      </div>

      <div className="space-y-2 mt-5">
        <label className="text-sm font-medium leading-none" htmlFor="project_image">
          Postworkout Selfie
        </label>
        <div className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 text-center">
          {/* File upload input for project image */}
          <input
            type="file"
            id="project_image"
            accept="image/*"
            multiple={false}
            onChange={(e) => handleFileChange(e, 'project_image')}
          />
          {/* Display file name or additional information if needed */}
          <div className="m-0 h-[1.25rem] text-xs leading-5 text-gray-600">Image (4MB)</div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-x-3 mt-5">
        <a className="inline-flex items-center justify-center rounded-md text-sm font-medium" href="/home">
          Discard
        </a>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
);
};

export default ProjectForm;
