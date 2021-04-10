/**
 * Форматируем путь, чтобы он был связан с сервером
 */
const createServerPath = (path) => {
  return path === ""
    ? []
    : "http://localhost:4000" + "\\" + path.split("/").join("\\");
};

/**
 * Проходим по всем путям и делаем форматирование каждого
 */
export const picturesPathMapper = (paths) => {
  if (paths === null) {
    return null;
  }
  return paths.split(",").map((path) => createServerPath(path));
};

/**
 * Форматируем данные для вопросов
 */
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

/**
 * Форматируем данные для ответов к вопросам
 */
export const preparedAnswerData = (rawData) => {
  return rawData.map((answer) => {
    const { picture_url, avatar_url } = answer;
    const questionPicturesPaths = picturesPathMapper(picture_url);
    const userAvatarPath = picturesPathMapper(avatar_url);
    return {
      ...answer,
      picture_url: questionPicturesPaths,
      avatar_url: userAvatarPath,
    };
  });
};

export const getLimit = (limit) => (limit === "all" ? "" : `LIMIT ${limit}`);
