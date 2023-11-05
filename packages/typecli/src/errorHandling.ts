export const parseUnknownError = (err: unknown) => {
  let message = 'An unknown error has occurred, please try again later';

  if (err instanceof Error && err.message.length) {
    message = err.message;
  }

  if (typeof err === 'string') {
    message = err;
  }

  return message;
};
