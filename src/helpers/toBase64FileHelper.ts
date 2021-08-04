import FileCaptionPair from '@/interface/FileCaptionPair';
import Base64FileCaptionPair from '@/interface/Base64FileCaptionPair';

const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  // @ts-ignore
  reader.onload = () => resolve(reader.result.split(',')[1]);
  reader.onerror = error => reject(error);
});

export default async function fileToBase64(pairs: FileCaptionPair[]) {
  const toBase64Promise = pairs.map(async pair => {
    const base64File = await toBase64(pair.file);
    return { base64File, caption: pair.caption } as Base64FileCaptionPair;
  });

  const base64FileCaptionPairs = await Promise.all(toBase64Promise);
  return base64FileCaptionPairs;
}
