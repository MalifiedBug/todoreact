import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input
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
  

export default function PopoverA({tasks, change, index}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    alert("Your task will get updated after making some changes to the app or editing new todo")   
   
     };

  const handleClose = () => {
    setAnchorEl(null);
        
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <button style={{color:'blue'}} aria-describedby={id} variant="contained" onClick={handleClick}>
       edit
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
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
          }, 400);
          tasks[index] = values.item;
          change(tasks)
          handleClose();      
        }}
      >
        <Form>
          <MyTextInput
            name="item"
            type="text"
          />
          <button style={{color:'blue'}} type="submit">Edit</button>
        </Form>
      </Formik>
      </Popover>
    </div>
  );
}