const convertObjectToFormData = (data) => {
    const formData = new FormData();
  
    // Iterate through the object properties and append them to the FormData
    const appendToFormData = (prefix, obj) => {
      for (const [key, value] of Object.entries(obj)) {
        
        const propName = prefix ? `${prefix}[${key}]` : key;
  
        if (value instanceof Object && !Array.isArray(value)) {
          // If the value is an object, recursively call the function
          appendToFormData(propName, value);
        } else {
          // If the value is a scalar or an array, append it to the FormData
          formData.append(propName, value);
        }
      }
    };
  
    appendToFormData('', data);
  
    return formData;
  };

  export default convertObjectToFormData