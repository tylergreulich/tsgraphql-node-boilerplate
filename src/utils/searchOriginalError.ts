const searchOriginalError = error => {
  if (error.originalError) {
    return searchOriginalError(error.originalError);
  }

  if (error.errors) {
    return error.errors.map(searchOriginalError)[0];
  }

  return error;
};

export { searchOriginalError };
