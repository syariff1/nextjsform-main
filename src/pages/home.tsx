import { useState } from "react";
import { useRouter } from "next/router";
//import { api } from 'utils/api'
import Link from "next/link";

export default function home() {
    const router = useRouter(); // Importing useRouter hook for navigation
    //const notesCreateMutation = api.note.notesCreate.useMutation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateNote = async () => {
        /*try {
            await notesCreateMutation.mutateAsync({ title, description }).then((result) => {
                router.push('/'); // Navigate back to index page
            });
        } catch (err) {
            console.error("Error creating note:", err);
        }*/
    };

    return (
        <div className="p-10 m-10">
            <h1 className="p-6">Create a Note</h1>
            <form className="flex items-center flex-col space-y-4">
                <input
                    type="text"
                    value={title}
                    className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button type="button"
                    onClick={()=>{router.push('/createform')}}
                    className="w-full max-w-[50px] items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >+</button>
            </form>
            <button type="button"
            onClick={()=>{router.push('/')}}
            className="w-full max-w-[100px] items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >back to home</button>
        </div>
    );
}
