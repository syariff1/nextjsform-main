import { useState } from 'react';

const YourPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [textboxValue, setTextboxValue] = useState<string>('');
  const [radioValue, setRadioValue] = useState<string>(''); // You can replace string with the actual type
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]); // You can replace string with the actual type

  const handleCheckboxChange = (value: string) => {
    // Toggle checkbox values
    setCheckboxValues((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((item) => item !== value)
        : [...prevValues, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform form submission or other actions with the form values
    console.log('Title:', title);
    console.log('Textbox Value:', textboxValue);
    console.log('Radio Value:', radioValue);
    console.log('Checkbox Values:', checkboxValues);
  };

  return (
    <div>
      <h1>{title || 'Placeholder Title'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
          />
        </label>
        <br />
        <label>
          Textbox:
          <input
            type="text"
            value={textboxValue}
            onChange={(e) => setTextboxValue(e.target.value)}
            placeholder="Enter text"
          />
        </label>
        <br />
        <label>
          Radio Buttons:
          <label>
            Option 1
            <input
              type="radio"
              value="Option 1"
              checked={radioValue === 'Option 1'}
              onChange={() => setRadioValue('Option 1')}
            />
          </label>
          <label>
            Option 2
            <input
              type="radio"
              value="Option 2"
              checked={radioValue === 'Option 2'}
              onChange={() => setRadioValue('Option 2')}
            />
          </label>
        </label>
        <br />
        <label>
          Checkboxes:
          <label>
            Option A
            <input
              type="checkbox"
              value="Option A"
              checked={checkboxValues.includes('Option A')}
              onChange={() => handleCheckboxChange('Option A')}
            />
          </label>
          <label>
            Option B
            <input
              type="checkbox"
              value="Option B"
              checked={checkboxValues.includes('Option B')}
              onChange={() => handleCheckboxChange('Option B')}
            />
          </label>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YourPage;
