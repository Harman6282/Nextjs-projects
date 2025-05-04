import vine from "@vinejs/vine";

export const registerSchema = vine.object({
  name: vine.string().trim().minLength(3).maxLength(30),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(20).confirmed(),
});


export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(20)
});
