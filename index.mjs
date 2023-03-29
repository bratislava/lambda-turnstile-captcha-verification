import Turnstile from "cf-turnstile";
const turnstile = Turnstile(process.env.TURNSTILE_SECRET);

export const handler = async (event) => {
  console.log(event.request);
  if (!event.request.validationData) {
    throw new Error("Missing validation data");
  }
  console.log(event.request.validationData);
  const result = await turnstile(
    event.request.validationData["custom:turnstile_token"]
  );
  if (!result.success) {
    throw new Error("Validation not successful");
  } else {
    return event;
  }
};
