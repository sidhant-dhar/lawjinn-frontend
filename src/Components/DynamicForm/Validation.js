import * as Yup from 'yup';

// const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;

export const validation = Yup.object().shape({
  // firstName: Yup.string()
  //   .matches(alpha, { message: 'Enter Valid Name', excludeEmptyString: true })
  //   .required()
  //   .max(35),
});
