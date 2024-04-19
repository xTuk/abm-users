import { ValidationChain, body, param } from "express-validator";

export const userValidators = () => {
  return [
    body("email")
      .isString()
      .notEmpty()
      .isLength({ min: 5 })
      .isEmail()
      .withMessage("Email invalido"),
    body("name")
      .isString()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Nombre invalido"),
    body("lastname")
      .isString()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Apellido invalido"),
    body("cuit")
      .isString()
      .notEmpty()
      .isLength({ min: 10 })
      .withMessage("Cuit invalido"),
    body("domicile")
      .isString()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Domicilio invalido"),
    body("birthdate")
      .notEmpty()
      .isLength({ min: 10, max: 10 })
      .isISO8601()
      .customSanitizer((value) => {
        if (!value || isNaN(new Date(value).getTime())) return false;
        return new Date(value).toISOString().split("T")[0];
      })
      .withMessage("Fecha de nacimiento invalido"),
    body("phone")
      .isString()
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Telefono invalido"),
  ];
};

export const idValidation = (): ValidationChain[] => {
  return [param("id").notEmpty().withMessage("Id invalido")];
};

export const textValidation = (): ValidationChain[] => {
  return [
    param("text")
      .isString()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Id invalido"),
  ];
};
