import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import PopoverA from "./Popover";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
       onFocus={props.onFocus}
        value={props.value}
        onInput={props.onInput}
        className="text-input"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// And now we can use these
export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [vada, setVada] = useState("");
  const [pav, setPav] = useState("");

  function Delete(index) {
    setTasks(tasks.filter((task) => task !== tasks[index]));
    console.log(vada)
  }



  return (
    <div className="maintodo">
      <h1>Todo App</h1>
      <Formik
        initialValues={{
          item: "",
        }}
        validationSchema={Yup.object({
          item: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            
          }, 4000);
          setVada(values.item);
          let copy = [...tasks];
          copy.push(values.item);
          setTasks(copy);
          setPav("");
        }}
      >
        <Form className="inputform">
          <MyTextInput
            name="item"
            type="text"
            placeholder="add todo"
            onInput={(e) => {
              setPav(e.target.value);
            }}
            value={pav}
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <div className="todolist">
        <ol>
          {tasks && tasks.map((item, index) => (
            <li className="listele" key={index} id={index}>
              {item}
              <div className="editbutton">
                <PopoverA tasks={tasks} change={setTasks} index={index} />
                <button
                style={{color:'red'}}
                  onClick={() => {
                    Delete(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
