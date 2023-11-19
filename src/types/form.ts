
interface Form  {
  id : string,
  workout_title: string;
  description: string;
  completion_date: string;
  workout_type: string;
  others_framework: string;
  updates: 'yes' | 'no' | 'maybe' | 'Custom';
  others_option: string;
  difficulty_rating: number;
  ongoing: boolean;
  form_image: FileList;
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  checkbox4: boolean;
};

export default Form;
