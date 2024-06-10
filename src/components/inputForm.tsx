import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./InputForm.css";
import { InputFormProps } from "../utlis/utils";
import {Information} from "../constants/constants"

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "*Too Short!")
    .max(15, "*Too Long!")
    .required("*Required"),
  desc: Yup.string(),
});

const InputForm: React.FC<InputFormProps> = ({ isStatus, setItemData }) => {
  return (
    <div className="form-container">
      <h1>{Information.formHeading}</h1>
      <Formik
        initialValues={{
          name: "",
          desc: "",
          status: isStatus,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          setItemData((prev) => [...prev, values]);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name" className="label">
                {Information.inputLabel.Title}:
              </label>
              <Field type="text" name="name" className="form-input" />
              <ErrorMessage
                name="name"
                component="span"
                className="error-message"
              />
              {/* {errors.name && touched.name ? <span>{errors.name}</span> : null} */}
            </div>
            <div className="form-group">
              <label htmlFor="desc" className="label">
                {Information.inputLabel.Description}:
              </label>
              <Field type="text" name="desc" className="form-input" />
              {/* <ErrorMessage name="desc" component="span" className="error-message" /> */}
              {errors.desc && touched.desc ? (
                <span className="error-message">{errors.desc}</span>
              ) : null}
            </div>
            <button type="submit" className="submit-button">
              {Information.inputLabel.submitBtn}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InputForm;
