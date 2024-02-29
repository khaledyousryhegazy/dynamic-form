import { useState } from "react";

export const DynamicForm = ({ config }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const [label, setLabel] = useState();
  const [type, setType] = useState();
  const [required, setRequired] = useState(false);

  //handle change on input field
  const handleChange = (e, fieldName) => {
    const value = e.target.value;

    setFormData({ ...formData, [fieldName]: value }); //add or update property (name is 'fieldName' and his value is 'value')
    validateField(fieldName, value);
  };

  //for input validation
  const validateField = (fieldName, value) => {
    const fieldConfig = config.find((field) => field.name === fieldName);

    let error = "";

    if (fieldConfig.required && !value.trim()) {
      error = "This field is required";
    } else if (fieldConfig.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email format";
    }

    setErrors({ ...errors, [fieldName]: error }); //add or update property (name is 'fieldName' and his value is 'error')
  };

  // add new fields
  const handleAddFields = () => {
    const newField = {
      name: `field+${config.length + 1}`,
      label: label,
      type: type,
      required: required,
    };

    setFormData({ ...formData, [newField.name]: "" });
    setErrors({ ...errors, [newField.name]: "" });
    config.push(newField);

    console.log(required);
    console.log(type);
  };

  //handle remove field
  const handleRemove = (fieldName) => {
    const { [fieldName]: removedField, ...restFormData } = formData;
    const { [fieldName]: removedError, ...restErrors } = errors;
    setFormData(restFormData);
    setErrors(restErrors);
    config.splice(
      config.findIndex((field) => field.name === fieldName),
      1
    );
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error); // in errors object this make sure if has just one error

    // !hasError ? console.log(formData)  : console.log(hasError);

    if (!hasErrors) {
      console.log("Data", formData);

      setFormData({});
      setErrors({});
    } else {
      console.log(hasErrors);
    }
  };
  // #795cfa
  return (
    <div className="bg-white p-7 rounded-md max-w-[600px] w-full">
      <form onSubmit={handleSubmit} className="pb-5 border-b">
        {config.map((field, index) => (
          <div key={index} className="flex items-end gap-5 mb-5">
            <div className="flex flex-col w-full">
              <label className="label">{field.label}</label>
              <div className="flex gap-3">
                <input
                  className="outline-none border w-full"
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(e, field.name)}
                />
                <button
                  type="button"
                  className="bg-red-600 text-white text-[10px] p-1 rounded-sm"
                  onClick={() => handleRemove(field.name)}
                >
                  Remove
                </button>
              </div>
              {errors[field.name] && (
                <p className="error text-red-500 text-[12px]">
                  {errors[field.name]}
                </p>
              )}
            </div>
          </div>
        ))}

        <button
          className="bg-[#795cfa] text-white text-sm uppercase w-full p-2 tracking-widest disabled:bg-gray-400"
          type="submit"
          disabled={
            Object.values(errors).some((error) => error) || config.length <= 0
          }
        >
          Submit
        </button>
      </form>
      {/* Add New Field */}
      <div className="pt-5">
        <fieldset>
          <div className="field">
            <label htmlFor="type" className="label">
              Type
            </label>
            <select
              id="type"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="label" className="label">
              Label Name
            </label>
            <input
              className="outline-none select w-full"
              type="text"
              id="label"
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="required" className="label">
              Required Input?
            </label>
            <select
              id="required"
              onChange={(e) => {
                setRequired(e.target.value === "true");
              }}
              value={required.toString()}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
        </fieldset>

        <button
          disabled={!label}
          type="button"
          className="bg-[#795cfa] text-white text-sm uppercase w-full p-2 tracking-widest disabled:bg-gray-400"
          onClick={handleAddFields}
        >
          Add Field
        </button>
      </div>
    </div>
  );
};
