const createServerPath = (path) => {
  return path === ""
    ? []
    : "http://localhost:4000" + "\\" + path.split("/").join("\\");
};

const picturesPathMapper = (paths) => {
  if (paths === null) {
    return null;
  }
  return paths.split(",").map((path) => createServerPath(path));
};

export const preparedQuestionData = (rawData) => {
  const {
    id,
    title,
    picture_url,
    tags,
    popularity_index,
    creation_date,
    status,
    explanation,
  } = rawData;

  const questionPicturesPaths = picturesPathMapper(picture_url);

  return {
    id,
    title,
    pictureUrl: questionPicturesPaths,
    tags: tags.split(","),
    popularityIndex: popularity_index,
    creationDate: creation_date,
    status,
    explanation,
  };
};

export const preparedAnswerData = (rawData, dirname) => {
  return rawData.map((answer) => {
    const { picture_url } = answer;
    const questionPicturesPaths = picturesPathMapper(picture_url, dirname);
    return {
      ...answer,
      picture_url: questionPicturesPaths,
    };
  });
};
