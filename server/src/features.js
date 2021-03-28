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

  return {
    id,
    title,
    pictureUrl: picture_url,
    tags: tags.split(","),
    popularityIndex: popularity_index,
    creationDate: creation_date,
    status,
    explanation,
  };
};
