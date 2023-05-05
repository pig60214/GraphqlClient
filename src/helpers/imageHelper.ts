import FileCaptionPair from '@/interface/FileCaptionPair';
import Base64FileCaptionPair from '@/interface/Base64FileCaptionPair';

const compressImage = async (file: File) => {
  const targetSize = 1000000;
  const compressRatio = targetSize / file.size;
  const imageBitmap = await createImageBitmap(file);

  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext('2d');
  // @ts-ignore
  ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height); // 把圖片畫在畫布上(0,0)作標到(canvas.width,canvas.height)

  const newImg = canvas.toDataURL('image/jpeg', compressRatio);
  return newImg;
};

export default async function getBase64(pairs: FileCaptionPair[]) {
  const getBase64Promise = pairs.map(async pair => {
    const image = await compressImage(pair.file);
    const base64File = image.split(',')[1];
    return { base64File, caption: pair.caption } as Base64FileCaptionPair;
  });

  const base64FileCaptionPairs = await Promise.all(getBase64Promise);
  return base64FileCaptionPairs;
}
