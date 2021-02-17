import React from "react";
import { useField } from "formik";

const GeneralCreatePage = (props) => {
  const [field, meta] = useField(props.name);
  return (
    <div>
      <label className="cpLabel">
        {props.title}
        <input {...field} {...props} />
        {meta.error && meta.touched && <p className={"error"}>{meta.error}</p>}
      </label>
    </div>
  );
};

export default GeneralCreatePage;
