import PropTypes from "prop-types";
import React from "react";
import { Formik, Form, FastField } from "formik";
import { Button, FormGroup, Spinner } from "reactstrap";
import * as Yup from "yup";

import InputField from "custom-fields/InputField";
import SelectField from "custom-fields/SelectField";
import RandomPhotoField from "custom-fields/RandomPhotoField";
import { PHOTO_CATEGORY_OPTIONS } from "constants/global";

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
};

function PhotoForm(props) {
  const initialValues = {
    // assign === undefined is uncontrolled
    title: "",
    categoryId: null,
    photo: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("This field is required."),

    categoryId: Yup.number().required("This field is required.").nullable(),

    photo: Yup.string().when("categoryId", {
      is: 1,
      then: Yup.string().required("This field is required."),
      otherwise: Yup.string().notRequired(),
    }),
  });
  // npm i --save react-select
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => {
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });

        return (
          <Form>
            <FastField
              name="title"
              component={InputField}
              label="Title"
              placeholder="Eg: Wow nature..."
            />

            <FastField
              name="categoryId"
              component={SelectField}
              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField
              name="photo"
              component={RandomPhotoField}
              label="Photo"
            />

            <FormGroup>
              <Button type="submit" color="primary">
                {isSubmitting && <Spinner size="sm" />} Add to album
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
