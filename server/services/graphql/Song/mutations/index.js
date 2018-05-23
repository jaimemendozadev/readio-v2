import Song from '../../../../DB/Schemas/Song';

export const createSong = async(_, {input}) => {
  const createdSong = await Song.create(input);

  console.log('createdSong ', createdSong);

  return createdSong;
}